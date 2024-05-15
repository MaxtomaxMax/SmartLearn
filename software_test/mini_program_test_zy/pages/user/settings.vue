<template>
  <view class="flex-col page">
    <view class="flex-col flex-1 group_2">
      <view class="flex-col self-stretch group_3">
        <view class="flex-col">
          <view class="mt-18 flex-row justify-between items-center">
            <text class="font text_4">发送平静值测试提醒</text>
            <switch :value="isReminderOn" @change="toggleReminder" />
          </view>

          <view class="mt-18 flex-row justify-between items-center">
            <text class="font text_5">提醒时间</text>
            <picker
              mode="time"
              value="{{setTime}}"
              start="00:00"
              end="23:59"
              @change="bindTimeChange"
            >
              <!-- 显示选择的时间 -->
              <text class="font text_6">{{ setTime }}</text>
            </picker>
          </view>

          <view class="mt-18 flex-row justify-between items-center">
            <text class="font text_4">关注我需要经过我同意</text>
            <switch :value="isFollowOn" @change="toggleFollow" />
          </view>
          <view class="mt-18 flex-row justify-between items-center">
            <text class="font text_3">净学习时长排行榜</text>
            <switch :value="isRankingOn" @change="toggleRanking" />
          </view>
        </view>
        <view class="flex-col mt-21">
          <view class="flex-row justify-between">
            <text class="self-center font_2">-</text>
            <switch :value="isOthers1On" @change="toggleOthers1" />
          </view>
          <view class="flex-row justify-between mt-17">
            <text class="self-center font_2">-</text>
            <switch :value="isOthers2On" @change="toggleOthers2" />
          </view>
          <view class="flex-row justify-between mt-17">
            <text class="self-center font_2">-</text>
            <switch :value="isOthers3On" @change="toggleOthers3" />
          </view>
          <view class="flex-row justify-between mt-17">
            <text class="self-center font_2">-</text>
            <switch :value="isOthers4On" @change="toggleOthers4" />
          </view>
          <view class="flex-row justify-between mt-17">
            <text class="self-center font_2">-</text>
            <switch :value="isOthers5On" @change="toggleOthers5" />
          </view>
        </view>
      </view>
      <view class="flex-col self-stretch group_4">
        <view class="flex-row justify-between items-center">
          <text class="font">头像</text>
          <image
            class="image_5"
            src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=8eb4f4ac64c115b8b39e93cb93fcda6a.png"
          />
        </view>
        <view class="flex-col mt-19">
          <view
            class="flex-row justify-between items-center"
            @click="editNickname"
          >
            <text class="font text_7">昵称</text>
            <text class="text_8">{{ nickname }}</text>
          </view>
          <view
            class="mt-22 flex-row justify-between items-center"
            @click="editSignature"
          >
            <text class="font text_9">签名</text>
            <text class="font text_10">{{ signature }}</text>
          </view>
        </view>
      </view>
      <image
        class="self-center image_6"
        src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=0e1f22a357410e0ada71342b3715eb17.png"
      />
      <text class="self-center font text_11" @click="confirmLogout"
        >退出登录</text
      >
    </view>
    <!--  统一设置tabBar，单页面底部tabBar可去除  <view class="flex-row justify-between tab-bar">
            <view class="flex-col items-center group_5">
                <image
                    class="image_7"
                    src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=c27e47588fc51f198750cf896df6d092.png"
                />
                <text class="mt-2 font_3 text_12">温故</text>
            </view>
            <view class="flex-col items-center group_6">
                <image
                    class="image_7"
                    src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=302b9c13da61d12b84b17285da4b7b0d.png"
                />
                <text class="mt-2 font_3">知新</text>
            </view>
            <view class="flex-col items-center group_7">
                <image
                    class="image_7"
                    src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=199555151d0ab2676d0571f82052a737.png"
                />
                <text class="mt-2 font_3 text_13">三省</text>
            </view>
            <view class="flex-col items-center group_8">
                <image
                    class="image_7"
                    src="https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=337055d22fa08fca3b409b06d011b8ab.png"
                />
                <text class="mt-2 font_3 text_14">吾身</text>
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
      nickname: "Lee",
      signature: "Wit beyond measure is man’s greatest treasure",
      isReminderOn: false,
      setTime: "9：00",
    };
  },

  methods: {
    //修改定时发送提醒时间
    bindTimeChange(e) {
      this.setTime = e.detail.value; // 更新时间
    },
    //修改开关状态，
    toggleReminder(event) {
      // 更新开关状态基于事件传递的值
      this.isReminderOn = event.detail.value;
      console.log("Switch state changed to:", this.isReminderOn);
      uni.showModal({
        title: "发送测试提醒",
        content: `${this.isReminderOn ? "提醒已开启" : "提醒已关闭"}`,
        showCancel: false,
      });
    },
    //修改昵称
    editNickname() {
      uni.showModal({
        title: "编辑昵称",
        content: this.nickname,
        editable: true,
        success: (res) => {
          if (res.confirm && res.content) {
            this.nickname = res.content;
            // 可以在这里保存到全局状态或进行API调用更新服务器上的数据
            getApp().globalData.nickname = res.content;
          }
        },
      });
    },

    editSignature() {
      uni.showModal({
        title: "编辑签名",
        content: this.signature,
        editable: true,
        success: (res) => {
          if (res.confirm && res.content) {
            this.signature = res.content;
            getApp().globalData.signature = res.content;
          }
        },
      });
    },
    //
    confirmLogout() {
      uni.showModal({
        title: "确认",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            console.log("用户点击确定");
            // 执行退出操作
            // 例如：清除本地存储、token或执行API注销操作
            // uni.clearStorageSync();  // 清除本地存储数据
            // 跳转到登录页面或重新加载页面
            uni.reLaunch({
              url: "/pages/login/log_in", // 根据实际情况设置路径
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
  },
};
</script>

<style scoped lang="css">
.mt-18 {
  margin-top: 50rpx;
}
.mt-21 {
  margin-top: 43.75rpx;
}
.mt-17 {
  margin-top: 35.42rpx;
}
.mt-19 {
  margin-top: 39.58rpx;
}
.page {
  background-color: #f4f2fc;
  border-radius: 58.33rpx;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.font {
  font-size: 29.17rpx;
  font-family: PingFang SC;
  line-height: 27rpx;
  color: #000000;
}
.group_2 {
  padding: 0 62.5rpx 329.17rpx;
  overflow-y: auto;
}
.group_3 {
  padding: 39.58rpx 12.5rpx 29.17rpx;
  border-bottom: solid 4.52rpx #9797974d;
}
.text_2 {
  line-height: 27.25rpx;
}
.image_3 {
  margin-right: 12.5rpx;
}
.switch {
  border-radius: 47.92rpx;
  width: 62.5rpx;
  height: 37.21rpx;
}
.text_3 {
  line-height: 27.27rpx;
}
.text_4 {
  line-height: 27.06rpx;
}
.image_4 {
  border-radius: 47.92rpx;
  width: 60.42rpx;
  height: 35.42rpx;
}
.text_5 {
  line-height: 27.04rpx;
}
.text_6 {
  margin-right: 12.5rpx;
  line-height: 21.65rpx;
}
.font_2 {
  font-size: 29.17rpx;
  font-family: PingFang SC;
  line-height: 1.98rpx;
  color: #000000;
}
.group_4 {
  padding: 25rpx 12.5rpx 33.33rpx;
}
.image_5 {
  margin-right: 8.33rpx;
  border-radius: 50%;
  width: 50rpx;
  height: 50rpx;
}
.text_7 {
  line-height: 26.96rpx;
}
.text_8 {
  margin-right: 8.33rpx;
  color: #979797;
  font-size: 29.17rpx;
  font-family: PingFang SC;
  line-height: 21.23rpx;
}
.text_9 {
  line-height: 26.75rpx;
}
.text_10 {
  margin-right: 8.33rpx;
  color: #979797;
}
.image_6 {
  width: 625rpx;
  height: 4.17rpx;
}
.text_11 {
  margin-top: 41.67rpx;
  color: #ff0000;
  line-height: 26.83rpx;
  letter-spacing: 12.5rpx;
}
.tab-bar {
  padding: 54.17rpx 62.5rpx 41.67rpx 66.67rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
  backdrop-filter: blur(0rpx);
  z-index: 100;
}
.group_5 {
  height: 77.06rpx;
}
.image_7 {
  width: 54rpx;
  height: 54rpx;
}
.font_3 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 19.44rpx;
  color: #a6a9b2;
}
.text_12 {
  line-height: 19.21rpx;
}
.group_6 {
  height: 77.08rpx;
}
.group_7 {
  height: 76.98rpx;
}
.text_13 {
  line-height: 19.13rpx;
}
.group_8 {
  height: 77.1rpx;
}
.text_14 {
  color: #7451ff;
  line-height: 19.42rpx;
}
</style>
