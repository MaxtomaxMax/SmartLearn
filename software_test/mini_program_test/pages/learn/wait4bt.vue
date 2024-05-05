<!-- 等待蓝牙链接页面 -->
<!-- wait for bluetooth -->
<template>
	<view class="learn_bg">
		<!-- 学习页面的背景容器 -->
		<!-- <view class="text1_container">
			<text class="text1">请连接蓝牙</text>
		</view> -->
		
		<view class="connect_bt">
			<image class="bt_icon" src="../../static/ui_icon/bluetooth.png"></image>
		</view>
		
		<!-- <view class="text2_container">
			<text class="text2">点击连接蓝牙</text>
		</view> -->
	</view>
</template>

<script>
</script>

<style>
	.bt_icon{
		height: 300rpx;
		width: 300rpx;
	}
	.connect_bt{
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;	/*水平居中*/
		align-items: center;		/*垂直居中*/
	}
	/* .text1_container{
		display: flex;
		flex-direction: column;
		height: 25%;
	} */
</style>