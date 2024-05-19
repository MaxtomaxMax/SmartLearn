"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      containerWidth: "0px",
      containerHeight: "0px"
    };
  },
  onLoad() {
    this.setContainerSize();
  },
  methods: {
    // 跳转的login界面
    enterLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/log_in"
      });
    },
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.enterLogin && $options.enterLogin(...args)),
    b: $data.containerWidth,
    c: $data.containerHeight
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b70b1c15"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/login/welcome.vue"]]);
wx.createPage(MiniProgramPage);
