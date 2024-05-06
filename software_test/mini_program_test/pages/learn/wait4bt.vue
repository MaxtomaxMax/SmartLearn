<!-- 等待蓝牙链接页面 -->
<!-- wait for bluetooth -->
<!--
<template>
	<view class="learn_bg">
		
		<!-- <view class="text1_container">
			<text class="text1">请连接蓝牙</text>
		</view>
		
		<view class="connect_bt">
			<image class="bt_icon" src="../../static/ui_icon/bluetooth.png"></image>
		</view>
		
		<view class="text2_container">
			<text class="text2">点击连接蓝牙</text>
		</view>
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
-->
<template>
<view class="flex-col page">
  <view class="flex-col flex-1 group">
    <text class="self-center text">请链接蓝牙</text>
    <view class="flex-col justify-start items-center self-center image-wrapper">
      <image
        class="image_2"
        src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=a559292b52c6d5675a881601d876b37a.png"
      />
    </view>
    <text class="self-center text_2">点击链接蓝牙</text>
    <text class="self-center text_3">00:00:00</text>
    <view class="flex-row equal-division section">
      <view class="flex-col items-center section_2 equal-division-item">
        <image
          class="shrink-0 image_3"
          src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=3807e5ce846f1a122c99fa99f0f2ff32.png"
        />
        <text class="font text_4">温故</text>
      </view>
      <view class="flex-col items-center section_2 equal-division-item">
        <image
          class="shrink-0 image_4"
          src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=447c9226d59ea4dd46e7f54fb27260b4.png"
        />
        <text class="font text_5">知新</text>
      </view>
      <view class="flex-col items-center section_2 equal-division-item">
        <image
          class="shrink-0 image_5"
          src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=a28466b963e1bce1c140eaa66dfc8c13.png"
        />
        <text class="font text_6">三省</text>
      </view>
      <view class="flex-col items-center section_2 equal-division-item">
        <image
          class="shrink-0 image_3"
          src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=248a963a79e2bce3d28e2766eede344f.png"
        />
        <text class="font mt-3">吾身</text>
      </view>
    </view>
  </view>
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
.mt-3 {
  margin-top: 6.25rpx;
}
.page {
  background-color: #f4f2fc;
  border-radius: 58.33rpx;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group {
  padding-top: 220.83rpx;
  overflow-y: auto;
}
.text {
  color: #000000;
  font-size: 50rpx;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 47rpx;
  letter-spacing: 8.33rpx;
}
.image-wrapper {
  margin-top: 66.67rpx;
  padding: 125rpx 0;
  filter: drop-shadow(0rpx 8.33rpx 4.17rpx #00000040);
  background-color: #ffffff;
  box-shadow: 0rpx 8.33rpx 6.25rpx #0000002e;
  border-radius: 50%;
  width: 416.67rpx;
}
.image_2 {
  width: 185.42rpx;
  height: 166.67rpx;
}
.text_2 {
  margin-top: 58.33rpx;
  color: #979797;
  font-size: 33.33rpx;
  font-family: ABeeZee;
  line-height: 30.77rpx;
}
.text_3 {
  margin-top: 141.67rpx;
  color: #000000;
  font-size: 100rpx;
  font-family: ABeeZee;
  line-height: 72.4rpx;
  letter-spacing: 8.33rpx;
}
.equal-division {
  align-self: stretch;
  margin-top: 237.5rpx;
}
.section {
  padding: 35.42rpx 0;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
  backdrop-filter: blur(0rpx);
}
.section_2 {
  flex: 1 1 188rpx;
}
.equal-division-item {
  padding: 8.33rpx 0;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.image_3 {
  width: 66.67rpx;
  height: 66.67rpx;
}
.font {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 19.29rpx;
  color: #a6a9b2;
}
.text_4 {
  line-height: 19.21rpx;
}
.image_4 {
  filter: drop-shadow(0rpx 2.08rpx 3.13rpx #7451ff);
  width: 66.67rpx;
  height: 66.67rpx;
}
.text_5 {
  color: #7451ff;
  line-height: 19.54rpx;
}
.image_5 {
  border-radius: 8.33rpx;
  width: 66.67rpx;
  height: 66.67rpx;
}
.text_6 {
  line-height: 19.13rpx;
}
</style>