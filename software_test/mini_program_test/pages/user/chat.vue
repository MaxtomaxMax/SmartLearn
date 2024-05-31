<template>
    <view class="flex-col page" :style="{ width: containerWidth, height: containerHeight}">
		<view class="flex-row items-center group">
			<view class="flex-col justify-start items-center image-wrapper" @click="exit">
				<image
					class="image_2"
					src="../../static/ui_icon/exit.png"
					@click="exit"
				/>
			</view>
			<view class="flex-col justify-start text-wrapper"><text class="font text" >自由问答</text></view>
			<view class="flex-col justify-start text-wrapper"><text class="font text_2" @click="enterKnowledgeMap">知识框架</text></view>
			<view class="flex-col justify-start text-wrapper" ><text class="font text_2" @click="enterChatHistory">历史</text></view>
		</view>
		<view class="self-stretch divider"></view>
		
		<view class="chat-container">
			<scroll-view scroll-y="true" class="chat-content" 
				:style="{height: `${windowHeight - inputHeight - 90}rpx`}"
				:scroll-into-view="scroll_anchor"
				scroll-with-animation
				ref= "scrollview"
				id = "scrollview">
				<view class="chatList-container" id="msgList-container">
					<view v-for="(item,index) in msgList" :key="index">
						<view class="flex-row userMsg" v-if="item.userContent != ''">
							<!-- 用户发的信息 -->
							<view class="msgRight">
								<text class="text-style">{{item.userContent}}</text>
							</view>
							<image class="avatar" src="../../static/logo.png"></image>
						</view>
						<view class="flex-row botMsg" v-if="item.botContent != ''">
							<!-- kimi的信息 -->
							<image class="avatar" src="../../static/ui_icon/logo_black.png"></image>
							<view class="msgLeft">
								<!-- <zero-markdown-view :markdown="item.botContent" themeColor="#000000"></zero-markdown-view> -->
								<!-- <text class="text-style" selectable="true">{{item.botContent}}</text> -->
								<ua-markdown :source="item.botContent"></ua-markdown>
							</view>	
						</view>
					</view>
					<view class="flex-row botMsg" v-if="this.input_disable">
						<image class="avatar" src="../../static/ui_icon/logo_black.png"></image>
						<view class="loading-msgLeft" >
							{{}}
						</view>
						<view class='flex-col self-stretch loading'>
							<uni-icons class="loading" type="spinner-cycle" size="30"></uni-icons>	
						</view>
					</view>
				</view>
				<view class="scroll-target" id="scrollTarget"></view>
			</scroll-view>
			
		</view>
		
	
		<view class="flex-row group_3">
			<uni-easyinput class="input-box"	
			:disabled="input_disable"
			type="text"
			@iconClick="sendMsg"
			suffix-icon="paperplane"
			v-model="inputMsg" :placeholder="input_disable?'智学AI助手正在准备回答...':'向智学学习助手提问吧~'"></uni-easyinput>
		</view>
    </view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				containerWidth: '0px',
				containerHeight: '0px',
				
				input_disable: false, // 默认情况下
				inputMsg: "",		// input框发送的信息
				keyboardHeight: 0,
				bottomHeight: 0,
				scrollTop: 0, // 滚动距离
				userId: '',
				msgList: [],
				kimi_res:'',
				history: [],
				scroll_anchor:'',
			};
		},
		computed: {
			windowHeight() {
				return this.rpxTopx(uni.getSystemInfoSync().windowHeight);
			},
			// 键盘弹起来的高度+发送框高度
			inputHeight() {
				return this.bottomHeight + this.keyboardHeight;
			}
		},
		mounted() {
			// 初始化时调用 sendHeight 监视发送栏高度
			this.sendHeight();

			// 监听键盘高度变化
			// 注: 这个在 H5 端不能使用
			// #ifndef H5
			uni.onKeyboardHeightChange(res => {
				this.keyboardHeight = this.rpxTopx(res.height);
				if (this.keyboardHeight < 0) this.keyboardHeight = 0;
			});
			// #endif
		},
		updated() {
			// 页面更新时调用聊天消息定位到最底部
			this.scrollToBottom();
			// 保证高度正确
			this.sendHeight();
		},
		onLoad() {
			this.setContainerSize();
		},
		methods: {
			setContainerSize() {
				try {
					const res = uni.getSystemInfoSync();
					console.log(res);
					const screenWidth = res.screenWidth;
					// 屏幕高度要前去头部
					// #ifdef MP-WEIXIN
					const screenHeight = res.screenHeight - res.screenTop;
					// #endif
					// #ifdef H5
					const screenHeight = res.windowHeight;
					// #endif
			
					// 确认获取到了正确的宽度和高度
					if (screenWidth && screenHeight) {
						this.containerWidth = `${screenWidth}px`;
						this.containerHeight = `${screenHeight}px`;
					} else {
						console.error('获取 screenWidth 或 screenHeight 失败');
					}
				} catch (err) {
					console.error('获取系统信息失败', err);
				}
			},
			exit(){
				uni.switchTab({
					url:"/pages/review/learning"
				})
			},
			enterKnowledgeMap(){
				uni.navigateTo({
					url:"/pages/user/knowledgeMap"
				})
			},
			enterChatHistory(){
				uni.redirectTo({
					url:"/pages/user/chat_history"
				})
			},
			async sendMsg() {
				if (this.inputMsg.trim() == "") {
					uni.showToast({
							title: '不能发送空白消息',
							icon: 'none'
						});
						return;
				}
				let prompt = this.inputMsg
				this.inputMsg = "";
				this.msgList.push({
					botContent: "",
					userContent: prompt
				});
				this.input_disable = true;
				
				// 返回页面底部
				this.scrollToBottom();
				
				// 存信息到云数据库
				this.userId = uni.getStorageSync('user_id')
				console.log(this.userId)
				if (this.userId){
					const inputStoredRes = await db.collection("chat_data").add({
						userId : this.userId,
						posttime: Date.now(),
						content: prompt	,
						isUser: true 
					})
					// console.log(inputStoredRes)
					console.log("输入存储成功")
				}
				let res = await uniCloud.callFunction({
					name:"kimi_chat",
					data:{
						prompt,
						history: this.history
					},
				});
				
				// 测试节点
				// console.log(res)
				// return;
				
				if (res.result.success) {
					this.kimi_res = res.result.message;
					this.history = res.result.history;
					console.log(res)
					
					// 存信息到云数据库
					if (this.userId){
						const outputStoredRes = await db.collection("chat_data").add({
							userId: this.userId,
							posttime:Date.now(),
							content: this.kimi_res,
							isUser: false
						})
						// console.log(outputStoredRes)
						console.log("输出存储成功")
					}
				} else {
					console.error(res.result.error)
				}
				
				this.msgList.push({
					botContent: this.kimi_res,
					userContent: ""
				});
				console.log(this.msgList)
				this.input_disable = false
				
				//生成完后也要滚到最底下
				this.scrollToBottom();	
				
			},
			// rpx 转换成 px
			rpxTopx(px) {
				let deviceWidth = uni.getSystemInfoSync().windowWidth;
				let rpx = (750 / deviceWidth) * Number(px);
				return Math.floor(rpx);
			},
			
			// 滚动至聊天底部
			scrollToBottom() {
			    this.$nextTick(() => {
			        this.scroll_anchor = "scrollTarget"
			    });
				this.scroll_anchor = '';
			},

			
			// 监视聊天发送栏高度
			sendHeight() {
			  setTimeout(() => {
				let query = uni.createSelectorQuery();
				query.select('.group_3').boundingClientRect();
				query.exec(res => {
				  if (res && res[0] && res[0].height) {
					this.bottomHeight = this.rpxTopx(res[0].height);
				  } else {
					console.warn("Failed to retrieve .group_3 height.");
				  }
				});
			  }, 10);
			}
	  }
	};
