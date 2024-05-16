<template>
    <view class="flex-col page">
		<view class="flex-row items-center group">
			<view class="flex-col justify-start items-center image-wrapper">
				<image
					class="image_2"
					src="../../static/ui_icon/exit.png"
				/>	
			</view>
			<view class="flex-col justify-start text-wrapper"><text class="font text">答疑</text></view>
			<view class="flex-col justify-start text-wrapper_2"><text class="font text_2">历史</text></view>
		</view>
		<view class="self-stretch divider"></view>
		<view class="chat-container">
			<scroll-view scroll-y="true" class="chat-content" 
				:style="{height: `${windowHeight - inputHeight - 180}rpx`}"
				id = "scrollview">
				<view class="chatList-container" id="msgList-container">
					<view v-for="(item,index) in msgList" :key="index">
						<view class="flex-row userMsg" v-if="item.userContent != ''">
							<!-- 用户发的信息 -->
							<view class="msgRight">
								{{item.userContent}}
							</view>
							<image class="avatar" src="../../static/logo.png"></image>
						</view>
						<view class="flex-row botMsg" v-if="item.botContent != ''">
							<!-- 机器人发的信息 -->
							<image class="avatar" src="../../static/ui_icon/logo_black.png"></image>
							<view class="msgLeft">
								<!-- {{item.botContent}} -->
								{{kimi_res}}
							</view>
							
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>
		
	
		<view class="flex-row group_3">
			<uni-easyinput class="input-box"
			:disabled="input_disable"
			type="text"
			@iconClick="sendMsg"
			suffix-icon="paperplane"
			v-model="inputMsg" placeholder="向智学学习助手提问吧~"></uni-easyinput>
		</view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				input_disable: false, // 默认情况下
				inputMsg: "",		// input框发送的信息
				keyboardHeight: 0,
				bottomHeight: 0,
				scrollTop: 0, // 滚动距离
				userId: '',
				msgList: [],
				//-----测试kimi-------
				kimi_res:'',
				history: [],
				//-----测试kimi--------
			  
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
		methods: {
			async askKimi(prompt){
				
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
				this.scrollToBottom();
				this.msgList.push({
					botContent: "",
					userContent: prompt
				});
				this.input_disable = true;
				
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
				} else {
					console.error(res.result.error)
				}
				
				this.msgList.push({
					botContent: this.kimi_res,
					userContent: ""
				});
				this.input_disable = false
				console.log(this.msgList)
			},
			// rpx 转换成 px
			rpxTopx(px) {
				let deviceWidth = uni.getSystemInfoSync().windowWidth;
				let rpx = (750 / deviceWidth) * Number(px);
				return Math.floor(rpx);
			},
			// 滚动至聊天底部
			scrollToBottom() {
				setTimeout(() => {
					let query = uni.createSelectorQuery().in(this);
					query.select('#scrollview').boundingClientRect();
					query.select('#msgList-container').boundingClientRect();
					query.exec((res) => {
						if (res && res[0] && res[1] && res[1].height > res[0].height) {
							this.scrollTop = this.rpxTopx(res[1].height - res[0].height);
					  }
					});
				}, 15);
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
    padding: 24rpx 24rpx;
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
/* 	position: absolute; */
}
	
.mt-7 {
    margin-top: 14.58rpx;
}
.page {
	padding: 15.67rpx 20.67rpx 37.5rpx;
    background-color: #f4f2fc;
    border-radius: 58.33rpx;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
	position: relative;
}
.header {
    margin-top: -91.67rpx;
    padding: 91.67rpx 0 22.92rpx;
    background-color: #f4f2fc;
}
.group {
    padding: 0 17.67rpx;
	width: 100%;
}
.group_3 {
	height: 60rpx;
    padding: 0 41.67rpx 18.5rpx 41.67rpx;
    position: absolute;
    bottom: 0;
    width: 90%; /* 根据需要调整宽度 */
    z-index: 1000; /* 确保在其他内容之上 */
}

/* .group_3 {
    padding: 995.83rpx 125rpx 172.92rpx;
	border-radius: 58.33rpx;
} */


