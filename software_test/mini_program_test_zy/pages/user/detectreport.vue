<template>
  <!--压力值分析图表还未通过代码实现-->
  <view class="flex-col page">
    <view class="flex-col flex-1 group">
      <view class="flex-col">
        <view class="flex-col section">
          <image
            class="image"
            src="https://ide.code.fun/api/image?token=66430f927a1eb60011e683de&name=acc6980dfe1a4affab3841e21d01761c.png"
          />
          <view class="flex-row justify-between items-center">
            <view class="flex-row justify-start items-center image-wrapper">
              <image
                class="image_2"
                src="https://ide.code.fun/api/image?token=66430f927a1eb60011e683de&name=2e5f9f83fccc486ba3b7781bd271c017.png"
              />
            </view>
            <view class="flex-row justify-start"
              ><text class="font text">监测报告</text></view
            >
            <view class="flex-row justify-start items-center image-wrapper">
              <image
                class="image_2"
                src="https://ide.code.fun/api/image?token=66430f927a1eb60011e683de&name=1d6ba99e5f1c44059a5c6dbe39c9ec22.png"
                @click="goToRecord"
              />
            </view>
          </view>
        </view>
        <view class="flex-row items-center group_2">
          <image
            class="image_3"
            src="https://ide.code.fun/api/image?token=66430f927a1eb60011e683de&name=695fa08d90d42f0f020266cf69ccfab3.png"
          />
          <view class="flex-col items-start flex-1 ml-11">
            <text class="font_2 text_2">{{ nickname }}</text>
            <text class="mt-6 text_3">{{ dateRange }}</text>
          </view>
        </view>
        <view class="flex-row justify-between items-end group_3">
          <view class="flex-col">
            <view class="flex-row">
              <image
                class="image_5"
                src="https://ide.code.fun/api/image?token=66430f927a1eb60011e683de&name=811f0a8e912ec3a13292b3e4f66bd608.png"
              />
              <text class="text_4 ml-9">正在走出舒适区</text>
            </view>
            <view class="mt-22">
              <text class="text_5">{{ ave14stress }}%</text>
              <text class="font_2 text_6">平均压力值</text>
            </view>
          </view>
          <!--<view class="flex-col items-center">
          <image
            class="image_4"
            src="https://ide.code.fun/api/image?token=66430f927a1eb60011e683de&name=fcc7fa49493b172f613622a92bc44018.png"
          />
          <text class="font_3 text_7 mt-5">走出舒适区</text>
        </view>-->
        </view>
      </view>
      <view class="flex-col group_4 mt-33">
        <view class="flex-col section_2">
          <text class="self-start text_8">过去14天压力值分析</text>
          <view class="mt-24 flex-col self-stretch">
            <view class="flex-row justify-between equal-division group_5">
              <view class="flex-row items-center">
                <view class="shrink-0 section_3"></view>
                <text class="ml-4 font_3 text_9">轻松</text>
              </view>
              <view class="flex-row items-center">
                <view class="shrink-0 section_4"></view>
                <text class="font_3 text_10 ml-5">中等</text>
              </view>
              <view class="flex-row items-center">
                <view class="shrink-0 section_5"></view>
                <text class="ml-4 font_3 text_11">轻压</text>
              </view>
              <view class="flex-row items-center">
                <view class="shrink-0 section_6"></view>
                <text class="font_3 text_12 ml-5">重压</text>
              </view>
            </view>
            <view class="flex-row items-center self-stretch group_6">
              <text class="font_4">100%</text>
              <view class="flex-1 divider ml-7"></view>
            </view>
            <view class="flex-row items-center self-stretch">
              <view class="flex-col items-center shrink-0">
                <text class="font_4">80%</text>
                <text class="font_4 mt-29">60%</text>
                <text class="font_4 mt-29">40%</text>
                <text class="font_4 mt-29">20%</text>
              </view>
              <view class="ml-4 flex-col flex-1 relative group_7">
                <view class="divider"></view>
                <view class="divider view"></view>
                <view class="divider view_2"></view>
                <view class="divider view_3"></view>
                <image
                  class="image_6 pos"
                  src="https://ide.code.fun/api/image?token=66430f927a1eb60011e683de&name=4dece998953fb82b274cd1bc4c7a2f4e.png"
                />
              </view>
            </view>
            <view class="flex-row items-center self-stretch group_8">
              <text class="font_4">0</text>
              <view class="flex-1 divider_2 ml-7"></view>
            </view>
            <view class="flex-row justify-between self-stretch group_9">
              <text class="font_5">01</text>
              <text class="font_5">02</text>
              <text class="font_5">03</text>
              <text class="font_5">04</text>
              <text class="font_5">05</text>
              <text class="font_5">06</text>
              <text class="font_5">07</text>
              <text class="font_5">08</text>
              <text class="font_5">09</text>
              <text class="font_5">10</text>
              <text class="font_5 text_13">11</text>
              <text class="font_5 text_14">12</text>
              <text class="font_5">13</text>
              <text class="font_5 text_15">14</text>
            </view>
          </view>
        </view>
        <view class="mt-8 flex-col justify-start items-start section_7">
          <view class="group_10">
            <text class="font">
              压力报告
              <br />
            </text>
            <text class="font_6"><br /></text>
            <text class="font_6">
              在过去的14天内，
              <br />
            </text>
            <text class="font_6">你完成了</text>
            <text class="font_7">{{ learntime }}</text>
            <text class="font_6">
              次监测学习，
              <br />
            </text>
            <text class="font_6">其中轻松学习</text>
            <text class="font_7">{{ relaxtime }}</text>
            <text class="font_6">
              次，
              <br />
            </text>
            <text class="font_6">重压学习</text>
            <text class="font_7">{{ heavystresstime }}</text>
            <text class="font_6">
              次，
              <br />
            </text>
            <text class="font_6">中等和轻压学习</text>
            <text class="font_7">{{ somestresstime }}</text>
            <text class="font_6">
              次
              <br />
              <br />
            </text>
            <!--<text class="font_8">压力分布合理，你正在</text>
          <text class="font text_16">稳步走出自己的舒适区</text>
          <text class="font_8">
            ！再接再厉吧！
            <br />
          </text>-->
          </view>
        </view>
      </view>
    </view>

    <!--<view class="flex-row justify-between tab-bar">
    <view class="flex-col items-center group_11">
      <image
        class="image_7"
        src="https://ide.code.fun/api/image?token=66430f927a1eb60011e683de&name=c27e47588fc51f198750cf896df6d092.png"
      />
      <text class="mt-2 font_9 text_17">温故</text>
    </view>
    <view class="flex-col items-center group_12">
      <image
        class="image_7"
        src="https://ide.code.fun/api/image?token=66430f927a1eb60011e683de&name=302b9c13da61d12b84b17285da4b7b0d.png"
      />
      <text class="mt-2 font_9 text_18">知新</text>
    </view>
    <view class="flex-col items-center group_13">
      <image
        class="image_7"
        src="https://ide.code.fun/api/image?token=66430f927a1eb60011e683de&name=199555151d0ab2676d0571f82052a737.png"
      />
      <text class="mt-2 font_9 text_19">三省</text>
    </view>
    <view class="flex-col items-center group_14">
      <image
        class="image_7"
        src="https://ide.code.fun/api/image?token=66430f927a1eb60011e683de&name=337055d22fa08fca3b409b06d011b8ab.png"
      />
      <text class="mt-2 font_3 text_20">吾身</text>
    </view>
  </view>-->
  </view>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      nickname: "",
      learntime: 27,
      relaxtime: 10,
      heavystresstime: 4,
      somestresstime: 24,
      ave14stress: 51,
      dateRange: "",
    };
  },

  onShow() {
    const globalData = getApp().globalData;
    this.nickname = globalData.nickname;
  },

  mounted() {
    this.generateDateRange();
  },

  methods: {
    generateDateRange() {
      const today = new Date();
      const fourteenDaysAgo = new Date(today);
      fourteenDaysAgo.setDate(today.getDate() - 14);

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}/${month}/${day}`;
      };

      const todayFormatted = formatDate(today);
      const fourteenDaysAgoFormatted = formatDate(fourteenDaysAgo);

      this.dateRange = `${fourteenDaysAgoFormatted} - ${todayFormatted}`;
    },
    goToRecord() {
      uni.navigateTo({
        url: "/pages/user/detectrecord",
      });
    },
  },
};
</script>

<style scoped lang="css">
.ml-11 {
  margin-left: 22.92rpx;
}
.ml-9 {
  margin-left: 18.75rpx;
}
.mt-5 {
  margin-top: 10.42rpx;
}
.mt-33 {
  margin-top: 68.75rpx;
}
.ml-5 {
  margin-left: 10.42rpx;
}
.mt-29 {
  margin-top: 60.42rpx;
}
.ml-7 {
  margin-left: 14.58rpx;
}
.page {
  background-image: linear-gradient(180deg, #ffeacc 0%, #ffb238 91.2%);
  border-radius: 58.33rpx;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
}
.group {
  overflow-y: auto;
}
.section {
  padding-bottom: 12.5rpx;
  background-color: #f4f2fc00;
}
.image {
  width: 100vw;
  height: 12.2222vw;
}
.image-wrapper {
  width: 120.83rpx;
}
.image_2 {
  width: 41.67rpx;
  height: 41.67rpx;
}
.font {
  font-size: 29.17rpx;
  font-family: PingFang SC;
  line-height: 50rpx;
  color: #000000;
}
.text {
  line-height: 27rpx;
}
.group_2 {
  padding: 0 47.92rpx;
}
.image_3 {
  border-radius: 50%;
  width: 66.67rpx;
  height: 66.67rpx;
}
.font_2 {
  font-size: 29.17rpx;
  font-family: PingFang SC;
  font-weight: 600;
  color: #000000;
}
.text_2 {
  line-height: 21.23rpx;
}
.text_3 {
  color: #979797;
  font-size: 22.92rpx;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 21.08rpx;
}
.group_3 {
  margin-top: 14.58rpx;
  padding: 0 62.5rpx;
}
.image_5 {
  width: 33.33rpx;
  height: 33.33rpx;
}
.text_4 {
  color: #000000;
  font-size: 33.33rpx;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 31.38rpx;
}
.text_5 {
  color: #000000;
  font-size: 83.33rpx;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 61.83rpx;
}
.text_6 {
  line-height: 27.35rpx;
}
.image_4 {
  filter: drop-shadow(0rpx 4.17rpx 3.13rpx #00000040);
  width: 133.33rpx;
  height: 133.33rpx;
}
.font_3 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 18.54rpx;
  color: #1d2129;
}
.text_7 {
  color: #979797;
  line-height: 19.17rpx;
}
.group_4 {
  margin-bottom: -145.83rpx;
  padding: 0 37.5rpx;
}
.section_2 {
  margin-right: 8.33rpx;
  padding: 58.33rpx 41.67rpx 50rpx;
  background-color: #ffffff;
  border-radius: 25rpx;
}
.text_8 {
  color: #1d2129;
  font-size: 29.17rpx;
  font-family: PingFang SC;
  line-height: 27.27rpx;
}
.equal-division {
  align-self: center;
}
.group_5 {
  width: 401.21rpx;
}
.section_3 {
  background-color: #0096fa;
  border-radius: 208.33rpx;
  width: 25rpx;
  height: 25rpx;
}
.text_9 {
  line-height: 19.25rpx;
}
.section_4 {
  background-color: #ffb238;
  border-radius: 208.33rpx;
  width: 25rpx;
  height: 25rpx;
}
.text_10 {
  line-height: 19.52rpx;
}
.section_5 {
  background-color: #ff9328;
  border-radius: 208.33rpx;
  width: 25rpx;
  height: 25rpx;
}
.text_11 {
  line-height: 19.19rpx;
}
.section_6 {
  background-color: #ff5151;
  border-radius: 208.33rpx;
  width: 25rpx;
  height: 25rpx;
}
.text_12 {
  line-height: 19.02rpx;
}
.group_6 {
  margin-top: 16.67rpx;
}
.font_4 {
  font-size: 16.67rpx;
  font-family: PingFang SC;
  line-height: 12.38rpx;
  color: #86909c;
}
.divider {
  background-color: #e5e6eb;
  height: 2.08rpx;
}
.group_7 {
  padding: 62.5rpx 0 54.17rpx 4.17rpx;
}
.view {
  margin-top: 70.83rpx;
}
.view_2 {
  margin-top: 70.83rpx;
}
.view_3 {
  margin-top: 70.83rpx;
}
.image_6 {
  width: 522.92rpx;
  height: 339.58rpx;
}
.pos {
  position: absolute;
  left: 0;
  right: 11.96rpx;
  bottom: 0;
}
.group_8 {
  margin-top: 12.5rpx;
}
.divider_2 {
  background-color: #c9cdd4;
  height: 2.08rpx;
}
.group_9 {
  padding: 8.33rpx 4.17rpx 0 37.5rpx;
}
.font_5 {
  font-size: 25rpx;
  font-family: PingFang SC;
  line-height: 18.54rpx;
  color: #86909c;
}
.text_13 {
  line-height: 17.85rpx;
}
.text_14 {
  line-height: 18.21rpx;
}
.text_15 {
  line-height: 17.85rpx;
}
.section_7 {
  margin-right: 10.42rpx;
  padding-top: 25rpx;
  background-color: #ffffff;
  border-radius: 25rpx 25rpx 0 0;
}
.group_10 {
  margin-left: 25rpx;
  width: 529.17rpx;
}
.font_6 {
  font-size: 29.17rpx;
  font-family: PingFang SC;
  line-height: 50rpx;
  color: #979797;
}
.font_7 {
  font-size: 41.67rpx;
  font-family: PingFang SC;
  line-height: 50rpx;
  color: #000000;
}
.font_8 {
  font-size: 25rpx;
  font-family: PingFang SC;
  line-height: 50rpx;
  color: #000000;
}
.text_16 {
  font-size: 31.25rpx;
}
.tab-bar {
  padding: 54.17rpx 62.5rpx 41.67rpx 66.67rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
  backdrop-filter: blur(0rpx);
}
.group_11 {
  height: 77.06rpx;
}
.image_7 {
  width: 54rpx;
  height: 54rpx;
}
.font_9 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 18.54rpx;
  color: #a6a9b2;
}
.text_17 {
  line-height: 19.21rpx;
}
.group_12 {
  height: 77.08rpx;
}
.text_18 {
  line-height: 19.44rpx;
}
.group_13 {
  height: 76.98rpx;
}
.text_19 {
  line-height: 19.13rpx;
}
.group_14 {
  height: 77.1rpx;
}
.text_20 {
  color: #7451ff;
  line-height: 19.42rpx;
}
</style>