</script>



<style scoped lang="css">
.scroll-target{
	height: 0;
	width:0;
}
	
.text-style{
	font-size: 25rpx;
}
.loading-msgLeft {
    position: relative;
    max-width: 486rpx;
    border-radius: 8rpx;
    word-wrap: break-word;
    padding: 24rpx 24rpx;
    margin: 0 0 0 24rpx;
    background-color: #FFFFFF;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 42rpx;
    border-radius: 5px;
}

.loading-msgLeft::after {
    position: absolute;
    display: inline-block;
    content: '';
    width: 0;
    height: 0;
    top: 10px;
    right: 100%;
    border: 12rpx solid transparent;
    border-right: 12rpx solid #FFFFFF;
}	

.loading{
	justify-content: center;
}
.userMsg{
	justify-content: flex-end;
	margin: 20rpx 0;
}
.botMsg{
	justify-content: flex-start;
	margin: 20rpx 0;
}
	
.msgRight {
    position: relative;
    max-width: 486rpx;
    border-radius: 8rpx;
    word-wrap: break-word;
    padding: 24rpx 24rpx;
    margin: 0 24rpx;
    background-color: #C5B6FF;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 42rpx;
    border-radius: 5px;
}

.msgRight::after {
	/* 这个是聊天信息框右边尖尖的三角 */
    position: absolute;
    display: inline-block;
    content: '';
    width: 0;
    height: 0;
    left: 100%;
    top: 10px;
    border: 12rpx solid transparent;
    border-left: 12rpx solid #C5B6FF;
}
.msgLeft {
    position: relative;
    max-width: 486rpx;
    border-radius: 8rpx;
    word-wrap: break-word;
    padding: 0 12rpx 0 12rpx;
    margin: 0 24rpx;
    background-color: #FFFFFF;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 42rpx;
    border-radius: 5px;
}

