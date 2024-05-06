<!-- 刚刚开启小程序的加载页面 -->
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