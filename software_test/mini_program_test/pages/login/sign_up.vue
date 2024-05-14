<!-- 注册界面 -->
<template>
    <view class="flex-col page">
        <image
            class="self-center image"
			src="https://mp-9f6339ac-fb18-4d54-823e-1d2a4a18ddfd.cdn.bspapp.com/SmartLearn_icon/logo_black.png"
        />
        <text class="self-center text">注册</text>
        <text class="self-center text_2">学者，当觅学之法，方能事半功倍</text>
        <view class="flex-col self-stretch group">
            <!-- <view class="flex-col">
                <text class="self-start font text_3">昵称</text>
                <view class="flex-col justify-start items-start text-wrapper input mt-5">
                    <text class="font_2 text_4 text_5">请输入昵称</text>
                </view>
            </view>
            <view class="mt-20 flex-col">
                <text class="self-start font text_6">密码</text>
                <view class="flex-col justify-start items-start text-wrapper input mt-5">
                    <text class="font_2 text_4">请输入密码</text>
                </view>
            </view>
            <view class="mt-20 flex-col">
                <text class="self-start font text_7">确认密码</text>
                <view class="flex-col justify-start items-start text-wrapper input mt-5">
                    <text class="font_2 text_4 text_8">请再次输入密码</text>
                </view>
            </view> -->
			<view class="flex-col">
                <text class="self-start font text_3">邮箱</text>
                <input v-model="email" class="flex-col justify-start items-start text-wrapper input mt-5" type="text" placeholder="  请输入邮箱" style="font-size: 36.67rpx;"/>
            </view>
            <view class="mt-20 flex-col">
                <text class="self-start font text_6">密码</text>
                <input v-model="password" class="flex-col justify-start items-start text-wrapper input mt-5" type="password" placeholder="  请输入密码" style="font-size: 36.67rpx;"/>
            </view>
            <view class="mt-20 flex-col">
                <text class="self-start font text_7">确认密码</text>
                <input v-model="confirmPassword" class="flex-col justify-start items-start text-wrapper input mt-5" type="password" placeholder="  请再次输入密码" style="font-size: 36.67rpx;"/>
            </view>
        </view>
        <!-- <view class="flex-col justify-start items-center button text-wrapper_2"><text class="text_9">注册</text></view> -->
		<!-- 注册按钮 -->
        <button class="flex-col justify-start items-center button text-wrapper_2" @click="signup"><text class="text_9">注册</text></button>
        <view class="self-center group_2">
            <text class="font_2 text_10">已有账号？</text>
            <text class="font_2 text_11" @click="enterLogin">点击登录</text>
        </view>
    </view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		components: {},
		props: {},
		data() {
			return {
				email:"",
				password:"",
				confirmPassword:"",
				hashPassword:""
			};
		},

		methods: {	
			async signup() {
			    try {
			        // 检查两次输入密码是否一致
			        if (this.password !== this.confirmPassword) {
			            console.log("两次输入密码不一致");
			            return;
			        }
			
			        // 校验密码长度
			        if (this.password.length < 6 || this.password.length > 16) {
			            console.log("密码长度应在6-16位");
			            return;
			        }
			
			        // 校验邮箱是否唯一
			        const checkUniResult = await uniCloud.callFunction({
			            name: "check_uni",
			            data: {
			                key: "email",
			                value: this.email
			            }
			        });
			
			        if (checkUniResult.result.data.length !== 0) {
						console.log("该邮箱已经被注册")
			            uni.showToast({
			                icon: "error",
			                title: "该邮箱已经被注册"
			            });
			            return;
			        }
			
			        // 完成校验，开始存储
			        const encryptResult = await uniCloud.callFunction({
			            name: "encrypt",
			            data: {
			                password: this.password
			            }
			        });
			
			        console.log("加密完成");
			        this.hashPassword = encryptResult.result;
			
			        const dbResult = await db.collection("SmartLearn_user").add({
			            email: this.email,
			            password: this.hashPassword
			        });
			
			        console.log("注册成功");
			        uni.showToast({
			            title: "注册成功"
			        });
			
			        // 跳转页面
					setTimeout(() =>{
						uni.navigateTo({
							url:"/pages/login/sign_up_success"
						});
					}, 1500)
			        
			
			    } catch (err) {
			        console.log(err);
			        // 在需要的地方也可以添加适当的错误处理提示
			        uni.showToast({
			            icon: "error",
			            title: "注册失败，请稍后再试"
			        });
			    }
			},

			
			
			enterLogin(){
				uni.navigateTo({
					url:"log_in"
				});
			}
		},
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
    line-height: 62.27rpx;
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
.text_7 {
    margin-left: 20.83rpx;
}
.text_8 {
    line-height: 30.83rpx;
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
.text_9 {
    color: #ffffff;
    font-size: 41.67rpx;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 38.92rpx;
}
.group_2 {
    margin-top: 116.67rpx;
    line-height: 30.88rpx;
}
.text_10 {
    line-height: 30.88rpx;
}
.text_11 {
    color: #626de9;
    line-height: 30.56rpx;
}
</style>
