"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    autoResize(event) {
      const textarea = this.$refs.textarea;
      const pixelValue = textarea.scrollHeight;
      const rpxValue = pixelValue * (750 / common_vendor.wx$1.getSystemInfoSync().windowWidth);
      textarea.style.height = "auto";
      textarea.style.height = rpxValue + "rpx";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.autoResize && $options.autoResize(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e32e353c"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/user/chat.vue"]]);
wx.createPage(MiniProgramPage);
