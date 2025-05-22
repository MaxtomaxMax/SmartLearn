<!-- 历史 -->
<template>
<view class="flex-col relative page">
  <view class="flex-col flex-1 group_2">
    <view class="flex-col justify-start relative header">
      <view class="flex-row items-center group">
        <view class="flex-col justify-start items-center image-wrapper">
          <image
            class="image_2"
            src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=2e5f9f83fccc486ba3b7781bd271c017.png"
          />
        </view>
        <view class="flex-col justify-start text-wrapper"><text class="font text">答疑</text></view>
        <view class="flex-col justify-start text-wrapper_2"><text class="font text_2">历史</text></view>
      </view>
    </view>
    <view class="flex-row equal-division">
      <view class="flex-row justify-center items-center group_3 group_11">
        <text class="font_2 text_1">时间</text>
        <image
          class="image_3 ml-5"
          src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=d5815718b520bfebf166fe36261e0b12.png"
        />
      </view>
      <view class="flex-row justify-center items-center group_3 group_1">
        <text class="font_2 text_16">分组</text>
        <image
          class="image_3 ml-3"
          src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=d5815718b520bfebf166fe36261e0b12.png"
        />
      </view>
      <view class="flex-row justify-center items-center group_3 group_12">
        <text class="font_2 text_17">进度</text>
        <image
          class="image_3 ml-3"
          src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=d5815718b520bfebf166fe36261e0b12.png"
        />
      </view>
    </view>
    <view class="flex-col group_4">
      <view class="flex-col">
        <text class="self-start font_2 text_3">2024/04/13</text>
        <view class="flex-col self-stretch list">
          <view class="flex-row justify-between items-center list-item" v-for="(item, index) in items" :key="index">
            <text class="font_2 text_4">“君子之泽”的具体含义是什么</text>
            <image
              class="image_4 image_5"
              src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=029e3a53f0db3f15650d186e61eff4cb.png"
            />
          </view>
        </view>
        <text class="self-start font_2 text_6">2024/04/12</text>
      </view>
      <view class="flex-row items-center group_5">
        <text class="flex-1 font_2 text_7">
          电信号采用等幅双极性 4ASK(3,2,0,1,1.2),峰峰值电压 6V,MZM 调制器 2V*为 12V拟产生单极性 4ASK 光信号，画出 MZM···
        </text>
        <image
          class="shrink-0 image_4 ml-19"
          src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=029e3a53f0db3f15650d186e61eff4cb.png"
        />
      </view>
      <view class="flex-col input section">
        <text class="self-start text_8">点击进行归类</text>
        <view class="self-stretch divider"></view>
        <text class="self-start font text_9">向我提问吧~</text>
        <image
          class="image_2 pos"
          src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=f688a6eca2ad2da68ab7a7429e5ed94e.png"
        />
      </view>
    </view>
    <view class="flex-row equal-division_2">
      <view class="flex-col items-center equal-division-item_2 group_6">
        <image
          class="shrink-0 image_7"
          src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=3807e5ce846f1a122c99fa99f0f2ff32.png"
        />
        <text class="font_3 text_10">温故</text>
      </view>
      <view class="flex-col items-center equal-division-item_2 equal-division-item_3">
        <image
          class="shrink-0 image_6"
          src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=447c9226d59ea4dd46e7f54fb27260b4.png"
        />
        <text class="font_3 text_11">知新</text>
      </view>
      <view class="flex-col items-center equal-division-item_2 section_4">
        <image
          class="shrink-0 image_8"
          src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=a28466b963e1bce1c140eaa66dfc8c13.png"
        />
        <text class="font_3 text_12">三省</text>
      </view>
      <view class="flex-col items-center equal-division-item_2 section_2">
        <image
          class="shrink-0 image_6"
          src="https://ide.code.fun/api/image?token=663911a4bba59d0011c27cd0&name=248a963a79e2bce3d28e2766eede344f.png"
        />
        <text class="font_3 mt-3">吾身</text>
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
    return {
      items: [null, null],
    };
  },

  methods: {},
};
</script>

