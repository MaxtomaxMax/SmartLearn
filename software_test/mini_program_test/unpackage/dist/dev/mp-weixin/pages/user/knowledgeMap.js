"use strict";
const common_vendor = require("../../common/vendor.js");
const db = common_vendor.Ws.database();
const _sfc_main = {
  data() {
    return {
      input_disable: false,
      // 默认情况下	
      inputMsg: "",
      // input框发送的信息
      keyboardHeight: 0,
      bottomHeight: 0,
      scrollTop: 0,
      // 滚动距离
      userId: "",
      msgList: [],
      kimi_res: "",
      history: [],
      scroll_anchor: "",
      // 选择框
      project_value: 0,
      project_range: [
        { value: 1, text: "信号与系统" },
        { value: 2, text: "电子系统综合设计" },
        { value: 3, text: "通信原理" }
      ],
      // 发给kimi的prompt
      prompt: ""
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
  mounted() {
    this.sendHeight();
    common_vendor.index.onKeyboardHeightChange((res) => {
      this.keyboardHeight = this.rpxTopx(res.height);
      if (this.keyboardHeight < 0)
        this.keyboardHeight = 0;
    });
  },
  updated() {
    this.scrollToBottom();
    this.sendHeight();
  },
  methods: {
    enterChat() {
      common_vendor.index.navigateTo({
        url: "/pages/user/chat"
      });
    },
    exit() {
      common_vendor.index.navigateTo({
        url: "/pages/login/welcome"
      });
    },
    async callPreKnowledge() {
      if (this.project_value == 0 || this.inputMsg == "") {
        common_vendor.index.showToast({
          title: "请选择学习项目与知识点关键词~",
          icon: "error"
        });
        return;
      }
      this.input_disable = true;
      let project = this.project_range[this.project_value - 1].text;
      let keyword = this.inputMsg;
      let res = await common_vendor.Ws.callFunction({
        name: "callKnowledgeMap",
        data: {
          project,
          keyword,
          flag: 0
          // 表示生成前置知识的flag
        }
      });
      if (res.result.success) {
        this.kimi_res = res.result.message;
        this.history = res.result.history;
        console.log(res);
        this.userId = common_vendor.index.getStorageSync("user_id");
        if (this.userId) {
          await db.collection("knowledgeMap").add({
            userId: this.userId,
            posttime: Date.now(),
            project,
            keyword,
            flag: 0,
            answer: this.kimi_res
          });
          console.log("数据存储成功");
        }
      } else {
        console.error(res.result.error);
      }
      this.msgList.push({
        botContent: this.kimi_res
      });
      this.input_disable = false;
      this.scrollToBottom();
    },
    async callAdvancedKnowledge() {
      if (this.project_value == 0 || this.inputMsg == "") {
        common_vendor.index.showToast({
          title: "请选择学习项目与知识点关键词~",
          icon: "error"
        });
        return;
      }
      this.input_disable = true;
      let res = await common_vendor.Ws.callFunction({
        name: "callKnowledgeMap",
        data: {
          project: this.project_range[this.project_value - 1].text,
          keyword: this.inputMsg,
          flag: 1
          // 表示生成进阶知识的flag
        }
      });
      if (res.result.success) {
        this.kimi_res = res.result.message;
        this.history = res.result.history;
        console.log(res);
        this.userId = common_vendor.index.getStorageSync("user_id");
        if (this.userId) {
          await db.collection("knowledgeMap").add({
            userId: this.userId,
            posttime: Date.now(),
            project: this.project_range[this.project_value - 1].text,
            keyword: this.inputMsg,
            flag: 1,
            answer: this.kimi_res
          });
          console.log("数据存储成功");
        }
      } else {
        console.error(res.result.error);
      }
      this.msgList.push({
        botContent: this.kimi_res
      });
      this.input_disable = false;
      this.scrollToBottom();
    },
    project_change() {
      return;
    },
    subProject_change() {
      return;
    },
    enterChatHistory() {
      common_vendor.index.redirectTo({
        url: "/pages/user/chat_history"
      });
    },
    // rpx 转换成 px
    rpxTopx(px) {
      let deviceWidth = common_vendor.index.getSystemInfoSync().windowWidth;
      let rpx = 750 / deviceWidth * Number(px);
      return Math.floor(rpx);
    },
    // 滚动至聊天底部
    scrollToBottom() {
      this.$nextTick(() => {
        this.scroll_anchor = "scrollTarget";
      });
      this.scroll_anchor = "";
    },
    // 监视聊天发送栏高度
    sendHeight() {
      setTimeout(() => {
        let query = common_vendor.index.createSelectorQuery();
        query.select(".group_3").boundingClientRect();
        query.exec((res) => {
          if (res && res[0] && res[0].height) {
            this.bottomHeight = this.rpxTopx(res[0].height);
          } else {
            console.warn("Failed to retrieve .group_3 height.");
          }
        });
      }, 10);
    }
  }
};
if (!Array) {
  const _easycom_ua_markdown2 = common_vendor.resolveComponent("ua-markdown");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_ua_markdown2 + _easycom_uni_icons2 + _easycom_uni_data_select2 + _easycom_uni_easyinput2)();
}
const _easycom_ua_markdown = () => "../../components/ua-markdown/ua-markdown.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_ua_markdown + _easycom_uni_icons + _easycom_uni_data_select + _easycom_uni_easyinput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.exit && $options.exit(...args)),
    b: common_vendor.o((...args) => $options.enterChat && $options.enterChat(...args)),
    c: common_vendor.o((...args) => $options.enterChatHistory && $options.enterChatHistory(...args)),
    d: common_vendor.f($data.msgList, (item, index, i0) => {
      return common_vendor.e({
        a: item.botContent != ""
      }, item.botContent != "" ? {
        b: "85f07247-0-" + i0,
        c: common_vendor.p({
          source: item.botContent
        })
      } : {}, {
        d: index
      });
    }),
    e: this.input_disable
  }, this.input_disable ? {
    f: common_vendor.t(),
    g: common_vendor.p({
      type: "spinner-cycle",
      size: "30"
    })
  } : {}, {
    h: `${$options.windowHeight - $options.inputHeight - 180}rpx`,
    i: $data.scroll_anchor,
    j: common_vendor.o($options.project_change),
    k: common_vendor.o(($event) => $data.project_value = $event),
    l: common_vendor.p({
      localdata: $data.project_range,
      placeholder: "请选择学习项目",
      placement: "top",
      modelValue: $data.project_value
    }),
    m: common_vendor.o(($event) => $data.inputMsg = $event),
    n: common_vendor.p({
      disabled: $data.input_disable,
      clearable: false,
      type: "text",
      placeholder: $data.input_disable ? "智学AI助手正在准备回答..." : "请输入知识点关键词~",
      modelValue: $data.inputMsg
    }),
    o: $data.input_disable,
    p: common_vendor.o((...args) => $options.callPreKnowledge && $options.callPreKnowledge(...args)),
    q: $data.input_disable,
    r: common_vendor.o((...args) => $options.callAdvancedKnowledge && $options.callAdvancedKnowledge(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-85f07247"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/user/knowledgeMap.vue"]]);
wx.createPage(MiniProgramPage);
