<template>
	<view class="chat">
    <!-- 顶部标题 -->
    <view class="topTabbar">
      <!-- 返回图标 -->
      <u-icon class="icon" name="arrow-left" size="20px" color="#000" @click="goback()"></u-icon>
      <!-- 标题 -->
      <view class="text">匿名</view>
    </view>
		<scroll-view  :style="{height: `${windowHeight-inputHeight - 180}rpx`}"
		id="scrollview"
		scroll-y="true" 
		:scroll-top="scrollTop"
		class="scroll-view"
		>
			<!-- 聊天主体 -->
			<view id="msglistview" class="chat-body">
				<!-- 聊天记录 -->
				<view v-for="(item,index) in msgList" :key="index">
					<!-- 自己发的消息 -->
					<view class="item self" v-if="item.userContent != ''" >
						<!-- 文字内容 -->
						<view class="content right">
						{{item.userContent}}
						</view>
						<!-- 头像 -->
						<image class="avatar" :src="item.image">
						</image>
					</view>
					<!-- 机器人发的消息 -->
					<view class="item Ai" v-if="item.botContent != ''">
						<!-- 头像 -->     
						<image class="avatar" :src="item.image">
						</image>
						<!-- 文字内容 -->
						<view class="content left">
							{{item.botContent}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部消息发送栏 -->
		<!-- 用来占位，防止聊天消息被发送框遮挡 -->
		<view class="chat-bottom" :style="{height: `${inputHeight}rpx`}">
			<view class="send-msg" :style="{bottom:`${keyboardHeight - 60}rpx`}">
        <view class="uni-textarea">
          <textarea v-model="chatMsg"
            maxlength="300"
            confirm-type="send"
            @confirm="handleSend"
            placeholder="快来聊天吧~"
            :show-confirm-bar="false"
            :adjust-position="false"
            @linechange="sendHeight"
            @focus="focus" @blur="blur"
           auto-height></textarea>
        </view>
				<button @click="handleSend" class="send-btn">发送</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data() {
			return {
				//键盘高度
				keyboardHeight:0,
				//底部消息发送高度
				bottomHeight: 0,
				//滚动距离
				scrollTop: 0,
				userId:'',
				//发送的消息
				chatMsg:"",
				msgList:[
					{
					    botContent: "你好啊，很高兴你可以关注我，请问我有什么可以帮助你的吗？",
					    userContent: "",
              image:"/static/common/unname1.jpeg"
					},
					{
					    botContent: "",
					    userContent: "你好呀，非常高兴认识你",
              image:"/static/common/unname2.jpg"
					},
				]	
			}
		},
		updated(){
			//页面更新时调用聊天消息定位到最底部
			this.scrollToBottom();
		},
		computed: {
			windowHeight() {
			    return this.rpxTopx(uni.getSystemInfoSync().windowHeight)
			},
			// 键盘弹起来的高度+发送框高度
			inputHeight(){
				return this.bottomHeight+this.keyboardHeight
			}
		},
		onLoad(){
        uni.onKeyboardHeightChange(res => {
				//这里正常来讲代码直接写
				//this.keyboardHeight=this.rpxTopx(res.height)就行了
				//但是之前界面ui设计聊天框的高度有点高,为了不让键盘和聊天输入框之间距离差太大所以我改动了一下。
				this.keyboardHeight = this.rpxTopx(res.height)
				if(this.keyboardHeight<0)this.keyboardHeight = 0;
			})
		},
		onUnload(){
			// uni.offKeyboardHeightChange()
		},
		methods: {
      goback() {
        uni.switchTab({
          url: "/pages/tutorship/tutorship"
        })
      },
			focus(){
				this.scrollToBottom()
			},
			blur(){
				this.scrollToBottom()
			},
			// px转换成rpx
			rpxTopx(px){
				let deviceWidth = uni.getSystemInfoSync().windowWidth
				let rpx = ( 750 / deviceWidth ) * Number(px)
				return Math.floor(rpx)
			},
			// 监视聊天发送栏高度
			sendHeight() {
			        setTimeout(() => {
			            let query = uni.createSelectorQuery();
			            query.select('.send-msg').boundingClientRect();
			            query.exec(res => {
			                if (res && res[0] && res[0].height) {  // 增加空值检查
			                    this.bottomHeight = this.rpxTopx(res[0].height);
			                } else {
			                    console.warn("Failed to retrieve .send-msg height.");
			                }
			            });
			        }, 10);
			    },
			// 滚动至聊天底部
			scrollToBottom(e){
				setTimeout(()=>{
					let query = uni.createSelectorQuery().in(this);
					query.select('#scrollview').boundingClientRect();
					query.select('#msglistview').boundingClientRect();
					query.exec((res) =>{
						if(res[1].height > res[0].height){
							this.scrollTop = this.rpxTopx(res[1].height - res[0].height)
						}
					})
				},15)
			},
			// 发送消息
			handleSend() {
				//如果消息不为空
				if(!this.chatMsg||!/^\s+$/.test(this.chatMsg)){
					let obj = {
						botContent: "",
						userContent: this.chatMsg,
            image:"/static/common/unname2.jpg"
					}
					this.msgList.push(obj);
					this.chatMsg = '';
					this.scrollToBottom()
				}else {
					this.$modal.showToast('不能发送空白消息')
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	
	$chatContentbgc: #C2DCFF;
	$sendBtnbgc: #4F7DF5;
	
	view,button,text,input,textarea {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
 
	/* 聊天消息 */
	.chat {
     .topTabbar {
          width: 100%;
          height: 90rpx;
          line-height: 90rpx;
          display: flex;
          margin-top: 80rpx;
          justify-content: space-between;
      
          .icon {
            margin-left: 20rpx;
          }
      
          .text {
            margin: auto;
            font-size: 16px;
            font-weight: 700;
          }
      
          .button {
            width: 10%;
            margin: auto 20rpx auto 0rpx;
          }
        }
		.scroll-view {
			::-webkit-scrollbar {
					    display: none;
					    width: 0 !important;
					    height: 0 !important;
					    -webkit-appearance: none;
					    background: transparent;
					    color: transparent;
					  }
			
			// background-color: orange;
			background-color: #F6F6F6;
			
			.chat-body {
				display: flex;
				flex-direction: column;
				padding-top: 23rpx;
				// background-color:skyblue;
				
				.self {
					justify-content: flex-end;
				}
				.item {
					display: flex;
					padding: 23rpx 30rpx;
					// background-color: greenyellow;
 
					.right {
						background-color: $chatContentbgc;
					}
					.left {
						background-color: #FFFFFF;
					}
                    // 聊天消息的三角形
					.right::after {
						position: absolute;
						display: inline-block;
						content: '';
						width: 0;
						height: 0;
						left: 100%;
						top: 10px;
						border: 12rpx solid transparent;
						border-left: 12rpx solid $chatContentbgc;
					}
 
					.left::after {
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
 
					.content {
						position: relative;
						max-width: 486rpx;
						border-radius: 8rpx;
						word-wrap: break-word;
						padding: 24rpx 24rpx;
						margin: 0 24rpx;
						border-radius: 5px;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 42rpx;
					}
 
					.avatar {
						display: flex;
						justify-content: center;
						width: 78rpx;
						height: 78rpx;
						background: $sendBtnbgc;
						border-radius: 50rpx;
						overflow: hidden;
						
						image {
							align-self: center;
						}
 
					}
				}
			}
		}
 
		/* 底部聊天发送栏 */
		.chat-bottom {
			width: 100%;
			height: 100rpx;
			background: #F4F5F7;
			transition: all 0.1s ease;
			
			.send-msg {
				display: flex;
				align-items: flex-end;
				padding: 16rpx 30rpx;
				width: 100%;
				min-height: 177rpx;
				position: fixed;
				bottom: 0;
				background: #fff;
				transition: all 0.1s ease;
			}
 
			.uni-textarea {
				padding-bottom: 70rpx;  
				textarea {
					width: 537rpx;
					min-height: 75rpx;
					max-height: 500rpx;
					background: #f1f1f1;
					border-radius: 40rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					color: #333333;
					line-height: 74rpx;
					padding: 5rpx 8rpx;
          text-indent: 30rpx;
				}
			}
            
			.send-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 76rpx;
				margin-left: 25rpx;
				width: 120rpx;
				height: 75rpx;
				background: #ed5a65;
				border-radius: 50rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 28rpx;
			}
		}
	}
</style>