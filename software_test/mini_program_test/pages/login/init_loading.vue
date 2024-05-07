<!-- 刚刚开启小程序的加载页面 -->
<!--  
<template>
	<view class="init_content">
		<image class="logo_white" src="../../static/ui_icon/logo_white.png"></image>
		<text class="logo_text">智学</text>
	</view>
</template>

<script>
</script>

<style>
	.init_content{
		/* 让页面全部铺满 */
		height: 100vh;	
		width: 100vw;
		background: #7452FF;
		display: flex;
		flex-direction: column;
		justify-content: center;	/*水平居中*/
		align-items: center;		/*垂直居中*/
	}
	.logo_white{
		height: 200rpx;
		width: 200rpx;
		justify-content: center;
		align-items: center;
	}
	.logo_text{
		color: #FFFFFF;
		font-size: 8vw;		/* 优先考虑相对大小*/
		/* font-family: kaiti;	 */
		font-family: lisu; 
	}
</style>
-->

<template>
	<view class="flex-col items-center page">
		<image
			class="image"
			src="https://ide.code.fun/api/image?token=6638d2bbd578370011c602f5&name=a9c16dcda05db1bf7e35dd4bcca0d46d.png"
		/>
		<text class="mt-16 text">智学</text>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
		return {};
		},
		// 延时2s之后跳转页面	
		onLoad() {
			setTimeout(()=>{
				uni.navigateTo({
					url:"welcome"
				});
			}, 2000);
		},
		methods: {},
	};
</script>

<style scoped lang="css">
	.page {
		padding: 675rpx 0 691.67rpx;
		background-color: #7451ff;
		border-radius: 58.33rpx;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
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