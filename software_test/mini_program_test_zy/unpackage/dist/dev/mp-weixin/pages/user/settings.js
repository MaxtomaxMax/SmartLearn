"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      nickname: "Lee",
      signature: "Wit beyond measure is man’s greatest treasure",
      isReminderOn: false,
      setTime: "9：00",
      imageUrl: "https://ide.code.fun/api/image?token=6641f349a2432f00114e5feb&name=8eb4f4ac64c115b8b39e93cb93fcda6a.png"
    };
  },
  methods: {
    //头像
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          this.imageUrl = tempFilePaths[0];
          common_vendor.index.showModal({
            title: "头像设置结果",
            content: "设置成功！",
            showCancel: false
          });
        },
        fail: (err) => {
          console.log("选择图片失败", err);
        }
      });
    },
    // 需要将头像上传到数据库，待实现
    //修改定时发送提醒时间
    bindTimeChange(e) {
      this.setTime = e.detail.value;
    },
    //修改开关状态，
    toggleReminder(event) {
      this.isReminderOn = event.detail.value;
      console.log("Switch state changed to:", this.isReminderOn);
      common_vendor.index.showModal({
        title: "发送测试提醒",
        content: `${this.isReminderOn ? "提醒已开启" : "提醒已关闭"}`,
        showCancel: false
      });
    },
    //修改昵称
    editNickname() {
      common_vendor.index.showModal({
        title: "编辑昵称",
        content: this.nickname,
        editable: true,
        success: (res) => {
          if (res.confirm && res.content) {
            this.nickname = res.content;
            getApp().globalData.nickname = res.content;
          }
        }
      });
    },
    editSignature() {
      common_vendor.index.showModal({
        title: "编辑签名",
        content: this.signature,
        editable: true,
        success: (res) => {
          if (res.confirm && res.content) {
            this.signature = res.content;
            getApp().globalData.signature = res.content;
          }
        }
      });
    },
    //
    confirmLogout() {
      common_vendor.index.showModal({
        title: "确认",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.reLaunch({
              url: "/pages/login/log_in"
              // 跳转到登录页面
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.isReminderOn,
    b: common_vendor.o((...args) => $options.toggleReminder && $options.toggleReminder(...args)),
    c: common_vendor.t($data.setTime),
    d: common_vendor.o((...args) => $options.bindTimeChange && $options.bindTimeChange(...args)),
    e: _ctx.isFollowOn,
    f: common_vendor.o((...args) => _ctx.toggleFollow && _ctx.toggleFollow(...args)),
    g: _ctx.isRankingOn,
    h: common_vendor.o((...args) => _ctx.toggleRanking && _ctx.toggleRanking(...args)),
    i: _ctx.isOthers1On,
    j: common_vendor.o((...args) => _ctx.toggleOthers1 && _ctx.toggleOthers1(...args)),
    k: _ctx.isOthers2On,
    l: common_vendor.o((...args) => _ctx.toggleOthers2 && _ctx.toggleOthers2(...args)),
    m: _ctx.isOthers3On,
    n: common_vendor.o((...args) => _ctx.toggleOthers3 && _ctx.toggleOthers3(...args)),
    o: _ctx.isOthers4On,
    p: common_vendor.o((...args) => _ctx.toggleOthers4 && _ctx.toggleOthers4(...args)),
    q: _ctx.isOthers5On,
    r: common_vendor.o((...args) => _ctx.toggleOthers5 && _ctx.toggleOthers5(...args)),
    s: $data.imageUrl,
    t: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    v: common_vendor.t($data.nickname),
    w: common_vendor.o((...args) => $options.editNickname && $options.editNickname(...args)),
    x: common_vendor.t($data.signature),
    y: common_vendor.o((...args) => $options.editSignature && $options.editSignature(...args)),
    z: common_vendor.o((...args) => $options.confirmLogout && $options.confirmLogout(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ce914230"], ["__file", "D:/Git/SmartLearn/software_test/mini_program_test_zy/pages/user/settings.vue"]]);
wx.createPage(MiniProgramPage);
