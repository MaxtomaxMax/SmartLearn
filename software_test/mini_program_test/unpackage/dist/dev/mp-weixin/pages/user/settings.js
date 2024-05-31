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
      avatarToStore: "",
      username: "未命名用户",
      signature: "写下自己的个性签名吧",
      isReminderOn: false,
      setTime: "9：00",
      imageUrl: "../../static/ui_icon/avatar.png",
      isFollowOn: true,
      isRankingOn: true
    };
  },
  onLoad() {
    this.setContainerSize();
    this.userId = common_vendor.index.getStorageSync("user_id");
    this.imageUrl = common_vendor.index.getStorageSync("avatar_url");
    this.username = common_vendor.index.getStorageSync("username");
    this.signature = common_vendor.index.getStorageSync("signature");
  },
  methods: {
    exit() {
      common_vendor.index.navigateBack();
    },
    toggleFollow() {
      return;
    },
    toggleRanking() {
      return;
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
    //头像
    changeImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths[0];
          this.imageUrl = tempFilePaths;
          common_vendor.index.showModal({
            title: "头像设置结果",
            content: "设置成功！",
            showCancel: false
          });
          common_vendor.Ws.uploadFile({
            filePath: tempFilePaths,
            cloudPath: this.userId + "_avatar.jpg"
          }).then((res2) => {
            this.avatarToStore = res2.fileID;
            common_vendor.index.setStorageSync("avatar_url", tempFilePaths);
            db.collection("SmartLearn_user").doc(this.userId).update({
              avatar: this.avatarToStore
            }).then((res3) => {
              console.log(res3);
            });
          }).catch((err) => {
            console.log(err);
          });
        },
        fail: (err) => {
          console.log("选择图片失败", err);
        }
      });
    },
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
        content: this.username,
        editable: true,
        success: (res) => {
          if (res.confirm && res.content) {
            this.username = res.content;
            common_vendor.index.setStorageSync("username", this.username);
            db.collection("SmartLearn_user").doc(this.userId).update({
              username: this.username
            }).then((res2) => {
              console.log(res2);
            }).catch((err) => {
              console.log(err);
            });
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
            common_vendor.index.setStorageSync("signature", this.signature);
            db.collection("SmartLearn_user").doc(this.userId).update({
              signature: this.signature
            }).then((res2) => {
              console.log(res2);
            }).catch((err) => {
              console.log(err);
            });
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
            common_vendor.index.setStorageSync("user_id", "");
            common_vendor.index.setStorageSync("username", "");
            common_vendor.index.setStorageSync("avatar_url", "");
            common_vendor.index.setStorageSync("signature", "");
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
    a: common_vendor.o((...args) => $options.exit && $options.exit(...args)),
    b: $data.isReminderOn,
    c: common_vendor.o((...args) => $options.toggleReminder && $options.toggleReminder(...args)),
    d: common_vendor.t($data.setTime),
    e: common_vendor.o((...args) => $options.bindTimeChange && $options.bindTimeChange(...args)),
    f: $data.isFollowOn,
    g: common_vendor.o((...args) => $options.toggleFollow && $options.toggleFollow(...args)),
    h: $data.isRankingOn,
    i: common_vendor.o((...args) => $options.toggleRanking && $options.toggleRanking(...args)),
    j: $data.imageUrl,
    k: common_vendor.o((...args) => $options.changeImage && $options.changeImage(...args)),
    l: common_vendor.t($data.username),
    m: common_vendor.o((...args) => $options.editNickname && $options.editNickname(...args)),
    n: common_vendor.t($data.signature),
    o: common_vendor.o((...args) => $options.editSignature && $options.editSignature(...args)),
    p: common_vendor.o((...args) => $options.confirmLogout && $options.confirmLogout(...args)),
    q: $data.containerWidth,
    r: $data.containerHeight
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ce914230"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/user/settings.vue"]]);
wx.createPage(MiniProgramPage);
