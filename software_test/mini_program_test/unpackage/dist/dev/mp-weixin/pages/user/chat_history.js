"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      time_value: 0,
      time_range: [
        { value: 1, text: "今天" },
        { value: 2, text: "一周内" },
        { value: 3, text: "一周前" }
      ],
      group_value: 0,
      group_range: []
      // 需要获取云数据库的用户分组
    };
  },
  methods: {
    enterChat() {
      common_vendor.index.redirectTo({
        url: "/pages/user/chat"
      });
    },
    time_change(e) {
      console.log("e:", e);
    },
    group_change(e) {
      console.log("e:", e);
    },
    time_change(e) {
      console.log("e:", e);
    }
  }
};
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  _easycom_uni_data_select2();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
if (!Math) {
  _easycom_uni_data_select();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.enterChat && $options.enterChat(...args)),
    b: common_vendor.o($options.time_change),
    c: common_vendor.o(($event) => $data.time_value = $event),
    d: common_vendor.p({
      localdata: $data.time_range,
      modelValue: $data.time_value
    }),
    e: common_vendor.o($options.group_change),
    f: common_vendor.o(($event) => $data.group_value = $event),
    g: common_vendor.p({
      localdata: $data.group_range,
      modelValue: $data.group_value
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-68eaa597"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/user/chat_history.vue"]]);
wx.createPage(MiniProgramPage);
