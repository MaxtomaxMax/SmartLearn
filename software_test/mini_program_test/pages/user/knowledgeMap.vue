<template>
    <view class="flex-col page" :style="{ width: containerWidth, height: containerHeight}">
		<view class="flex-row items-center group">
			<view class="flex-col justify-start items-center image-wrapper">
					<image
						class="image_2"
						src="../../static/ui_icon/exit.png"
						@click="exit"
					/>
			</view>
			<view class="flex-col justify-start text-wrapper" @click="enterChat"><text class="font text_2" >自由问答</text></view>
			<view class="flex-col justify-start text-wrapper"><text class="font text">知识框架</text></view>
			<view class="flex-col justify-start text-wrapper" @click="enterChatHistory"><text class="font text_2" >历史</text></view>
		</view>
		<view class="self-stretch divider"></view>
		
		<view class="chat-container">
			<scroll-view scroll-y="true" class="chat-content" 
				:style="{height: `${windowHeight - inputHeight - 180}rpx`}"
				:scroll-into-view="scroll_anchor"
				scroll-with-animation
				ref= "scrollview"
				id = "scrollview">
				<view class="chatList-container" id="msgList-container">
					<view v-for="(item,index) in msgList" :key="index">
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
		
	
		<view class="flex-col group_3">
			<view class="select-container">
				<uni-data-select
				      v-model="project_value"
				      :localdata="project_range"
				      @change="project_change"
					  placeholder="请选择学习项目"
					  placement="top"
				    ></uni-data-select>
			</view>
			

			
			<view class="" style="width: 100%;">
							<uni-easyinput	
			:disabled="input_disable"
			:clearable="false"
			type="text"
			v-model="inputMsg" 
			:placeholder="input_disable?'智学AI助手正在准备回答...':'请输入知识点关键词~'"
			style="width: 100%;"></uni-easyinput>
			</view>
			<view class="flex-row justify-center button-container">
				<view class="preKnowledgeButton">
					<button class="button-style" :disabled="input_disable" @click="callPreKnowledge">
						<text class="button-text">生成前置知识</text>
					</button>
				</view>
				<view class="advancedKnowledgeButton">
					<button class="button-style" :disabled="input_disable" @click="callAdvancedKnowledge">
						<text class="button-text">生成进阶知识</text>
					</button>
				</view>
			</view>
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
				
				// 选择框
				project_value:0,
				project_range:[
					{ value: 1, text: "信号与系统" },
					{ value: 2, text: "电子系统综合设计" },
					{ value: 3, text: "通信原理" },
				],
				
				// 生成的复习问题列表
				reviewQuestion:'',
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
		async onLoad() {
			this.setContainerSize();
			this.userId = uni.getStorageSync("user_id");
			
			// 获取学习项目
			const getProjectRes = await db.collection("SmartLearn_project")
				.where({
					userId: this.userId,
				})
				.get()
			// console.log(getProjectRes)
			
			// 构建选择框
			let projectList = getProjectRes.result.data;
			let tempList = [];
			let tempObj = {};
			for (let i = 0; i < projectList.length; i++){
				// console.log(projectList[i])
				tempObj["value"] = i + 1;
				tempObj["text"] = projectList[i].project_name
				tempList.push(tempObj);
				console.log(tempObj)
				tempObj = {};	// tempObj为对象引用，需要重置创造新的引用
			}
			this.project_range = tempList;
			console.log(this.project_range)
			
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
			enterChat(){
				uni.navigateTo({
					url:"/pages/user/chat"
				})
			},
			exit(){
				uni.switchTab({
					url:"/pages/review/learning"
				})
			},
			async callPreKnowledge(){
				// 确认是否完成选择和输入
				if (this.project_value == 0 || this.inputMsg == "" ){
					uni.showToast({
						title:"请选择学习项目与知识点关键词~",
						icon:"error"
					});
					return;
				};
				
				// 调用云函数获取kimi回复
				this.input_disable = true;
				this.scrollToBottom();
				// 赋值后可以防止按下按钮后更改影响生成
				let project = this.project_range[this.project_value - 1].text;
				let keyword = this.inputMsg
				
				// 如果已经提问过了，直接从数据库中获取数据
				if (this.userId){
					const checkDbRes = await db.collection("knowledgeMap")
						.where({
							userId: this.userId,
							project,
							keyword,
							flag:0
						})
						.get()
					console.log(checkDbRes);
					if (checkDbRes.result.data.length){
						this.kimi_res = checkDbRes.result.data[0].answer;
						// 更新聊天对话框
						this.msgList.push({
							botContent: this.kimi_res
						});
						// console.log(this.msgList);
						
						this.input_disable = false;
						// 滚动到最底下
						this.scrollToBottom();
						
					} else {
						console.log("数据库中没有数据")
						console.log("调用kimi获取知识框架")
						let res = await uniCloud.callFunction({
							name:"callKnowledgeMap",
							data:{
								project,
								keyword,
								flag:0	// 表示生成前置知识的flag
							}
						});
						// console.log(res);
						if (res.result.success) {
							this.kimi_res = res.result.message;
							this.history = res.result.history;
							console.log(res)
							
							// 更新聊天对话框
							this.msgList.push({
								botContent: this.kimi_res
							});
							// console.log(this.msgList);
						} else{
							console.error(res.result.error)
						}
						
						this.input_disable = false;
						// 滚动到最底下
						this.scrollToBottom();
						
						// 这个地方生成提问
						let questionGenRes = await uniCloud.callFunction({
							name:"questionGen",
							data:{
								project,
								keyword
							}
						});
						this.reviewQuestion = questionGenRes.result.message;
						// console.log(questionGenRes);
						console.log("生成复习问题列表成功");
						console.log(this.reviewQuestion);
						// return;
						
						// 生成完成之后存到云数据库上
						if (questionGenRes.result.success ){
							if (this.userId){
								const storageRes = await db.collection("knowledgeMap").add({
									userId: this.userId,
									posttime: Date.now(),
									project,
									keyword,
									flag:0,
									answer: this.kimi_res,
									reviewQuestion: this.reviewQuestion	,
									masterLevel: 0,
								});
								// console.log(storageRes);
								console.log("数据存储成功");
								}
						} else {
							console.error(res.result.error);
						}
					}
				}
			},
			async callAdvancedKnowledge(){
				// 确认是否完成选择和输入
				if (this.project_value == 0 || this.inputMsg == "" ){
					uni.showToast({
						title:"请选择学习项目与知识点关键词~",
						icon:"error"
					});
					return;
				};
				
				// 调用云函数获取kimi回复
				this.input_disable = true;
				this.scrollToBottom();
				// 赋值后可以防止按下按钮后更改影响生成
				let project = this.project_range[this.project_value - 1].text;
				let keyword = this.inputMsg
				
				// 如果已经提问过了，直接从数据库中获取数据
				if (this.userId){
					const checkDbRes = await db.collection("knowledgeMap")
						.where({
							userId: this.userId,
							project,
							keyword,
							flag:1
						})
						.get()
					console.log(checkDbRes);
					if (checkDbRes.result.data.length){
						this.kimi_res = checkDbRes.result.data[0].answer;
						// 更新聊天对话框
						this.msgList.push({
							botContent: this.kimi_res
						});
						// console.log(this.msgList);
						
						this.input_disable = false;
						// 滚动到最底下
						this.scrollToBottom();
						
					} else {
						console.log("数据库中没有数据")
						console.log("调用kimi获取知识框架")
						let res = await uniCloud.callFunction({
							name:"callKnowledgeMap",
							data:{
								project,
								keyword,
								flag:1	// 表示生成进阶知识的flag
							}
						});
						// console.log(res);
						if (res.result.success) {
							this.kimi_res = res.result.message;
							this.history = res.result.history;
							console.log(res)
							
							// 更新聊天对话框
							this.msgList.push({
								botContent: this.kimi_res
							});
							// console.log(this.msgList);
						} else{
							console.error(res.result.error)
						}
						
						this.input_disable = false;
						// 滚动到最底下
						this.scrollToBottom();
						
						// 这个地方生成提问
						let questionGenRes = await uniCloud.callFunction({
							name:"questionGen",
							data:{
								project,
								keyword
							}
						});
						this.reviewQuestion = questionGenRes.result.message;
						// console.log(questionGenRes);
						console.log("生成复习问题列表成功");
						console.log(this.reviewQuestion);
						// return;
						
						// 生成完成之后存到云数据库上
						if (questionGenRes.result.success ){
							if (this.userId){
								const storageRes = await db.collection("knowledgeMap").add({
									userId: this.userId,
									posttime: Date.now(),
									project,
									keyword,
									flag:1,
									answer: this.kimi_res,
									reviewQuestion: this.reviewQuestion	,
									masterLevel: 0,
								});
								// console.log(storageRes);
								console.log("数据存储成功");
								}
						} else {
							console.error(res.result.error);
						}
					}
				}
			},
			project_change(){
				
				// 存相应的token
				
				// 获取对应的子项目
				return;
			},
			subProject_change(){
				// 更改对应的token
				return;
			},
			
			enterChatHistory(){
				uni.redirectTo({
					url:"/pages/user/chat_history"
				})
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
.button-text{
	color: #FFFFFF;
	font-family: kaiti;
}
.button-style{
	background-image: linear-gradient(180deg, #453099b3 0%, #7451ff 100%);
	border-radius: 104.17rpx;
	
}
.preKnowledgeButton{
	padding-right: 40rpx;
	width: 350rpx;
}
.advancedKnowledgeButton{
	padding-left: 40rpx;
	width: 350rpx;
}
.button-container{
	height: 80rpx;
	padding-top: 20rpx;
}
.select-container >>> .uni-select {
	padding: 0 20px;
	padding-left: 10px;
}
.select-container{
	background-color: #FFFFFF;
	width: 100%;
}
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
	height: 300rpx;
    padding: 10rpx 41.67rpx 18.5rpx 41.67rpx;
    position: relative;
    bottom: 0;
    width: 100%; /* 根据需要调整宽度 */
    z-index: 1000; /* 确保在其他内容之上 */
	opacity: 1;	 /*完全不透明 */
	background-color: #f4f2fc; 
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


.chat-container{
	padding: 30rpx 0 20rpx 0;
	border-radius: 58.33rpx;
}
</style>


