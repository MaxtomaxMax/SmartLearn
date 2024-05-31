"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      records: [
        //默认测试数据
        { value: 54, duration: "01:54:43", efficiency: 73 },
        { value: 22, duration: "02:14:33", efficiency: 66 }
      ]
    };
  },
  mounted() {
    this.fetchRecords();
  },
  methods: {
    //待补充，使用uni.cloud将检测记录添加到records
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => _ctx.goBack && _ctx.goBack(...args)),
    b: common_vendor.f($data.records, (record, index, i0) => {
      return {
        a: common_vendor.t(index === 0 ? "new" : index),
        b: common_vendor.t(record.value),
        c: common_vendor.t(record.duration),
        d: common_vendor.t(record.efficiency),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-487bc2b2"], ["__file", "D:/Git/SmartLearn/software_test/mini_program_test_zy/pages/user/detectrecord.vue"]]);
wx.createPage(MiniProgramPage);
