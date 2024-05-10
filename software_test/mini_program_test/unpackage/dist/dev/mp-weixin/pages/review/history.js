"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      items: [null, null]
    };
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.items, (item, index, i0) => {
      return {
        a: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cc25ea0f"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/review/history.vue"]]);
wx.createPage(MiniProgramPage);
