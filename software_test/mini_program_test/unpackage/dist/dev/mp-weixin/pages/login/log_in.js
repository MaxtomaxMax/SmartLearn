"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  methods: {
    // 点击登录按钮
    login() {
      common_vendor.index.navigateTo({
        url: "pages/otherPage/otherPage"
      });
    },
    // 跳转到注册页面
    enterSignup() {
      common_vendor.index.navigateTo({
        url: "sign_up"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.login && $options.login(...args)),
    b: common_vendor.o((...args) => $options.enterSignup && $options.enterSignup(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d8144b15"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/login/log_in.vue"]]);
wx.createPage(MiniProgramPage);
