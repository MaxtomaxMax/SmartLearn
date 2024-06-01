<template>
    <view class="flex-col page" :style="{ width: containerWidth, height: containerHeight}">
        <view class="flex-col flex-1 group_2">
			<view class="exit-container">
				<image class="image_5" 
					   src="../../static/ui_icon/exit.png" 
					   style="border-radius: 0;" 
					   @click="exit">
				</image>
			</view>
            <view class="flex-col self-stretch group_3">
                <view class="flex-col">
                    <view class="mt-18 flex-row justify-between items-center">
                        <text class="font text_4">发送平静值测试提醒</text>
                        <switch :value="isReminderOn" @change="toggleReminder" />
                    </view>

                    <view class="mt-18 flex-row justify-between items-center">
                        <text class="font text_5">提醒时间</text>
                        <picker
                            mode="time"
                            value="{{setTime}}"
                            start="00:00"
                            end="23:59"
                            @change="bindTimeChange"
                        >
                            <!-- 显示选择的时间 -->
                            <text class="font text_6">{{ setTime }}</text>
                        </picker>
                    </view>

                    <view class="mt-18 flex-row justify-between items-center">
                        <text class="font text_4">关注我需要经过我同意</text>
                        <switch :value="isFollowOn" @change="toggleFollow" />
                    </view>
                    <view class="mt-18 flex-row justify-between items-center">
                        <text class="font text_3">净学习时长排行榜</text>
                        <switch :value="isRankingOn" @change="toggleRanking" />
                    </view>
                </view>
            </view>
            <view class="flex-col self-stretch group_4">
                <view class="flex-row justify-between items-center">
                    <text class="font">头像</text>
                    <image class="image_5" :src="imageUrl" @click="changeImage" />
                </view>
                <view class="flex-col mt-19">
                    <view
                        class="flex-row justify-between items-center"
                        @click="editNickname"
                    >
                        <text class="font text_7">昵称</text>
                        <text class="text_8">{{ username }}</text>
                    </view>
                    <view
                        class="mt-22 flex-row justify-between items-center"
                        @click="editSignature"
                    >
						<view class="signature-title-container">
							<text class="font text_9">签名</text>
						</view>
                        <view class="signature-text-container items-end">
                        	<text class="font text_10">{{ signature }}</text>
                        </view>
                    </view>
                </view>
            </view>
            <image
                class="self-center image_6"
                src="../../static/ui_icon/avatar.png"
            />
			<button class="logout-container" @click="confirmLogout"><text class="self-center font text_11" 
            >退出登录</text
            ></button>
			
            
        </view>
    </view>
</template>

