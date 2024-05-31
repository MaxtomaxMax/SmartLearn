"use strict";
const common_vendor = require("../../common/vendor.js");
const db = common_vendor.Ws.database();
const _sfc_main = {
  data() {
    return {
      containerWidth: "0px",
      containerHeight: "0px",
      email: "",
      password: ""
    };
  },
  onLoad() {
    this.setContainerSize();
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
    async login() {
      let emailRes = await db.collection("SmartLearn_user").where({
        "email": this.email
      }).get();
      if (emailRes.result.data[0]) {
        console.log("邮箱匹配成功");
        let pwd_stored = emailRes.result.data[0].password;
        let valPwdRes = await common_vendor.Ws.callFunction({
          name: "val_pwd",
          data: {
            password: this.password,
            pwd_stored
          }
        });
        if (valPwdRes.result.code == 0) {
          console.log("密码匹配成功");
          common_vendor.index.showToast({
            title: "成功登录"
          });
          common_vendor.index.switchTab({
            url: "/pages/review/learning"
          });
          console.log(emailRes);
          let userId = emailRes.result.data[0]._id;
          let avatarUrl = emailRes.result.data[0].avatar;
          let signature = emailRes.result.data[0].signature;
          let username = emailRes.result.data[0].username;
          common_vendor.index.setStorageSync("user_id", userId);
          common_vendor.index.setStorageSync("avatar_url", avatarUrl);
          common_vendor.index.setStorageSync("signature", signature);
          common_vendor.index.setStorageSync("username", username);
          console.log("用户登录信息成功存储");
        } else {
          console.log("密码匹配失败");
          common_vendor.index.showToast({
            icon: "error",
            title: "密码不正确"
          });
        }
      } else {
        console.log("数据库中未匹配到该邮箱");
      }
    },
    // 跳转到注册页面
    enterSignup() {
      common_vendor.index.navigateTo({
        url: "/pages/login/sign_up"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.email,
    b: common_vendor.o(($event) => $data.email = $event.detail.value),
    c: $data.password,
    d: common_vendor.o(($event) => $data.password = $event.detail.value),
    e: common_vendor.o((...args) => $options.login && $options.login(...args)),
    f: common_vendor.o((...args) => $options.enterSignup && $options.enterSignup(...args)),
    g: $data.containerWidth,
    h: $data.containerHeight
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d8144b15"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/login/log_in.vue"]]);
wx.createPage(MiniProgramPage);
