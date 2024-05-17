"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    enterMainPage() {
      common_vendor.index.navigateTo({
        url: "/pages/user/chat"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.enterMainPage && $options.enterMainPage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-09cb2449"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/login/sign_up_success.vue"]]);
wx.createPage(MiniProgramPage);
