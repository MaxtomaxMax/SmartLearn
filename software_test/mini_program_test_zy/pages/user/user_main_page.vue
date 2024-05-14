<template>
  <view class="flex-col page">
    <view class="flex-col flex-1 group_2">
      <view class="flex-col justify-start relative header">
        <view class="flex-row justify-between group">
          <image
            class="image_2"
            src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=24f8cb1f241816c388d930864dda0c7a.png"
          />
          <image
            class="image_3"
            src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=76bd8d16aed8583c32db970875acfaa3.png"
            @click="ClicktoSetting"
          />
        </view>
      </view>
      <view class="flex-col group_18">
        <view class="flex-row group_3">
          <image
            class="shrink-0 self-center image_4"
            src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=2182e647b8a6ea71092fe15fb8980ccd.png"
          />
          <view class="ml-14 flex-col items-start flex-1 self-start group_4">
            <text class="text">{{ nickname }}</text>
            <text class="font text_2 mt-9">{{ signature }}</text>
          </view>
        </view>
        <!-- 净学习时长 -->
        <view class="flex-row justify-between items-center section_2">
          <view class="flex-row items-center">
            <image
              class="shrink-0 image_5"
              src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=c4fb0376d2d6e382037314edaf19e346.png"
            />
            <text class="font_2 text_7 ml-11">净学习时长</text>
          </view>
          <view class="group_6">
            <text class="font_3 text_8">{{ learninghours }}</text>
            <text class="font_4 text_10">小时</text>
            <text class="font_3 text_9">{{ learningminutes }}</text>
            <text class="font text_11">分钟</text>
          </view>
        </view>
        <!-- 学习排行榜（待开发 -->
        <view class="flex-col section">
          <view class="flex-row justify-between items-center section_2">
            <view class="flex-row items-center">
              <image
                class="shrink-0 image_5"
                src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=7ef3ccd9929c972089b8a5d57be030b8.png"
              />
              <text class="font_2 text_3 ml-11">学习排行榜</text>
            </view>
            <view class="group_5">
              <text class="font text_5">第</text>
              <text class="font_3 text_4">2</text>
              <text class="font text_6">名</text>
            </view>
          </view>

          <!-- 学习勋章（待开发 -->
          <view class="flex-row justify-between items-center section_2">
            <view class="flex-row items-center">
              <image
                class="shrink-0 image_5"
                src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=77eebaf052db6d0fa4ff6bd543121640.png"
              />
              <text class="font_2 text_12 ml-11">勋章</text>
            </view>
            <view class="group_7">
              <text class="font_3 text_13">25</text>
              <text class="font text_14">枚勋章</text>
            </view>
          </view>
        </view>
      </view>
      <view class="grid">
        <view class="flex-col grid-item_1">
          <view class="flex-row items-center self-stretch">
            <image
              class="image_6"
              src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=e59a70c1e3080a67cd25840e2e3cf158.png"
            />
            <text class="ml-12 font_5 text_25">在学</text>
          </view>
          <view class="self-start group_8 mt-9">
            <text class="font_4">{{ studyingcount }}</text>
            <text class="font_6">
              本在学
              <br />
            </text>
            <text class="font_6">今年在学12本</text>
          </view>
        </view>
        <view class="flex-col grid-item_1">
          <view class="flex-row items-center self-stretch">
            <image
              class="image_6"
              src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=6aa68ad6f689258b883452447311a124.png"
            />
            <text class="ml-12 font_5 text_15">学完</text>
          </view>
          <view class="self-start group_8 mt-9">
            <text class="font_4">{{ finishedcount }}</text>
            <text class="font_6">
              本学完
              <br />
            </text>
            <text class="font_6">今年学完5本</text>
          </view>
        </view>
        <view class="flex-col grid-item">
          <view class="flex-row items-center self-stretch">
            <image
              class="image_6"
              src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=6a497b9441a91bddb96ee9a9c92e5858.png"
            />
            <text class="ml-12 font_5 text_26">答疑</text>
          </view>
          <view class="self-start group_1 mt-9">
            <text class="font_4">2829</text>
            <text class="font_6">
              个答疑
              <br />
            </text>
            <text class="font_6">留在了26本书上</text>
          </view>
        </view>
        <view class="flex-col grid-item_1">
          <view class="flex-row items-center self-stretch">
            <image
              class="image_6"
              src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=6fede10a8dac1767fdff2d1922b8c5b1.png"
            />
            <text class="ml-12 font_5 text_1">复习</text>
          </view>
          <view class="self-start group_8 mt-9">
            <text class="font_4">784</text>
            <text class="font_6">
              条已复习
              <br />
            </text>
            <text class="font_6">321条未复习</text>
          </view>
        </view>
      </view>
      <view class="flex-col section_3">
        <view
          class="flex-row justify-between items-center section_4"
          @click="goToReportPage"
        >
          <view class="flex-row items-center">
            <image
              class="shrink-0 image_5"
              src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=51a5d645ce89bc89c1c7e9f8cdc370c5.png"
            />
            <text class="font_2 text_16 ml-11">监测报告</text>
          </view>
          <view class="group_9">
            <text class="font_4">已监测</text>
            <text class="font_7">{{ detectcount }}</text>
            <text class="font_4">
              次
              <br />
            </text>
            <text class="font_4">平均压力值</text>
            <text class="font_7">{{ avestress }}%</text>
          </view>
        </view>
        <!--  关注功能暂不开发  <view class="flex-row justify-between items-center section_5">
        <view class="flex-row items-center">
          <image
            class="shrink-0 image_5"
            src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=2f6421c12ee1e6e94dd9322051aaeb3e.png"
          />
          <text class="font_2 text_17 ml-11">关注</text>
        </view>
        <view class="group_10">
          <text class="font_7">5</text>
          <text class="font_4">
            人关注我
            <br />
          </text>
          <text class="font_4">已关注2人</text>
        </view>
      </view>-->
      </view>
    </view>
    <!--<view class="flex-row justify-between tab-bar">
    <view class="flex-col items-center group_11">
      <image
        class="image_7"
        src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=c27e47588fc51f198750cf896df6d092.png"
      />
      <text class="mt-2 font_8 text_18">温故</text>
    </view>
    <view class="flex-col items-center group_12">
      <image
        class="image_7"
        src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=302b9c13da61d12b84b17285da4b7b0d.png"
      />
      <text class="mt-2 font_8 text_19">知新</text>
    </view>
    <view class="flex-col items-center group_13">
      <image
        class="image_7"
        src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=199555151d0ab2676d0571f82052a737.png"
      />
      <text class="mt-2 font_8 text_20">三省</text>
    </view>
    <view class="flex-col items-center group_14">
      <image
        class="image_7"
        src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=337055d22fa08fca3b409b06d011b8ab.png"
      />
      <text class="mt-2 font text_21">吾身</text>
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
      signature: "",
      learninghours: 5,
      learningminutes: 26,
      finishedcount: 19,
      studyingcount: 17,
      detectcount: 526,
      avestress: 33,
    };
  },
  onShow() {
    const globalData = getApp().globalData;
    this.nickname = globalData.nickname;
    this.signature = globalData.signature;
  },

  methods: {
    ClicktoSetting() {
      uni.navigateTo({
        url: "/pages/user/settings", // 目标页面的路径
      });
    },
    goToReportPage() {
      uni.navigateTo({
        url: "/pages/user/detectreport", // 目标页面的路径
      });
    },
  },
};
</script>

