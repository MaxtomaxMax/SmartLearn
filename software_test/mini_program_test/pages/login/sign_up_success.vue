<!-- 成功完成注册 -->
<template>
<view class="flex-col items-center page">
  <image
    class="image"
    src="https://mp-9f6339ac-fb18-4d54-823e-1d2a4a18ddfd.cdn.bspapp.com/SmartLearn_icon/logo_black.png"
  />
  <text class="text">注册成功</text>
  <text class="text_2">学者，当觅学之法，方能事半功倍</text>
  <view class="flex-col justify-start items-center button text-wrapper"><text class="text_3">开启智学之旅</text></view>
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
  padding: 191.67rpx 0 664.58rpx;
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
  line-height: 62.88rpx;
}
.text_2 {
  margin-top: 58.33rpx;
  color: #000000;
  font-size: 41.67rpx;
  font-family: PingFang SC;
  line-height: 41.54rpx;
}
.button {
  margin-top: 279.17rpx;
}
.text-wrapper {
  padding: 37.5rpx 0;
  background-image: linear-gradient(180deg, #453099b3 0%, #7451ff 100%);
  border-radius: 104.17rpx;
  width: 320.83rpx;
}
.text_3 {
  color: #ffffff;
  font-size: 41.67rpx;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 39.25rpx;
}
</style>