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
      scroll_anchor: ""
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
      const userId = common_vendor.index.getStorageSync("user_id");
      console.log(userId);
      if (userId) {
        await db.collection("chat_data").add({
          userId,
          posttime: Date.now(),
          content: prompt
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
        if (userId) {
          await db.collection("chat_data").add({
            userId,
            posttime: Date.now(),
            content: this.kimi_res
          });
          console.log("输出存储成功");
        }
      } else {
        console.error(res.result.error);
      }
      this.scrollToBottom();
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
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_ua_markdown2 + _easycom_uni_icons2 + _easycom_uni_easyinput2)();
}
const _easycom_ua_markdown = () => "../../components/ua-markdown/ua-markdown.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_ua_markdown + _easycom_uni_icons + _easycom_uni_easyinput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.enterChatHistory && $options.enterChatHistory(...args)),
    b: common_vendor.f($data.msgList, (item, index, i0) => {
      return common_vendor.e({
        a: item.userContent != ""
      }, item.userContent != "" ? {
        b: common_vendor.t(item.userContent)
      } : {}, {
        c: item.botContent != ""
      }, item.botContent != "" ? {
        d: "e32e353c-0-" + i0,
        e: common_vendor.p({
          source: item.botContent
        })
      } : {}, {
        f: index
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
    h: common_vendor.o($options.sendMsg),
    i: common_vendor.o(($event) => $data.inputMsg = $event),
    j: common_vendor.p({
      disabled: $data.input_disable,
      type: "text",
      ["suffix-icon"]: "paperplane",
      placeholder: $data.input_disable ? "智学AI助手正在准备回答..." : "向智学学习助手提问吧~",
      modelValue: $data.inputMsg
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e32e353c"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/user/chat.vue"]]);
wx.createPage(MiniProgramPage);
