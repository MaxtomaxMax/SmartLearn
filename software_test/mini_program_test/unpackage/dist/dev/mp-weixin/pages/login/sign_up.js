"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    // 注册按钮点击事件
    signup() {
      common_vendor.index.navigateTo({
        url: "/pages/login/sign_up_success"
      });
    },
    enterLogin() {
      common_vendor.index.navigateTo({
        url: "log_in"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.signup && $options.signup(...args)),
    b: common_vendor.o((...args) => $options.enterLogin && $options.enterLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2c2afae1"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/login/sign_up.vue"]]);
wx.createPage(MiniProgramPage);
