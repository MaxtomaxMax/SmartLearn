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
      subProject_value: 0,
      subProject_range: [],
      enableSubProject: false,
      // 按钮是否禁用的变量
      button_disable: true
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
    async sendMsg() {
      if (this.inputMsg.trim() == "") {
        common_vendor.index.showToast({
          title: "不能发送空白消息",
          icon: "none"
        });
        return;
      }
      let prompt = this.inputMsg;
      this.inputMsg = "";
      this.msgList.push({
        botContent: "",
        userContent: prompt
      });
      this.input_disable = true;
      this.scrollToBottom();
      this.userId = common_vendor.index.getStorageSync("user_id");
      console.log(this.userId);
      if (this.userId) {
        await db.collection("chat_data").add({
          userId: this.userId,
          posttime: Date.now(),
          content: prompt,
          isUser: true
        });
        console.log("输入存储成功");
      }
      let res = await common_vendor.Ws.callFunction({
        name: "kimi_chat",
        data: {
          prompt,
          history: this.history
        }
      });
      if (res.result.success) {
        this.kimi_res = res.result.message;
        this.history = res.result.history;
        console.log(res);
        if (this.userId) {
          await db.collection("chat_data").add({
            userId: this.userId,
            posttime: Date.now(),
            content: this.kimi_res,
            isUser: false
          });
          console.log("输出存储成功");
        }
      } else {
        console.error(res.result.error);
      }
      this.msgList.push({
        botContent: this.kimi_res,
        userContent: ""
      });
      console.log(this.msgList);
      this.input_disable = false;
      this.scrollToBottom();
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
    a: common_vendor.o((...args) => $options.enterChatHistory && $options.enterChatHistory(...args)),
    b: common_vendor.f($data.msgList, (item, index, i0) => {
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
    c: this.input_disable
  }, this.input_disable ? {
    d: common_vendor.t(),
    e: common_vendor.p({
      type: "spinner-cycle",
      size: "30"
    })
  } : {}, {
    f: `${$options.windowHeight - $options.inputHeight - 180}rpx`,
    g: $data.scroll_anchor,
    h: common_vendor.o($options.project_change),
    i: common_vendor.o(($event) => $data.project_value = $event),
    j: common_vendor.p({
      localdata: $data.project_range,
      disabled: $data.enableSubProject,
      placeholder: "请选择学习项目",
      placement: "top",
      modelValue: $data.project_value
    }),
    k: common_vendor.o($options.subProject_change),
    l: common_vendor.o(($event) => $data.subProject_value = $event),
    m: common_vendor.p({
      localdata: $data.subProject_range,
      placeholder: "请选择子学习项目",
      placement: "top",
      modelValue: $data.subProject_value
    }),
    n: common_vendor.o($options.sendMsg),
    o: common_vendor.o(($event) => $data.inputMsg = $event),
    p: common_vendor.p({
      disabled: $data.input_disable,
      type: "text",
      placeholder: $data.input_disable ? "智学AI助手正在准备回答..." : "请输入知识点关键词~",
      modelValue: $data.inputMsg
    }),
    q: $data.button_disable,
    r: $data.button_disable
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-85f07247"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/user/knowledgeMap.vue"]]);
wx.createPage(MiniProgramPage);
