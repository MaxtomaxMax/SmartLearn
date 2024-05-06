<!-- 蓝牙已连接 -->
<template>
<view class="flex-col page">
  <view class="flex-col flex-1 group">
    <text class="self-center text">设备已配对</text>
    <view class="flex-col items-start self-stretch section">
      <text class="font">READY</text>
      <text class="mt-8 font">？</text>
    </view>
    <text class="self-center text_2">点击开始计时</text>
    <text class="self-center text_3">00:00:00</text>
  </view>
  <view class="flex-row tab-bar">
    <view class="flex-col items-center section_2">
      <image
        class="shrink-0 image_2"
        src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=c27e47588fc51f198750cf896df6d092.png"
      />
      <text class="font_2 text_4">温故</text>
    </view>
    <view class="flex-col items-center section_2">
      <image
        class="shrink-0 image_2"
        src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=95939757903d5fea0ce0279fd67d3926.png"
      />
      <text class="mt-2 font_2 text_5">知新</text>
    </view>
    <view class="flex-col items-center section_2">
      <image
        class="shrink-0 image_2"
        src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=199555151d0ab2676d0571f82052a737.png"
      />
      <text class="font_2 text_6">三省</text>
    </view>
    <view class="flex-col items-center section_3">
      <image
        class="shrink-0 image_2"
        src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=086346215073334eefa1a267175b8d92.png"
      />
      <text class="mt-6 font_2">吾身</text>
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
.page {
  background-color: #f4f2fc;
  border-radius: 58.33rpx;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group {
  padding: 212.5rpx 120.83rpx 237.5rpx 141.67rpx;
  overflow-y: auto;
}
.text {
  color: #000000;
  font-size: 50rpx;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 47.21rpx;
  letter-spacing: 8.33rpx;
}
.section {
  margin: 66.67rpx 45.83rpx 0 25rpx;
  padding: 141.67rpx 54.17rpx 62.5rpx 70.83rpx;
  background-image: linear-gradient(180deg, #ffb238 0%, #ffeacc 100%);
  box-shadow: 0rpx 8.33rpx 6.25rpx #0000002e;
  border-radius: 50%;
}
.font {
  font-size: 83.33rpx;
  font-family: PingFang SC;
  line-height: 100rpx;
  font-weight: 600;
  color: #000000;
}
.text_2 {
  margin-top: 58.33rpx;
  color: #979797;
  font-size: 33.33rpx;
  font-family: ABeeZee;
  line-height: 30.79rpx;
}
.text_3 {
  margin-top: 141.67rpx;
  color: #000000;
  font-size: 100rpx;
  font-family: ABeeZee;
  line-height: 72.4rpx;
  letter-spacing: 8.33rpx;
}
.tab-bar {
  padding: 35.42rpx 0;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
  backdrop-filter: blur(0rpx);
}
.section_2 {
  flex: 1 1 188rpx;
  padding: 16.67rpx 0 8.33rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.image_2 {
  width: 54rpx;
  height: 54rpx;
}
.section_3 {
  padding: 8.33rpx 0;
  flex: 1 1 188rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.font_2 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 19.29rpx;
  color: #a6a9b2;
}
.text_6 {
  line-height: 19.13rpx;
}
.text_5 {
  color: #7451ff;
  line-height: 19.54rpx;
}
.text_4 {
  line-height: 19.21rpx;
}
</style>