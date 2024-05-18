"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      // 搜索框的文字内容
      searchMsg: "",
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
  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(function() {
      common_vendor.index.navigateTo({
        url: "/pages/user/chat"
      });
    }, 1e3);
  },
  methods: {
    onPageScroll(e) {
      if (e.scrollTop > 0 && this.isPullingDown === false) {
        this.isPullingDown = true;
      }
      if (e.scrollTop > this.$refs.containerInfo.offsetHeight) {
        console.log("正在下拉");
        common_vendor.index.redirectTo({
          url: "/pages/target/target",
          // 目标页面路径
          success: function() {
            console.log("跳转成功");
          }
        });
      }
    },
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
            const newImage = {
              src: "/static/ui_icon/newcover.jpg",
              text: res.content
            };
            this.inProgressRecords.unshift(newImage);
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.searchMsg = $event),
    b: common_vendor.p({
      placeholder: "搜索学习项目~",
      ["prefix-icon"]: "search",
      modelValue: $data.searchMsg
    }),
    c: $data.showingInProgress ? 1 : "",
    d: !$data.showingInProgress ? 1 : "",
    e: common_vendor.o((...args) => $options.showInProgress && $options.showInProgress(...args)),
    f: !$data.showingInProgress ? 1 : "",
    g: $data.showingInProgress ? 1 : "",
    h: common_vendor.o((...args) => $options.showCompleted && $options.showCompleted(...args)),
    i: common_vendor.f($data.currentImages, (image, index, i0) => {
      return {
        a: image.src,
        b: common_vendor.t(image.text),
        c: index
      };
    }),
    j: common_vendor.o((...args) => $options.addNewImage && $options.addNewImage(...args)),
    k: common_vendor.o((...args) => $options.onPageScroll && $options.onPageScroll(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-650fa730"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/review/learning.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
