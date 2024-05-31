"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      inProgressRecords: [
        { src: "/static/ui_icon/newcover.jpg", text: "大学物理" },
        { src: "/static/ui_icon/newcover.jpg", text: "数字电路" },
        { src: "/static/ui_icon/newcover.jpg", text: "微机原理" },
        { src: "/static/ui_icon/newcover.jpg", text: "高频电路" },
        { src: "/static/ui_icon/newcover.jpg", text: "毛概" }
      ],
      completedRecords: [
        { src: "/static/ui_icon/newcover.jpg", text: "完成项目1" },
        { src: "/static/ui_icon/newcover.jpg", text: "完成项目2" },
        { src: "/static/ui_icon/newcover.jpg", text: "完成项目3" },
        { src: "/static/ui_icon/newcover.jpg", text: "完成项目4" },
        { src: "/static/ui_icon/newcover.jpg", text: "完成项目5" }
      ],
      currentImages: [],
      showingInProgress: true
    };
  },
  mounted() {
    this.currentImages = this.inProgressRecords;
  },
  methods: {
    showInProgress() {
      this.currentImages = this.inProgressRecords;
      this.showingInProgress = true;
    },
    showCompleted() {
      this.currentImages = this.completedRecords;
      this.showingInProgress = false;
    },
    addNewImage() {
      common_vendor.index.showModal({
        title: "添加新项目",
        placeholderText: "请输入项目名称",
        editable: true,
        success: (res) => {
          if (res.confirm && res.content) {
            const newImage2 = {
              src: "/static/ui_icon/newcover.jpg",
              text: res.content
            };
            this.images.unshift(newImage2);
          }
        }
      });
      this.images.unshift(newImage);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.showingInProgress ? 1 : "",
    b: !$data.showingInProgress ? 1 : "",
    c: common_vendor.o((...args) => $options.showInProgress && $options.showInProgress(...args)),
    d: !$data.showingInProgress ? 1 : "",
    e: $data.showingInProgress ? 1 : "",
    f: common_vendor.o((...args) => $options.showCompleted && $options.showCompleted(...args)),
    g: common_vendor.f($data.currentImages, (image, index, i0) => {
      return {
        a: image.src,
        b: common_vendor.t(image.text),
        c: index
      };
    }),
    h: common_vendor.o((...args) => $options.addNewImage && $options.addNewImage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-650fa730"], ["__file", "D:/Git/SmartLearn/software_test/mini_program_test_zy/pages/review/learning.vue"]]);
wx.createPage(MiniProgramPage);
