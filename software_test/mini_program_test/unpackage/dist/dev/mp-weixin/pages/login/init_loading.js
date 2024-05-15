"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {};
  },
  // 延时2s之后跳转页面	
  onShow() {
    setTimeout(() => {
      common_vendor.index.navigateTo({
        url: "welcome"
      });
    }, 2e3);
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a5035d99"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/login/init_loading.vue"]]);
wx.createPage(MiniProgramPage);