.image-wrapper {
    width: 68.75rpx;
}
.image_2 {
    width: 41.67rpx;
    height: 41.67rpx;
}
.text-wrapper {
    margin-left: 140.44rpx;
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
.text-wrapper_2 {
    margin-left: 158.17rpx;
}
.text_2 {
    line-height: 30.54rpx;
}

.text-wrapper_3 {
    padding: 24rpx 0 21.08rpx;
    background-color: #7451ff99;
    border-radius: 0 0 0rpx 33.33rpx;
}
.font_2 {
    font-size: 29.17rpx;
    font-family: PingFang SC;
    line-height: 26.92rpx;
    font-weight: 300;
    color: #000000;
}
.text_3 {
    margin-left: 20.48rpx;
    margin-right: 19.1rpx;
}
.section {
    padding: 0 14.58rpx 28.17rpx;
    background-color: #eaeaea;
    border-radius: 33.33rpx 33.33rpx 33.33rpx 0rpx;
}
.text-wrapper_4 {
    margin-right: 11.48rpx;
    padding-top: 17.25rpx;
    height: 368.75rpx;
    border-bottom: solid 2.08rpx #d7d7d7;
}
.font_3 {
    font-size: 29.17rpx;
    font-family: PingFang SC;
    line-height: 50rpx;
    font-weight: 300;
    color: #000000;
}
.font_4 {
    font-size: 20.83rpx;
    font-family: PingFang SC;
    line-height: 19.9rpx;
    font-weight: 100;
    color: #979797;
}
.text_4 {
    transform: rotate(0.7deg);
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
.section_2 {
    padding: 0 15.6rpx 13.58rpx;
    background-color: #eaeaea;
    border-radius: 33.33rpx 33.33rpx 33.33rpx 0rpx;
}
.text-wrapper_6 {
    margin-right: 5.23rpx;
    padding-top: 14.79rpx;
    height: 466.29rpx;
    border-bottom: solid 2.08rpx #d7d7d7;
}
.text_6 {
    margin-right: 5.23rpx;
}
.text_15 {
    margin-left: 6.58rpx;
}
.input {
    position: relative;
    align-self: stretch;
}
.section_3 {
    padding: 19.13rpx 52.02rpx 19.54rpx 54.17rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    box-shadow: 0rpx 8.33rpx 8.33rpx #00000040;
}
.text_7 {
    margin-left: 59.46rpx;
    color: #979797;
    font-size: 25rpx;
    font-family: PingFang SC;
    line-height: 23rpx;
}
.divider {
    margin-top: 14.13rpx;
    background-color: #d7d7d7;
    height: 2.08rpx;
}
.text_8 {
    margin-left: 61.94rpx;
    margin-top: 16.25rpx;
}

.pos {
    position: absolute;
    left: 62.5rpx;
    top: 8.33rpx;
}
.group_4 {
    margin-bottom: -172.92rpx;
    opacity: 0.95;
    height: 172.92rpx;
}
.tab-bar {
    padding: 35.42rpx 0 35.42rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
    backdrop-filter: blur(0rpx);
}
.group_5 {
    padding: 16.75rpx 0 10.29rpx;
    flex: 1 1 188rpx;
    border-radius: 58.33rpx;
    overflow: hidden;
    height: 102.08rpx;
}
.image_3 {
    width: 54rpx;
    height: 54rpx;
}
.section_4 {
    padding: 14.67rpx 0 10.33rpx;
    flex: 1 1 188rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    overflow: hidden;
    height: 102.08rpx;
}
.section_7 {
    padding: 16.75rpx 0 10.44rpx;
    flex: 1 1 188rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    overflow: hidden;
    height: 102.08rpx;
}
.section_5 {
    padding: 6.33rpx 0 10.38rpx;
    flex: 1 1 188rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    overflow: hidden;
    height: 102.08rpx;
}
.font_5 {
    font-size: 20.83rpx;
    font-family: PingFang SC;
    line-height: 19.9rpx;
    color: #a6a9b2;
}
.text_11 {
    line-height: 19.13rpx;
}
.text_10 {
    line-height: 19.44rpx;
}
.text_9 {
    color: #7451ff;
    line-height: 19.31rpx;
}
.text_12 {
    line-height: 19.29rpx;
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
	padding: 30rpx 0 0 0;
	border-radius: 58.33rpx;
}
</style>
