<template>
<view class="flex-col page">
  <view class="flex-col self-stretch">
    <text class="self-center text">欢迎</text>
    <text class="self-stretch text_2 mt-27">智学系统，高效学习好伙伴！</text>
  </view>
  <view class="flex-col justify-start items-center button text-wrapper mt-49"><text class="text_3">进入</text></view>
</view>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },

  methods: {},
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
  padding: 995.83rpx 125rpx 172.92rpx;
  background-color: #f4f2fc;
  border-radius: 58.33rpx;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
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
.text-wrapper {
  padding: 37.5rpx 0;
  border-radius: 104.17rpx;
  background-image: url('https://ide.code.fun/api/image?token=6638d2bbd578370011c602f5&name=dce008a8cbac753a176ce136f794f25f.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
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


<!--
<template>
	<!--
	<view class="white_bg">
		<view class="welcome_text_container">
			<text class="welcome_text1">欢迎</text>
			<text class="welcome_text2">智学系统，高效学习好伙伴！</text>
		</view>
	</view>
	<view class = "welcome_button_container">
		<text class = "welcome_enter">进入</text>
	</view>
	
	<view class="flex-col page">
	<view class="flex-col self-stretch">
	<text class="self-center text">欢迎</text>
	<text c1ass="se1f-stretch text2mt-27">智学系统，高效学习好伙伴！</text>
	</view>
	<view class="flex-col justify-start items-center button text-wrapper mt-49"><text class="text_3"></text></view>
	</view>
</template>

<script>
</script>

<style>
	/* .white_bg{
		height: 100vh;
		width: 100vw;	
		display: flex;
		flex-direction: column;
		justify-content: center;	
		align-items: center;		
	} */
	/* .welcome_text1{
		font-size: 10vw;
		font-weight: bold;
	} */
	.mt-27{
		margin-top:56.25rpx;
	}
	.mt-49{
		margin-top:102.08rpx;
	}
	.page{
		padding:995.83rpx 125rpx 172.92rpx;
		background-color:#f4f2fc;
		border-radius:58.33rpx;
		width:100%;
		overflow-y:auto;
		overflow-x:hidden;
		height:100%;
	}
	.text{
		co1or:#000000;
		font-size:100rpx;
		font-family:PingFang SC;
		font-weight:600;
		line-height:94.9rpx;
	}
	.text_2{
		co1or:#80000;
		font-size:50rpx;
		font-family:PingFang SC;
		line-height:60.42rpx;
		text-align:center;
	}
	.button{
		align-self:center;
	}
	.text-wrapper{
		padding:37.5rpx 0;
		border-radius:104.17rpx;
		background-image:url('https://ide.code.fun/api/image?token=6638d2bbd578370011c602f5&name=dce008a8cbac753a176ce136f794f25f.png');
		background-size:100%100%;
		background-repeat:no-repeat;
		width:264.58rpx;
	}
	.text3{
		color:#ffffff;
		font-size:41.67rpx;
		font-family:PingFang SC;
		font-weight:600;
		line-height:38.83rpx;
	}
</style>
-->