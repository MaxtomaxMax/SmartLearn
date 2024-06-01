"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      currentDate1: ""
    };
  },
  created() {
    const today = /* @__PURE__ */ new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    this.currentDate1 = `${yyyy}/${mm}/${dd}`;
  },
  methods: {
    goTobttest() {
      common_vendor.index.navigateTo({
        url: "/pages/user/bswait4bt"
        // 目标页面的路径
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.currentDate1),
    b: common_vendor.o((...args) => $options.goTobttest && $options.goTobttest(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b6f1b0e8"], ["__file", "D:/Git/SmartLearn/software_test/mini_program_test_zy/pages/user/bslinedetect.vue"]]);
wx.createPage(MiniProgramPage);
