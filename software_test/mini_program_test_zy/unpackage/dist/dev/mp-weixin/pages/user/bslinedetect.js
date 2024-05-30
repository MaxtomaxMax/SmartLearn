"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
      reviewedcount: 333,
      unreviewcount: 424
    };
  },
  onShow() {
    const globalData = getApp().globalData;
    this.nickname = globalData.nickname;
    this.signature = globalData.signature;
  },
  methods: {
    ClicktoSetting() {
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
    a: common_vendor.t($data.nickname),
    b: common_vendor.t($data.signature),
    c: common_vendor.t($data.learninghours),
    d: common_vendor.t($data.learningminutes),
    e: common_vendor.o((...args) => $options.goTodetect && $options.goTodetect(...args)),
    f: common_vendor.t($data.studyingcount),
    g: common_vendor.t($data.finishedcount),
    h: common_vendor.t($data.reviewedcount),
    i: common_vendor.t($data.unreviewcount),
    j: common_vendor.t($data.detectcount),
    k: common_vendor.t($data.avestress)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b6f1b0e8"], ["__file", "D:/SmartLearn/software_test/mini_program_test_zy/pages/user/bslinedetect.vue"]]);
wx.createPage(MiniProgramPage);
