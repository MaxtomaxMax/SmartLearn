"use strict";
const common_vendor = require("../../common/vendor.js");
const db = common_vendor.Ws.database();
const _sfc_main = {
  inheritAttrs: false,
  components: {},
  props: {
    projectName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      containerWidth: "0px",
      containerHeight: "0px",
      userId: "",
      project: "",
      // 用户关于该项目的所有知识点信息	
      dataList: [],
      dataIndex: 0,
      genTime: "",
      masterLevel: -1
    };
  },
  created() {
    this.initializeData();
  },
  async onLoad(options) {
    this.setContainerSize();
    this.userId = common_vendor.index.getStorageSync("user_id");
    if (options.name) {
      this.project = options.name;
    }
    common_vendor.index.showToast({
      title: "正在加载复习自测问题列表",
      icon: "loading"
    });
    let getDataRes = await db.collection("knowledgeMap").where({
      userId: this.userId,
      project: this.project
    }).get();
    this.dataList = getDataRes.result.data.reverse();
    this.dataList = this.removeDuplicates(this.dataList, "keyword");
    common_vendor.index.hideToast();
    console.log(this.dataList);
    if (this.dataList.length) {
      this.masterLevel = this.dataList[this.dataIndex].masterLevel;
    } else {
      common_vendor.index.showToast({
        title: "未建立知识地图",
        icon: "error",
        duration: 2e3
      });
    }
  },
  methods: {
    removeDuplicates(array, key) {
      const seen = /* @__PURE__ */ new Map();
      return array.filter((item) => {
        if (seen.has(item[key])) {
          return false;
        } else {
          seen.set(item[key], true);
          return true;
        }
      });
    },
    exit() {
      common_vendor.index.navigateBack();
    },
    indexDec() {
      if (this.dataIndex > 0) {
        this.dataIndex -= 1;
        this.masterLevel = this.dataList[this.dataIndex].masterLevel;
      }
    },
    async masterLevelDec() {
      if (this.masterLevel > 0) {
        this.masterLevel -= 1;
        this.dataList[this.dataIndex].masterLevel -= 1;
      }
      const decMasterLevelRes = await db.collection("knowledgeMap").where({
        userId: this.userId,
        project: this.project,
        keyword: this.dataList[this.dataIndex].keyword
      }).update({
        masterLevel: this.masterLevel
      });
      console.log(decMasterLevelRes);
      return;
    },
    getDateString(posttime) {
      const date = new Date(posttime);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return `${year}-${month + 1}-${day}`;
    },
    async masterLevelInc() {
      if (this.masterLevel < 3) {
        this.masterLevel += 1;
        this.dataList[this.dataIndex].masterLevel += 1;
      }
      const incMasterLevelRes = await db.collection("knowledgeMap").where({
        userId: this.userId,
        project: this.project,
        keyword: this.dataList[this.dataIndex].keyword
      }).update({
        masterLevel: this.masterLevel
      });
      console.log(incMasterLevelRes);
      setTimeout(() => {
        this.indexInc();
      }, 500);
    },
    indexInc() {
      if (this.dataIndex < this.dataList.length - 1) {
        this.dataIndex += 1;
        this.masterLevel = this.dataList[this.dataIndex].masterLevel;
      }
    },
    initializeData() {
      this.project = this.projectName;
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
    }
  }
};
if (!Array) {
  const _easycom_ua_markdown2 = common_vendor.resolveComponent("ua-markdown");
  _easycom_ua_markdown2();
}
const _easycom_ua_markdown = () => "../../components/ua-markdown/ua-markdown.js";
if (!Math) {
  _easycom_ua_markdown();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.exit && $options.exit(...args)),
    b: common_vendor.t(`${$data.project}-自测复习`),
    c: $data.dataList.length
  }, $data.dataList.length ? {
    d: common_vendor.t(`生成时间：${$options.getDateString($data.dataList[$data.dataIndex].posttime)}`),
    e: common_vendor.t(`掌握程度：${$data.masterLevel}/3`),
    f: common_vendor.t(`自测复习知识点：${$data.dataList[$data.dataIndex].keyword}`),
    g: common_vendor.p({
      source: $data.dataList[$data.dataIndex].reviewQuestion
    })
  } : {}, {
    h: $data.containerWidth,
    i: $data.containerHeight,
    j: common_vendor.o((...args) => $options.indexDec && $options.indexDec(...args)),
    k: common_vendor.o((...args) => $options.masterLevelDec && $options.masterLevelDec(...args)),
    l: common_vendor.o((...args) => $options.masterLevelInc && $options.masterLevelInc(...args)),
    m: common_vendor.o((...args) => $options.indexInc && $options.indexInc(...args)),
    n: $data.containerWidth
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7018a65d"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/review/review.vue"]]);
wx.createPage(MiniProgramPage);
