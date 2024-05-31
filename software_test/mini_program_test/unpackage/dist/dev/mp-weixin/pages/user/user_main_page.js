"use strict";
const common_vendor = require("../../common/vendor.js");
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
      studyingcount: 17,
      detectcount: 526,
      avestress: 33,
      reviewedcount: 333,
      unreviewcount: 424,
      userId: "",
      avatarUrl: "../../static/ui_icon/avatar.png",
      username: "未命名用户",
      signature: ""
    };
  },
  onLoad() {
    this.setContainerSize();
    this.userId = common_vendor.index.getStorageSync("user_id");
  },
  onShow() {
    this.avatarUrl = common_vendor.index.getStorageSync("avatar_url");
    console.log("头像地址:", this.avatarUrl);
    this.username = common_vendor.index.getStorageSync("username");
    this.signature = common_vendor.index.getStorageSync("signature");
  },
  methods: {
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
    e: common_vendor.t($data.learninghours),
    f: common_vendor.t($data.learningminutes),
    g: common_vendor.o((...args) => $options.goTodetect && $options.goTodetect(...args)),
    h: common_vendor.t($data.reviewedcount),
    i: common_vendor.t($data.unreviewcount),
    j: common_vendor.t($data.detectcount),
    k: common_vendor.t($data.avestress),
    l: $data.containerWidth,
    m: $data.containerHeight
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-234aa2de"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/user/user_main_page.vue"]]);
wx.createPage(MiniProgramPage);
