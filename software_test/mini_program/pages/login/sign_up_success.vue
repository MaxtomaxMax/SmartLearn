<!-- 成功完成注册 -->
<template>
<view class="flex-col items-center page" :style="{ width: containerWidth, height: containerHeight}">
  <image
    class="image"
    src="../../static/ui_icon/logo_black.png"
  />
  <text class="text">注册成功</text>
  <text class="text_2">学者，当觅学之法，方能事半功倍</text>
  <view class="flex-col justify-start items-center button text-wrapper" @click="enterMainPage"><text class="text_3">开启智学之旅</text></view>
</view>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
		containerWidth: '0px',
		containerHeight: '0px',
	};
  },
  onLoad() {
  	this.setContainerSize();
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
	  },
	  enterMainPage(){
		  uni.switchTab({
		      url: "/pages/review/learning"
		  });
	  }
  },
};
</script>

<style scoped lang="css">
.page {
  padding-top: 240rpx;
  background-color: #f4f2fc;
  border-radius: 58.33rpx;
  overflow-y: auto;
  overflow-x: hidden;
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
  margin-top: 200rpx;
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