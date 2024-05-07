<!-- 已经注册的用户进行登录 -->
<template>
    <view class="flex-col page">
        <image
            class="self-center image"
            src="https://ide.code.fun/api/image?token=6638d2bbd578370011c602f5&name=c7a2d4e570c6795d89ec48087ef546c9.png"
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
                <input class="flex-col justify-start items-start text-wrapper input mt-5" type="text" placeholder="  请输入邮箱" style="font-size: 36.67rpx;"/>
            </view>
            <view class="mt-20 flex-col">
                <text class="self-start font text_6">密码</text>
                <!-- <view class="flex-col justify-start items-start text-wrapper input mt-5">
                    <text class="font_2 text_4">请输入密码</text>
                </view> -->
				<input class="flex-col justify-start items-start text-wrapper input mt-5" type="password" placeholder="  请输入密码" style="font-size: 36.67rpx;"/>
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
export default {
		methods: {
            // 点击登录按钮
            login() {
                // 在这里添加登录逻辑
                // 例如验证用户输入的用户名和密码，然后进行登录操作
                // 最后跳转到其他页面
                uni.navigateTo({
                    url: 'pages/otherPage/otherPage'
                });
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
