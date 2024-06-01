"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      containerWidth: "0px",
      containerHeight: "0px",
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
  onLoad() {
    this.setContainerSize();
  },
  methods: {
    setContainerSize() {
      try {
        const res = common_vendor.index.getSystemInfoSync();
        console.log(res);
        const screenWidth = res.screenWidth;
        const screenHeight = res.windowHeight;
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
    }),
    c: $data.containerWidth,
    d: $data.containerHeight
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2928ecc8"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/user/detect_record.vue"]]);
wx.createPage(MiniProgramPage);
