"use strict";
const common_vendor = require("../../common/vendor.js");
const db = common_vendor.Ws.database();
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      containerWidth: "0px",
      containerHeight: "0px",
      userId: "",
      // 搜索框的文字内容
      searchMsg: "",
      inProgressRecords: [],
      completedRecords: [
        { src: "/static/ui_icon/newcover.jpg", text: "完成项目1" },
        { src: "/static/ui_icon/newcover.jpg", text: "完成项目2" },
        { src: "/static/ui_icon/newcover.jpg", text: "完成项目3" }
      ],
      currentImages: [],
      showingInProgress: true
    };
  },
  mounted() {
    this.currentImages = this.inProgressRecords;
  },
  async onLoad() {
    this.setContainerSize();
    this.inProgressRecords = [];
    this.userId = common_vendor.index.getStorageSync("user_id");
    if (!this.userId) {
      common_vendor.index.showToast({
        title: "尚未登录，无学习项目展示",
        icon: "error"
      });
      return;
    }
    common_vendor.index.showLoading({
      title: "正在加载学习项目~"
    });
    let projectRes = await db.collection("SmartLearn_project").where({
      userId: this.userId
    }).get();
    console.log(projectRes);
    common_vendor.index.hideLoading();
    for (let i = projectRes.result.data.length - 1; i >= 0; i--) {
      this.inProgressRecords.unshift({
        src: "/static/ui_icon/newcover.jpg",
        text: projectRes.result.data[i].project_name
      });
    }
  },
  onPullDownRefresh() {
    console.log("refresh");
    setTimeout(function() {
      common_vendor.index.navigateTo({
        url: "/pages/user/chat"
      });
    }, 1e3);
    common_vendor.index.stopPullDownRefresh();
  },
  computed: {
    filteredProjects() {
      if (!this.searchMsg) {
        this.currentImages = this.inProgressRecords;
        return this.currentImages;
      }
      const keywords = this.searchMsg.split("");
      const regex = new RegExp(keywords.join("|"), "i");
      console.log(this.currentImages.filter((project) => regex.test(project.text)));
      return this.currentImages.filter((project) => regex.test(project.text));
    }
  },
  methods: {
    enterReview(name, index) {
      common_vendor.index.navigateTo({
        url: `/pages/review/review?id=${index}&name=${name}`
      });
    },
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
    },
    filterProjects() {
      this.$forceUpdate();
    },
    showInProgress() {
      this.currentImages = this.inProgressRecords;
      this.showingInProgress = true;
    },
    showCompleted() {
      this.currentImages = this.completedRecords;
      this.showingInProgress = false;
    },
    async addNewImage() {
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
            let addProjectRes = db.collection("SmartLearn_project").add({
              userId: this.userId,
              project_name: res.content
            });
            console.log(addProjectRes);
          }
        }
      });
    },
    // rpx 转换成 px
    rpxTopx(px) {
      let deviceWidth = common_vendor.index.getSystemInfoSync().windowWidth;
      let rpx = 750 / deviceWidth * Number(px);
      return Math.floor(rpx);
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
    a: common_vendor.o($options.filterProjects),
    b: common_vendor.o(($event) => $data.searchMsg = $event),
    c: common_vendor.p({
      placeholder: "搜索学习项目~",
      ["prefix-icon"]: "search",
      modelValue: $data.searchMsg
    }),
    d: common_vendor.f($options.filteredProjects, (item, index, i0) => {
      return {
        a: item.src,
        b: common_vendor.t(item.text),
        c: index,
        d: common_vendor.o(($event) => $options.enterReview(item.text, index), index)
      };
    }),
    e: common_vendor.o((...args) => $options.addNewImage && $options.addNewImage(...args)),
    f: $data.containerWidth,
    g: $data.containerHeight
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-650fa730"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/review/learning.vue"]]);
wx.createPage(MiniProgramPage);