<style scoped lang="css">
.ml-5 {
  margin-left: 10.42rpx;
}
.ml-3 {
  margin-left: 6.25rpx;
}
.ml-19 {
  margin-left: 39.58rpx;
}
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
.group_2 {
  overflow-y: auto;
}
.header {
  margin-top: -91.67rpx;
  padding: 91.67rpx 0 20.83rpx;
}
.group {
  padding: 0 27.67rpx;
}
.image-wrapper {
  width: 68.75rpx;
}
.image_2 {
  width: 41.67rpx;
  height: 41.67rpx;
}
.text-wrapper {
  margin-left: 140.6rpx;
}
.font {
  font-size: 33.33rpx;
  font-family: PingFang SC;
  line-height: 30.88rpx;
  color: #979797;
}
.text {
  line-height: 31.13rpx;
}
.text-wrapper_2 {
  margin-left: 157.9rpx;
}
.text_2 {
  color: #7451ff;
  line-height: 30.79rpx;
}
.equal-division {
  padding: 5.25rpx 8.29rpx 10.27rpx 8.29rpx;
  background-color: #f4f2fc;
  border-top: solid 2.08rpx #d7d7d7;
  border-bottom: solid 2.08rpx #d7d7d7;
}
.group_3 {
  flex: 1 1 244.48rpx;
}
.group_11 {
  padding: 10.17rpx 0 10.13rpx;
}
.font_2 {
  font-size: 29.17rpx;
  font-family: SF Pro Text;
  line-height: 25.81rpx;
  color: #000000;
}
.text_1 {
  line-height: 26.69rpx;
}
.image_3 {
  width: 22.92rpx;
  height: 10.42rpx;
}
.group_1 {
  padding: 10rpx 0;
}
.text_16 {
  line-height: 26.98rpx;
}
.group_12 {
  padding: 10.02rpx 0 10.1rpx;
}
.text_17 {
  line-height: 26.85rpx;
}
.group_4 {
  padding: 30.65rpx 41.67rpx 18.75rpx 41.67rpx;
}
.text_3 {
  margin-left: 3.19rpx;
}
.list {
  margin-top: 4.98rpx;
}
.list-item {
  padding: 30.63rpx 2.08rpx 28.19rpx;
  border-bottom: solid 2.08rpx #d7d7d7;
}
.text_4 {
  line-height: 27.04rpx;
}
.image_4 {
  margin-right: 22.92rpx;
  width: 10.42rpx;
  height: 22.92rpx;
}
.image_5 {
  margin-right: 20.83rpx;
}
.text_6 {
  margin-left: 3.52rpx;
  margin-top: 33.71rpx;
}
.group_5 {
  margin-top: 42.9rpx;
  padding-bottom: 35.02rpx;
  border-bottom: solid 2.08rpx #d7d7d7;
}
.text_7 {
  line-height: 35.42rpx;
}
.input {
  position: relative;
  margin-top: 642.63rpx;
}
.section {
  padding: 19.13rpx 52.02rpx 19.54rpx 54.17rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  box-shadow: 0rpx 8.33rpx 8.33rpx #00000040;
}
.text_8 {
  margin-left: 59.46rpx;
  color: #979797;
  font-size: 25rpx;
  font-family: PingFang SC;
  line-height: 23rpx;
}
.divider {
  margin-top: 14.13rpx;
  background-color: #d7d7d7;
  height: 2.08rpx;
}
.text_9 {
  margin-left: 61.94rpx;
  margin-top: 16.25rpx;
}
.pos {
  position: absolute;
  left: 62.5rpx;
  top: 8.33rpx;
}
.equal-division_2 {
  padding: 35.42rpx 0 35.42rpx;
  opacity: 0.95;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
  backdrop-filter: blur(0rpx);
}
.equal-division-item_2 {
  flex: 1 1 188rpx;
}
.group_6 {
  padding: 10.42rpx 0 10.29rpx;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.image_7 {
  filter: drop-shadow(0rpx 2.08rpx 3.13rpx #7451ff);
  width: 66.67rpx;
  height: 66.67rpx;
}
.font_3 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 19.29rpx;
  color: #a6a9b2;
}
.text_10 {
  color: #7451ff;
  line-height: 19.31rpx;
}
.equal-division-item_3 {
  padding: 8.33rpx 0 10.33rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.image_6 {
  width: 66.67rpx;
  height: 66.67rpx;
}
.text_11 {
  line-height: 19.44rpx;
}
.section_4 {
  padding: 10.42rpx 0 10.44rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.image_8 {
  border-radius: 8.33rpx;
  width: 66.67rpx;
  height: 66.67rpx;
}
.text_12 {
  line-height: 19.13rpx;
}
.section_2 {
  padding-bottom: 10.38rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
</style>