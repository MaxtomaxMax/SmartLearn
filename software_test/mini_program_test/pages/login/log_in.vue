<!-- 已经注册的用户进行登录 -->
<template>
    <view class="flex-col page">
        <image
            class="self-center image"
            src="../../static/ui_icon/logo_black.png"
        />
        <text class="self-center text">欢迎回来</text>
        <text class="self-center text_2">学者，当觅学之法，方能事半功倍</text>
        <view class="flex-col self-stretch group">
            <view class="flex-col">
                <text class="self-start font text_3">邮箱</text>
                <!-- <view class="flex-col justify-start items-start text-wrapper input mt-5">
                    <text class="font_2 text_4 text_5">请输入邮箱</text>
                </view> -->
				<!-- 将文本输入框替换成输入邮箱的输入框 -->
                <input v-model="email" class="flex-col justify-start items-start text-wrapper input mt-5" type="text" placeholder="  请输入邮箱" style="font-size: 36.67rpx;"/>
            </view>
            <view class="mt-20 flex-col">
                <text class="self-start font text_6">密码</text>
                <!-- <view class="flex-col justify-start items-start text-wrapper input mt-5">
                    <text class="font_2 text_4">请输入密码</text>
                </view> -->
				<input v-model="password" class="flex-col justify-start items-start text-wrapper input mt-5" type="password" placeholder="  请输入密码" style="font-size: 36.67rpx;"/>
            </view>
        </view>
        <button class="flex-col justify-start items-center button text-wrapper_2" @click="login">
            <text class="text_7">登录</text>
        </button>
        <!-- 修改为跳转到注册页面的链接 -->
        <view class="self-center group_2">
            <text class="font_2 text_8">还没有账号？</text>
            <text class="font_2 text_9" @click="enterSignup">注册账号</text>
        </view>
    </view>
</template>

<script>
	const db = uniCloud.database()
	// const bcrypt = require('bcryptjs')
	export default {
		data(){
			return {
				email:"",
				password:""
			}
		},
		
		methods: {
            // 点击登录按钮	
    //         login() {				
    //             login_obj.login({
				// 	email: this.email,
				// 	password: this.password
				// }).then(res=>{
				// 	console.log(res)
				// }).catch(err=>{
				// 	console.log(err)
				// })
				// },
				
			async login(){
				// 查找邮箱并存储哈希密码
				let emailRes = await db.collection("SmartLearn_user")
					.where({
						"email":this.email
					})
					.get()
				
				if (emailRes.result.data[0]){
					console.log("邮箱匹配成功")
					let pwd_stored = emailRes.result.data[0].password
					// 验证密码是否正确
					let valPwdRes = await uniCloud.callFunction({
						name:"val_pwd",
						data:{
							password: this.password,
							pwd_stored
						}
					})
					
					// console.log(valPwdRes)
					if (valPwdRes.result.code == 0){
						console.log("密码匹配成功")
						uni.showToast({
							title:"成功登录"
						})
						
						// 成功登录后页面跳转
						
						// 成功登录后将_id存储到localStorage
						let userId = emailRes.result.data[0]._id
						uni.setStorageSync('user_id', userId)
						console.log("用户登录信息成功存储")
						
						
					} else{
						console.log("密码匹配失败")
						uni.showToast({
							icon:"error",
							title:"密码不正确"
						})
					}
					
					
				} else{
					console.log("数据库中未匹配到该邮箱")
				}
				
			},	
        
            // 跳转到注册页面
            enterSignup() {
                uni.navigateTo({
                    url: 'sign_up'
                });
            }
        }
    };
</script>

<style scoped lang="css">
    .mt-5 {
        margin-top: 10.42rpx;
    }
    .page {
        padding: 191.67rpx 41.67rpx 137.5rpx;
        background-color: #f4f2fc;
        border-radius: 58.33rpx;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        height: 100%;
    }
    .image {
        width: 208.33rpx;
        height: 208.33rpx;
    }
    .text {
        margin-top: 50rpx;
        color: #000000;
        font-size: 66.67rpx;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 63.27rpx;
    }
    .text_2 {
        margin-top: 58.33rpx;
        color: #000000;
        font-size: 41.67rpx;
        font-family: PingFang SC;
        line-height: 41.54rpx;
    }
    .group {
        margin-top: 95.83rpx;
    }
    .font {
        font-size: 33.33rpx;
        font-family: PingFang SC;
        line-height: 30.73rpx;
        color: #000000;
    }
    .text_3 {
        margin-left: 25rpx;
        line-height: 30.79rpx;
    }
    .text-wrapper {
        align-self: stretch;
    }
    .input {
        padding: 29.17rpx 0;
        background-color: #ffffff;
        border-radius: 16.67rpx;
    }
    .font_2 {
        font-size: 33.33rpx;
        font-family: PingFang SC;
        line-height: 30.73rpx;
        color: #979797;
    }
    .text_4 {
        margin-left: 66.67rpx;
    }
    .text_5 {
        line-height: 30.79rpx;
    }
    .text_6 {
        margin-left: 20.83rpx;
    }
    .button {
        align-self: center;
        margin-top: 75rpx;
    }
    .text-wrapper_2 {
        padding: 37.5rpx 0;
        background-image: linear-gradient(180deg, #453099b3 0%, #7451ff 100%);
        border-radius: 104.17rpx;
        width: 264.58rpx;
    }
    .text_7 {
        color: #ffffff;
        font-size: 41.67rpx;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 38.63rpx;
    }
    .group_2 {
        margin-top: 291.67rpx;
        line-height: 30.96rpx;
    }
    .text_8 {
        line-height: 30.96rpx;
    }
    .text_9 {
        color: #626de9;
    }
</style>
