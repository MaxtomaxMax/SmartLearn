<template>
    <view class="flex-col items-center justify-center page" :style="{ width: containerWidth, height: containerHeight}">
        <view class="flex-col self-stretch">
            <text class="self-center text">欢迎</text>
            <text class="self-stretch text_2 mt-27">智学系统，高效学习好伙伴！</text>
        </view>
		<button class="flex-col justify-start items-center button mt-49 text-wrapper_2" @click="enterLogin">
		    <text class="text_3">进入</text>
		</button>	
    </view>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
        	containerWidth: '0px',
        	containerHeight: '0px'
        };
    },
	onLoad() {
		this.setContainerSize();
	},
    methods: {
		// 跳转的login界面
		enterLogin(){
			uni.navigateTo({
				url:"/pages/login/log_in"
			})
			// uni.switchTab({
			// 	url:"/pages/review/learning"
			// })
		},
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
		}
	},
};
</script>

<style scoped lang="css">
    .mt-27 {
        margin-top: 56.25rpx;
    }
    .mt-49 {
        margin-top: 102.08rpx;
    }
    .page {
        background-color: #f4f2fc;
        border-radius: 58.33rpx;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .text {
        color: #000000;
        font-size: 100rpx;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 94.9rpx;
    }
    .text_2 {
        color: #000000;
        font-size: 50rpx;
        font-family: PingFang SC;
        line-height: 60.42rpx;
        text-align: center;
    }
    .button {
        align-self: center;
    }

	.text-wrapper_2 {
	    padding: 37.5rpx 0;
	    background-image: linear-gradient(180deg, #453099b3 0%, #7451ff 100%);
	    border-radius: 104.17rpx;
	    width: 264.58rpx;
	}
	
    .text_3 {
        color: #ffffff;
        font-size: 41.67rpx;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 38.83rpx;
    }
</style>


