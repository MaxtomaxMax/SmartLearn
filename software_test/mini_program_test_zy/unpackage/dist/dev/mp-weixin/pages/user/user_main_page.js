"use strict";
const common_vendor = require("../../common/vendor.js");
const db = common_vendor.Ws.database();
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
    unicloudTest() {
      db.collection("SmartLearn_user").doc("66431ee5ee97ef5896bc5939").get().then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
      return;
    },
    ClicktoSetting() {
      common_vendor.index.navigateTo({
        url: "/pages/user/settings"
        // 设置页面
      });
    },
    goToReportPage() {
      common_vendor.index.navigateTo({
        url: "/pages/user/detectrecord"
        // 监测数据页面
      });
    },
    goTodetect() {
      common_vendor.index.navigateTo({
        url: "/pages/user/bslinedetect"
        // baseline页面
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.ClicktoSetting && $options.ClicktoSetting(...args)),
    b: common_vendor.t($data.nickname),
    c: common_vendor.t($data.signature),
    d: common_vendor.t($data.learninghours),
    e: common_vendor.t($data.learningminutes),
    f: common_vendor.o((...args) => $options.goTodetect && $options.goTodetect(...args)),
    g: common_vendor.t($data.studyingcount),
    h: common_vendor.t($data.finishedcount),
    i: common_vendor.o((...args) => $options.unicloudTest && $options.unicloudTest(...args)),
    j: common_vendor.t($data.reviewedcount),
    k: common_vendor.t($data.unreviewcount),
    l: common_vendor.t($data.detectcount),
    m: common_vendor.t($data.avestress),
    n: common_vendor.o((...args) => $options.goToReportPage && $options.goToReportPage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-234aa2de"], ["__file", "D:/SmartLearn/software_test/mini_program_test_zy/pages/user/user_main_page.vue"]]);
wx.createPage(MiniProgramPage);
