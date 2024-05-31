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
      time_value: 0,
      time_range: [
        { value: 1, text: "今天" },
        { value: 2, text: "一周内" },
        { value: 3, text: "一周前" }
      ],
      group_value: 0,
      group_range: [],
      // 需要获取云数据库的用户分组
      keyboardHeight: 0,
      bottomHeight: 0,
      userId: "",
      // 登录的用户总的数据列表
      msgList: [],
      msgToday: [],
      // 一周内的数据
      msgInWeek: [],
      // 一周以前的数据
      msgBydWeek: [],
      // 当前展示的数据
      showList: []
    };
  },
  computed: {
    windowHeight() {
      return this.rpxTopx(common_vendor.index.getSystemInfoSync().windowHeight);
    },
    // 键盘弹起来的高度+发送框高度
    inputHeight() {
      return this.bottomHeight + this.keyboardHeight;
    }
  },
  async onLoad() {
    this.setContainerSize();
    this.userId = common_vendor.index.getStorageSync("user_id");
    const userChatDataRes = await db.collection("chat_data").where({
      userId: this.userId
    }).get();
    this.msgList = userChatDataRes.result.data;
    const today = /* @__PURE__ */ new Date();
    console.log("当前时间：", today);
    for (let i = 0; i < this.msgList.length; i++) {
      let postDate = new Date(this.msgList[i].posttime);
      let dateDiff = this.dateDiffInDays(today, postDate);
      if (dateDiff > 7) {
        this.msgBydWeek.push(this.msgList[i]);
        continue;
      }
      if (dateDiff < 7 && dateDiff > 0) {
        this.msgInWeek.push(this.msgList[i]);
        continue;
      }
      if (dateDiff == 0) {
        this.msgToday.push(this.msgList[i]);
        continue;
      }
    }
  },
  methods: {
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
    },
    enterKnowledgeMap() {
      common_vendor.index.navigateTo({
        url: "/pages/user/knowledgeMap"
      });
    },
    exit() {
      common_vendor.index.switchTab({
        url: "/pages/review/learning"
      });
    },
    getDateString(posttime) {
      const date = new Date(posttime);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return `${year}-${month + 1}-${day}`;
    },
    dateDiffInDays(date1, date2) {
      const year1 = date1.getFullYear();
      const month1 = date1.getMonth();
      const day1 = date1.getDate();
      const year2 = date2.getFullYear();
      const month2 = date2.getMonth();
      const day2 = date2.getDate();
      const diffTime = Math.abs(Date.UTC(year2, month2, day2) - Date.UTC(year1, month1, day1));
      const diffDays = Math.floor(diffTime / (1e3 * 60 * 60 * 24));
      return diffDays;
    },
    enterChat() {
      common_vendor.index.redirectTo({
        url: "/pages/user/chat"
      });
    },
    time_change(time_value) {
      console.log("time_value:", time_value);
      if (time_value == 1) {
        this.showList = this.msgToday;
        return;
      }
      if (time_value == 2) {
        this.showList = this.msgInWeek;
        return;
      }
      if (time_value == 3) {
        this.showList = this.msgBydWeek;
        return;
      }
    },
    // 稍后再开发
    group_change(e) {
      console.log("e:", e);
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
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_ua_markdown2 = common_vendor.resolveComponent("ua-markdown");
  (_easycom_uni_data_select2 + _easycom_ua_markdown2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_ua_markdown = () => "../../components/ua-markdown/ua-markdown.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_ua_markdown)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.exit && $options.exit(...args)),
    b: common_vendor.o((...args) => $options.enterChat && $options.enterChat(...args)),
    c: common_vendor.o((...args) => $options.enterKnowledgeMap && $options.enterKnowledgeMap(...args)),
    d: common_vendor.o($options.time_change),
    e: common_vendor.o(($event) => $data.time_value = $event),
    f: common_vendor.p({
      localdata: $data.time_range,
      modelValue: $data.time_value
    }),
    g: common_vendor.o($options.group_change),
    h: common_vendor.o(($event) => $data.group_value = $event),
    i: common_vendor.p({
      localdata: $data.group_range,
      modelValue: $data.group_value
    }),
    j: common_vendor.f($data.showList, (item, index, i0) => {
      return {
        a: "68eaa597-2-" + i0,
        b: common_vendor.p({
          source: item.content
        }),
        c: common_vendor.t($options.getDateString(item.posttime)),
        d: index
      };
    }),
    k: `${$options.windowHeight - $options.inputHeight - 180}rpx`,
    l: $data.containerWidth,
    m: $data.containerHeight
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-68eaa597"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/user/chat_history.vue"]]);
wx.createPage(MiniProgramPage);
