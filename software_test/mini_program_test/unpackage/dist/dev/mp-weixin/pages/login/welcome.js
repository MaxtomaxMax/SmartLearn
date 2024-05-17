"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    // 跳转的login界面
    enterLogin() {
      common_vendor.index.navigateTo({
        url: "log_in"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.enterLogin && $options.enterLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b70b1c15"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/login/welcome.vue"]]);
wx.createPage(MiniProgramPage);
