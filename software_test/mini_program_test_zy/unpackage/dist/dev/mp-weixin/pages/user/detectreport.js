"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
      dateRange: ""
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
      const today = /* @__PURE__ */ new Date();
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
      common_vendor.index.navigateTo({
        url: "/pages/user/detectrecord"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goToRecord && $options.goToRecord(...args)),
    b: common_vendor.t($data.nickname),
    c: common_vendor.t($data.dateRange),
    d: common_vendor.t($data.ave14stress),
    e: common_vendor.t($data.learntime),
    f: common_vendor.t($data.relaxtime),
    g: common_vendor.t($data.heavystresstime),
    h: common_vendor.t($data.somestresstime)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dc822054"], ["__file", "D:/SmartLearn/software_test/mini_program_test_zy/pages/user/detectreport.vue"]]);
wx.createPage(MiniProgramPage);
