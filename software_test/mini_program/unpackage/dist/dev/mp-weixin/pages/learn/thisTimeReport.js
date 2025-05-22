"use strict";
const common_vendor = require("../../common/vendor.js");
const db = common_vendor.Ws.database();
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      NickName: "",
      currentDate: "",
      continuedTime: 0,
      formatContinuedTime: null,
      formattodayTime: null,
      learnEffciency: 0,
      learnCount: 0,
      problemCount: 0,
      userId: "",
      avatarUrl: "",
      learningID: "",
      attentionLevel: 0,
      pressureValue: 0,
      totalLearningTime: 0,
      tiredTime: 0,
      NoattTime: 0,
      pureLearningTime: 0
    };
  },
  created() {
    const today = /* @__PURE__ */ new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    this.currentDate = `${yyyy}/${mm}/${dd}`;
  },
  computed: {
    formatContinuedTime() {
      const hours = String(Math.floor(this.continuedTime / 3600)).padStart(2, "0");
      const minutes = String(Math.floor(this.continuedTime % 3600 / 60)).padStart(2, "0");
      const seconds = String(this.continuedTime % 60).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    },
    formattodayTime() {
      const hours = String(Math.floor(this.todaylearnTime / 3600)).padStart(2, "0");
      const minutes = String(Math.floor(this.todaylearnTime % 3600 / 60)).padStart(2, "0");
      const seconds = String(this.todaylearnTime % 60).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    }
  },
  async onShow() {
    this.userId = common_vendor.index.getStorageSync("user_id");
    this.avatarUrl = common_vendor.index.getStorageSync("avatar_url");
    this.NickName = common_vendor.index.getStorageSync("username");
    this.learningID = common_vendor.index.getStorageSync("learningId");
    let getAttentionLevelRes = await db.collection("user_learning_evaluation").where({
      learningId: this.learningID
    }).get();
    console.log(getAttentionLevelRes);
    this.attentionLevel = getAttentionLevelRes.result.data[0].attentionLevel;
    this.pressureValue = getAttentionLevelRes.result.data[0].pressureValue;
    let getLearningTimeRes = await db.collection("user_learning_data").doc(this.learningID).get();
    console.log(getLearningTimeRes);
    this.totalLearningTime = getLearningTimeRes.result.data[0].elapsedTime;
    this.NoattTime = getLearningTimeRes.result.data[0].NoattTime;
    this.tiredTime = getLearningTimeRes.result.data[0].tiredTime;
    this.pureLearningTime = this.totalLearningTime - this.NoattTime - this.tiredTime;
  },
  methods: {
    sec2Formatted(timeInSec) {
      const hours = String(Math.floor(timeInSec / 3600)).padStart(2, "0");
      const minutes = String(Math.floor(timeInSec % 3600 / 60)).padStart(2, "0");
      const seconds = String(timeInSec % 60).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    },
    returnLearning() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.returnLearning && $options.returnLearning(...args)),
    b: common_vendor.t($data.currentDate),
    c: $data.avatarUrl,
    d: common_vendor.t($data.NickName),
    e: common_vendor.t($data.currentDate),
    f: common_vendor.t(($data.attentionLevel * 100).toFixed(2) + "%"),
    g: common_vendor.t(($data.pressureValue * 100).toFixed(2) + "%"),
    h: common_vendor.t($options.sec2Formatted($data.pureLearningTime))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fafd1d13"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/learn/thisTimeReport.vue"]]);
wx.createPage(MiniProgramPage);
