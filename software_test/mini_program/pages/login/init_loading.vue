<!-- 刚刚开启小程序的加载页面 -->
<template>
	<view class="flex-col items-center justify-center page" :style="{ width: containerWidth, height: containerHeight}">
		<view class="flex-col items-center logo-container">
			<image
				class="image"
				src="/static/ui_icon/logo_white.png"
			/>
			<text class="mt-16 text">智学</text>
		</view>
		
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
		
		// 延时2s之后跳转页面	
		onShow() {
			setTimeout(()=>{
				uni.navigateTo({
					url:"welcome"
				});
			}, 2000);
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
			}
		},
	};
</script>

<style scoped lang="css">
	.page {
		background-color: #7451ff;
		border-radius: 58.33rpx;
		overflow-y: auto;
		overflow-x: hidden;

	}
	.image {
		width: 229.17rpx;
		height: 208.33rpx;
	}
	.text {
		color: #ffffff;
		font-size: 83.33rpx;
		font-family: STLiti;
		line-height: 57rpx;
	}
</style>