"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      NickName: "yyf",
      currentDate: "",
      todaylearnTime: 0,
      continuedTime: 0,
      formatContinuedTime: null,
      formattodayTime: null,
      learnEffciency: 0,
      learnCount: 0,
      problemCount: 0,
      focusLevel: 0
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
  methods: {
    returnLearning() {
      common_vendor.index.navigateTo({
        url: "/pages/learn/learntiming"
        // 学习监测页面
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.returnLearning && $options.returnLearning(...args)),
    b: common_vendor.t($data.currentDate),
    c: common_vendor.t($data.NickName),
    d: common_vendor.t($data.currentDate),
    e: common_vendor.t($data.focusLevel + "%"),
    f: common_vendor.t($options.formattodayTime),
    g: common_vendor.t($options.formatContinuedTime),
    h: common_vendor.t($data.learnEffciency + "%"),
    i: common_vendor.t($data.learnCount),
    j: common_vendor.t($data.problemCount)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fafd1d13"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/learn/thisTimeReport.vue"]]);
wx.createPage(MiniProgramPage);