<script>
const db = uniCloud.database();
export default {
    components: {},
    props: {},
    data() {
        return {
			containerWidth: '0px',
			containerHeight: '0px',
			
			userId:"",
			avatarToStore:"",
			
            username: "未命名用户",
            signature: "写下自己的个性签名吧",
            isReminderOn: false,
            setTime: "9：00",
            imageUrl:"../../static/ui_icon/avatar.png",
			
			isFollowOn: true,
			isRankingOn: true,
        };
    },
	onLoad() {
		// 获得屏幕信息
		this.setContainerSize();
		
		// 获得userId
		this.userId = uni.getStorageSync("user_id");
		
		// 获取头像
		this.imageUrl = uni.getStorageSync("avatar_url")
		 
		// 获取用户名
		this.username = uni.getStorageSync("username");
		
		// 获取个性签名
		this.signature = uni.getStorageSync("signature");
	},
    methods: {
		exit(){
			uni.navigateBack();
		},
		toggleFollow(){
			return;
		},
		toggleRanking(){
			return;
		},
		setContainerSize() {
			try {
				const res = uni.getSystemInfoSync();
				console.log(res);
				const screenWidth = res.screenWidth;
				// 屏幕高度要前去头部
				// #ifdef MP-WEIXIN
				const screenHeight = res.windowHeight;
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
		
        //头像
        changeImage() {
            uni.chooseImage({
                count: 1,
                sizeType: ["compressed"],
                sourceType: ["album", "camera"],
                success: (res) => {
                    const tempFilePaths = res.tempFilePaths[0];
                    this.imageUrl = tempFilePaths;

                    uni.showModal({
                        title: "头像设置结果",
                        content: "设置成功！",
                        showCancel: false,
                    });
					
					// 把该图像上传的unicloud的云存储
					uniCloud.uploadFile({
						filePath: tempFilePaths,
						cloudPath: this.userId + "_avatar.jpg",
					}).then(res=>{
						// console.log(res);
						this.avatarToStore = res.fileID;
						// 本地缓存头像数据
						uni.setStorageSync('avatar_url', tempFilePaths);
						
						// 图片上云数据库
						db.collection("SmartLearn_user")
							.doc(this.userId)
							.update({
								avatar: this.avatarToStore,
							})
							.then(res=>{
								console.log(res)
							});	
					}).catch(err=>{
						console.log(err);
					})
                },
                fail: (err) => {
                    console.log("选择图片失败", err);
                },
            });
        },

        //修改定时发送提醒时间
        bindTimeChange(e) {
            this.setTime = e.detail.value; // 更新时间
        },
        //修改开关状态，
        toggleReminder(event) {
            // 更新开关状态基于事件传递的值
            this.isReminderOn = event.detail.value;
            console.log("Switch state changed to:", this.isReminderOn);
            uni.showModal({
                title: "发送测试提醒",
                content: `${this.isReminderOn ? "提醒已开启" : "提醒已关闭"}`,
                showCancel: false,
            });
        },
        //修改昵称
        editNickname() {
            uni.showModal({
                title: "编辑昵称",
                content: this.username,
                editable: true,
                success: (res) => {
                    if (res.confirm && res.content) {
                        this.username = res.content;
						// 更新本地存储
						uni.setStorageSync("username", this.username);
						// 修改云数据库
						db.collection("SmartLearn_user")
							.doc(this.userId)
							.update({
								username: this.username,
							})
							.then(res=>{
								console.log(res);
							}).catch(err=>{
								console.log(err);
							});
                    }
                },
            });
        },

        editSignature() {
            uni.showModal({
                title: "编辑签名",
                content: this.signature,
                editable: true,
                success: (res) => {
                    if (res.confirm && res.content) {
                        this.signature = res.content;
						// 本地缓存修改
						uni.setStorageSync("signature", this.signature);
						
						// 修改云数据库
						db.collection("SmartLearn_user")
							.doc(this.userId)
							.update({
								signature: this.signature,
							})
							.then(res=>{
								console.log(res);
							}).catch(err=>{
								console.log(err);
							});
                    }
                },
            });
        },
        //
        confirmLogout() {
            uni.showModal({
                title: "确认",
                content: "确定要退出登录吗？",
                success: (res) => {
                    if (res.confirm) {
                        //console.log('用户点击确定');
						uni.setStorageSync("user_id","");
						uni.setStorageSync("username","");
						uni.setStorageSync("avatar_url","");
						uni.setStorageSync("signature","");

                        uni.reLaunch({
                            url: "/pages/login/log_in", // 跳转到登录页面
                        });
                    } else if (res.cancel) {
                        console.log("用户点击取消");
                    }
                },
            });
        },
    },
};
</script>

<style scoped lang="css">
.exit-container{
	padding-top: 30rpx;
	height: 80rpx;
}	
.logout-container{
	margin-top: 20rpx;
	border-radius: 30rpx;
	background-color: #7451ff;
}
.signature-text-container{
	width: 450rpx;
	text-align: end;
}
.mt-18 {
    margin-top: 50rpx;
}
.mt-21 {
    margin-top: 43.75rpx;
}
.mt-17 {
    margin-top: 35.42rpx;
}
.mt-19 {
    margin-top: 39.58rpx;
}
.page {
    background-color: #f4f2fc;
    border-radius: 58.33rpx;
    overflow-y: hidden;
    overflow-x: hidden;
}
.font {
    font-size: 29.17rpx;
    font-family: PingFang SC;
    line-height: 27rpx;
    color: #000000;
}
.group_2 {
    padding: 0 62.5rpx 329.17rpx;
    overflow-y: auto;
}
.group_3 {
    padding: 39.58rpx 12.5rpx 29.17rpx;
    border-bottom: solid 4.52rpx #9797974d;
}
.text_2 {
    line-height: 27.25rpx;
}
.image_3 {
    margin-right: 12.5rpx;
}
.switch {
    border-radius: 47.92rpx;
    width: 62.5rpx;
    height: 37.21rpx;
}
.text_3 {
    line-height: 27.27rpx;
}
.text_4 {
    line-height: 27.06rpx;
}
.image_4 {
    border-radius: 47.92rpx;
    width: 60.42rpx;
    height: 35.42rpx;
}
.text_5 {
    line-height: 27.04rpx;
}
.text_6 {
    margin-right: 12.5rpx;
    line-height: 21.65rpx;
}
.font_2 {
    font-size: 29.17rpx;
    font-family: PingFang SC;
    line-height: 1.98rpx;
    color: #000000;
}
.group_4 {
    padding: 25rpx 12.5rpx 33.33rpx;
}
.image_5 {
    margin-right: 8.33rpx;
    border-radius: 50%;
    width: 40rpx;
    height: 40rpx;
}
.text_7 {
    line-height: 26.96rpx;
}
.text_8 {
    margin-right: 8.33rpx;
    color: #979797;
    font-size: 29.17rpx;
    font-family: PingFang SC;
    line-height: 21.23rpx;
}
.text_9 {
    line-height: 26.75rpx;
}
.text_10 {
	flex-shrink: 1;
    color: #979797;
	font-size: 25rpx;
}
.image_6 {
    width: 625rpx;
    height: 4.17rpx;
}
.text_11 {
    margin-top: 41.67rpx;
    color: #ffffff;
    line-height: 26.83rpx;
    letter-spacing: 12.5rpx;
}
.tab-bar {
    padding: 54.17rpx 62.5rpx 41.67rpx 66.67rpx;
    background-color: #ffffff;
    border-radius: 58.33rpx;
    box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
    backdrop-filter: blur(0rpx);
    z-index: 100;
}
.group_5 {
    height: 77.06rpx;
}
.image_7 {
    width: 54rpx;
    height: 54rpx;
}
.font_3 {
    font-size: 20.83rpx;
    font-family: PingFang SC;
    line-height: 19.44rpx;
    color: #a6a9b2;
}
.text_12 {
    line-height: 19.21rpx;
}
.group_6 {
    height: 77.08rpx;
}
.group_7 {
    height: 76.98rpx;
}
.text_13 {
    line-height: 19.13rpx;
}
.group_8 {
    height: 77.1rpx;
}
.text_14 {
    color: #7451ff;
    line-height: 19.42rpx;
}
</style>