.msgLeft::after {
    position: absolute;
    display: inline-block;
    content: '';
    width: 0;
    height: 0;
    top: 10px;
    right: 100%;
    border: 12rpx solid transparent;
    border-right: 12rpx solid #FFFFFF;
}

	
.avatar{
	display: flex;
	justify-content: center;
	width: 78rpx;
	height: 78rpx;
	border-radius: 50rpx;
	overflow: hidden;
}
	
	
/* 聊天消息区域样式 */	
.chat-content{
	/* 隐藏默认滚动条 */
	/* -webkit-overflow-scrolling: touch; */
	overflow-y: scroll;
	scrollbar-width: none; /* 对 Firefox 有效 */
	-ms-overflow-style: none;  /* 对 IE 和 Edge 有效 */
	
}	
.chat-content::-webkit-scrollbar {
    display: none; /* 对 Webkit 有效 */
}

.input-box{
	height: 60rpx;
	border-radius: 58.33rpx;
	bottom: 0;
	position: absolute;
}
	
.page {
    background-color: #f4f2fc;
    overflow-y: hidden;
    overflow-x: hidden;
	position: relative;
}

	
.group {
    padding-left: 30rpx;
    padding-right: 30rpx;
    padding-top: 60rpx;
	width: 100%;
}
.group_3 {
	height: 120rpx;
/*    padding: 10rpx 41.67rpx 18.5rpx 41.67rpx; */
    position: absolute;
    bottom: 15px;
    width: 100%; /* 根据需要调整宽度 */
    z-index: 1000; /* 确保在其他内容之上 */
	
}


.image-wrapper {
    width: 68.75rpx;
}
.image_2 {
    width: 41.67rpx;
    height: 41.67rpx;
}
.text-wrapper {
    margin-left: 60rpx;
}
.font {
    font-size: 33.33rpx;
    font-family: PingFang SC;
    line-height: 30.88rpx;
    color: #979797;
}
.text {
    color: #7451ff;
    line-height: 31.29rpx;
}

.text_2 {
    line-height: 30.54rpx;
}
.section {
    padding: 0 14.58rpx 28.17rpx;
    background-color: #eaeaea;
    border-radius: 33.33rpx 33.33rpx 33.33rpx 0rpx;
}

.text_1 {
    margin-left: 7.6rpx;
}
.text-wrapper_5 {
    padding: 23.5rpx 0 22.08rpx;
    background-color: #7451ff99;
    border-radius: 33.33rpx 33.33rpx 0rpx 33.33rpx;
}
.text_5 {
    margin-left: 20.17rpx;
    margin-right: 19.42rpx;
    line-height: 27.33rpx;
}
.input {
    position: relative;
    align-self: stretch;
}
.divider {
    margin-top: 15rpx;
    background-color: #d7d7d7;
    height: 2.08rpx;
}
.pos {
    position: absolute;
    left: 62.5rpx;
    top: 8.33rpx;
}
.textarea-field {
  width: 90%;
  min-height: 50rpx;
  /* height: 60rpx; */
  padding: 10rpx;
  border-radius: 20rpx;
  border: 1rpx solid #dcdcdc;
  resize: none;
  background-color: #FFFFFF;
  overflow-y: hidden; /* Ensure no scrollbars are shown */
  box-sizing: border-box; /* Ensure padding is included in height calculation */
}

.chat-container{
	padding: 30rpx 0 20rpx 0;
	border-radius: 58.33rpx;
}
</style>


