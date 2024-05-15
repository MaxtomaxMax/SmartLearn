"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      inputMsg: "",
      keyboardHeight: 0,
      bottomHeight: 0,
      scrollTop: 0,
      // 滚动距离
      userId: "",
      msgList: [
        {
          botContent: "Hi, Jas! My name is Max~",
          userContent: ""
        }
        // 以上为测试信息
      ]
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
    sendMsg() {
      if (this.inputMsg.trim() === "") {
        common_vendor.index.showToast({
          title: "不能发送空白消息",
          icon: "none"
        });
        return;
      }
      this.msgList.push({
        botContent: "",
        userContent: this.inputMsg
      });
      this.inputMsg = "";
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
      setTimeout(() => {
        let query = common_vendor.index.createSelectorQuery().in(this);
        query.select("#scrollview").boundingClientRect();
        query.select("#msgList-container").boundingClientRect();
        query.exec((res) => {
          if (res && res[0] && res[1] && res[1].height > res[0].height) {
            this.scrollTop = this.rpxTopx(res[1].height - res[0].height);
          }
        });
      }, 15);
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
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.msgList, (item, index, i0) => {
      return common_vendor.e({
        a: item.userContent != ""
      }, item.userContent != "" ? {
        b: common_vendor.t(item.userContent)
      } : {}, {
        c: item.botContent != ""
      }, item.botContent != "" ? {
        d: common_vendor.t(item.botContent)
      } : {}, {
        e: index
      });
    }),
    b: `${$options.windowHeight - $options.inputHeight - 180}rpx`,
    c: common_vendor.o($options.sendMsg),
    d: common_vendor.o(($event) => $data.inputMsg = $event),
    e: common_vendor.p({
      type: "text",
      ["suffix-icon"]: "paperplane",
      placeholder: "向智学学习助手提问吧~",
      modelValue: $data.inputMsg
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e32e353c"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/user/chat.vue"]]);
wx.createPage(MiniProgramPage);
