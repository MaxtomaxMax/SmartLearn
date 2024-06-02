"use strict";
const common_vendor = require("../../common/vendor.js");
const db = common_vendor.Ws.database();
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      containerWidth: "0px",
      containerHeight: "0px",
      learninghours: 5,
      learningminutes: 26,
      finishedcount: 19,
      detectcount: 526,
      reviewedcount: 333,
      unreviewcount: 424,
      userId: "",
      avatarUrl: "../../static/ui_icon/avatar.png",
      username: "未命名用户",
      signature: "",
      pureLearningTime: 0,
      totalLearningTimes: 0,
      avePressureValue: 0
    };
  },
  async onLoad() {
    this.setContainerSize();
    this.userId = common_vendor.index.getStorageSync("user_id");
    let getAllLearningTimeRes = await db.collection("user_learning_data").where({
      userId: this.userId
    }).get();
    console.log(getAllLearningTimeRes);
    let totalElapsedTime = 0;
    let totalNoattTime = 0;
    let totalTiredTime = 0;
    if (getAllLearningTimeRes.result.data.length != 0) {
      for (let i = 0; i < getAllLearningTimeRes.result.data.length; i++) {
        totalElapsedTime += getAllLearningTimeRes.result.data[i].elapsedTime;
        totalNoattTime += getAllLearningTimeRes.result.data[i].NoattTime;
        totalTiredTime += getAllLearningTimeRes.result.data[i].tiredTime;
      }
    }
    this.pureLearningTime = totalElapsedTime - totalNoattTime - totalTiredTime;
    console.log(this.pureLearningTime);
    let getEvalTimesRes = await db.collection("user_learning_evaluation").where({
      userId: this.userId
    }).get();
    console.log(getEvalTimesRes);
    this.totalLearningTimes = getEvalTimesRes.result.data.length;
    let totalPressureValue = 0;
    for (let i = 0; i < getEvalTimesRes.result.data.length; i++) {
      totalPressureValue += getEvalTimesRes.result.data[i].pressureValue;
    }
    this.avePressureValue = totalPressureValue / this.totalLearningTimes;
  },
  onShow() {
    let temp = common_vendor.index.getStorageSync("avatar_url");
    if (temp != "") {
      this.avatarUrl = temp;
    }
    console.log("头像地址:", this.avatarUrl);
    this.username = common_vendor.index.getStorageSync("username");
    this.signature = common_vendor.index.getStorageSync("signature");
  },
  methods: {
    formatSeconds(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds - hours * 3600) / 60);
      const remainingSeconds = seconds - hours * 3600 - minutes * 60;
      const formatNumber = (num) => num.toString().padStart(2, "0");
      return `${hours}小时${formatNumber(minutes)}分钟${formatNumber(remainingSeconds)}秒`;
    },
    goDetectRecord() {
      common_vendor.index.navigateTo({
        url: "/pages/user/detect_record"
      });
    },
    setContainerSize() {
      try {
        const res = common_vendor.index.getSystemInfoSync();
        console.log(res);
        const screenWidth = res.screenWidth;
        const screenHeight = res.screenHeight - res.screenTop;
        if (screenWidth && screenHeight) {
          this.containerWidth = `${screenWidth}px`;
          this.containerHeight = `${screenHeight}px`;
        } else {
          console.error("获取 screenWidth 或 screenHeight 失败");
        }
      } catch (err) {
        console.error("获取系统信息失败", err);
      }
    },
    enterSetting() {
      common_vendor.index.navigateTo({
        url: "/pages/user/settings"
        // 目标页面的路径
      });
    },
    goToReportPage() {
      common_vendor.index.navigateTo({
        url: "/pages/user/detectreport"
        // 目标页面的路径
      });
    },
    goTodetect() {
      common_vendor.index.navigateTo({
        url: "/pages/user/bslinedetect"
        // 目标页面的路径
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.enterSetting && $options.enterSetting(...args)),
    b: $data.avatarUrl,
    c: common_vendor.t($data.username),
    d: common_vendor.t($data.signature),
    e: common_vendor.t($options.formatSeconds($data.pureLearningTime)),
    f: common_vendor.o((...args) => $options.goTodetect && $options.goTodetect(...args)),
    g: common_vendor.o((...args) => $options.goDetectRecord && $options.goDetectRecord(...args)),
    h: common_vendor.t($data.totalLearningTimes),
    i: common_vendor.t(($data.avePressureValue * 100).toFixed(2)),
    j: $data.containerWidth,
    k: $data.containerHeight
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-234aa2de"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/user/user_main_page.vue"]]);
wx.createPage(MiniProgramPage);