<style scoped lang="css">
.ml-11 {
  margin-left: 22.92rpx;
}
.mt-9 {
  margin-top: 18.75rpx;
}
.page {
  background-color: #f4f2fc;
  border-radius: 58.33rpx;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 100vh;
  position: fixed; /* 固定定位，确保填满屏幕 */

  left: 0; /* 左侧对齐 */ /* 固定定位，确保填满屏幕 */
}
.group_2 {
  padding-bottom: 77.08rpx;
  overflow-y: auto;
}
.header {
  margin-top: -91.67rpx;
  padding: 91.67rpx 0 22.92rpx;
}
.group {
  padding-left: 41.67rpx;
  padding-right: 41.67rpx;
}
.image_2 {
  width: 41.67rpx;
  height: 41.67rpx;
}
.image_3 {
  width: 50rpx;
  height: 41.67rpx;
}
.group_18 {
  margin: 10.42rpx 41.67rpx 0 41.67rpx;
}
.group_3 {
  padding-bottom: 25rpx;
}
.image_4 {
  border-radius: 50%;
  width: 100rpx;
  height: 100rpx;
}
.group_4 {
  margin-right: 40rpx;
  margin-top: 25rpx;
}
.text {
  margin-left: 5.21rpx;
  color: #000000;
  font-size: 29.17rpx;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 21.23rpx;
}
.section {
  padding: 16.67rpx 0 16.67rpx;
  background-color: #ffffff;
  border-radius: 25rpx;
}
.section_2 {
  padding: 37.5rpx 41.67rpx 37.5rpx;
  background-color: #ffffff;
  border-radius: 25rpx;
}
.image_5 {
  border-radius: 50%;
  width: 50rpx;
  height: 50rpx;
}
.font_2 {
  font-size: 25rpx;
  font-family: PingFang SC;
  line-height: 25rpx;
  color: #000000;
}
.text_3 {
  line-height: 23.38rpx;
}
.group_5 {
  margin-right: 27.17rpx;
  line-height: 24.27rpx;
  height: 26.38rpx;
}
.font_3 {
  font-size: 33.33rpx;
  font-family: PingFang SC;
  line-height: 25rpx;
  color: #979797;
}
.text_4 {
  line-height: 24.27rpx;
}
.text_7 {
  line-height: 23.08rpx;
}
.group_6 {
  margin-right: 24.71rpx;
  line-height: 24.73rpx;
  height: 26.4rpx;
}
.text_8 {
  line-height: 24.73rpx;
}
.font_4 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 25rpx;
  color: #979797;
}
.text_10 {
  line-height: 18.73rpx;
}
.text_9 {
  line-height: 23.79rpx;
}
.text_12 {
  line-height: 23.25rpx;
}
.group_7 {
  margin-right: 24.06rpx;
  line-height: 24.73rpx;
  height: 26.46rpx;
}
.text_13 {
  line-height: 24.73rpx;
}
.grid {
  margin: 41.67rpx 41.67rpx 0 41.67rpx;
  height: 366.67rpx;
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-columns: repeat(2, minmax(0, 1fr));
  row-gap: 35.33rpx;
  column-gap: 35.33rpx;
}
.grid-item_1 {
  padding: 25rpx 25.67rpx 28.38rpx 25.67rpx;
  background-color: #ffffff;
  border-radius: 25rpx;
}
.image_6 {
  border-radius: 50%;
  width: 48rpx;
  height: 48rpx;
}
.font_5 {
  font-size: 25rpx;
  font-family: PingFang SC;
  letter-spacing: 2.5rpx;
  line-height: 25rpx;
  color: #000000;
}
.text_25 {
  line-height: 23.25rpx;
}
.group_8 {
  line-height: 20.83rpx;
}
.font_6 {
  font-size: 16.67rpx;
  font-family: PingFang SC;
  line-height: 20.83rpx;
  color: #979797;
}
.text_15 {
  line-height: 23.29rpx;
}
.grid-item {
  padding: 25rpx 25.67rpx 28.31rpx 25.67rpx;
  background-color: #ffffff;
  border-radius: 25rpx;
}
.text_26 {
  line-height: 23.35rpx;
}
.group_1 {
  line-height: 20.83rpx;
}
.text_1 {
  line-height: 23.17rpx;
}
.section_3 {
  margin: 41.67rpx 41.67rpx 0 41.67rpx;
  padding-top: 16.67rpx;
  background-color: #ffffff;
  border-radius: 25rpx;
}
.section_4 {
  padding: 24.69rpx 41.67rpx 14.9rpx;
  background-color: #ffffff;
  border-radius: 25rpx;
}
.text_16 {
  line-height: 23.15rpx;
}
.group_9 {
  margin-right: 7.52rpx;
  text-align: center;
  width: 173.63rpx;
  height: 85.42rpx;
}
.font_7 {
  font-size: 33.33rpx;
  font-family: PingFang SC;
  line-height: 39.58rpx;
  color: #979797;
}
.section_5 {
  padding: 25.17rpx 41.67rpx 21.29rpx;
  background-color: #ffffff;
  border-radius: 25rpx;
}
.text_17 {
  line-height: 23.02rpx;
}
.group_10 {
  margin-right: 22.6rpx;
  line-height: 25rpx;
  text-align: center;
  height: 78.54rpx;
}

.tab-bar {
  padding: 52.17rpx 60.5rpx 43.65rpx 66.75rpx;
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
.font {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 20.83rpx;
  color: #979797;
}
.text_14 {
  line-height: 19.4rpx;
}
.text_11 {
  line-height: 19.1rpx;
}
.text_6 {
  line-height: 19.08rpx;
}
.text_5 {
  line-height: 19.27rpx;
}
.text_2 {
  font-weight: 600;
  line-height: 21.85rpx;
}
.font_8 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 20.83rpx;
  color: #a6a9b2;
}
.text_18 {
  line-height: 19.21rpx;
}
.group_12 {
  height: 77.08rpx;
}
.text_19 {
  line-height: 19.44rpx;
}
.group_13 {
  height: 76.98rpx;
}
.text_20 {
  line-height: 19.13rpx;
}
.group_14 {
  height: 77.1rpx;
}
.text_21 {
  color: #7451ff;
  line-height: 19.42rpx;
}
</style>
