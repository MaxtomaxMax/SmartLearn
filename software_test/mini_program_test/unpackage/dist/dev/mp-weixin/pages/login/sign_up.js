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
      email: "",
      password: "",
      confirmPassword: "",
      hashPassword: ""
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
    async signup() {
      try {
        if (this.password !== this.confirmPassword) {
          console.log("两次输入密码不一致");
          return;
        }
        if (this.password.length < 6 || this.password.length > 16) {
          console.log("密码长度应在6-16位");
          return;
        }
        const checkUniResult = await common_vendor.Ws.callFunction({
          name: "check_uni",
          data: {
            key: "email",
            value: this.email
          }
        });
        if (checkUniResult.result.data.length !== 0) {
          console.log("该邮箱已经被注册");
          common_vendor.index.showToast({
            icon: "error",
            title: "该邮箱已经被注册"
          });
          return;
        }
        const encryptResult = await common_vendor.Ws.callFunction({
          name: "encrypt",
          data: {
            password: this.password
          }
        });
        console.log("加密完成");
        this.hashPassword = encryptResult.result;
        const dbResult = await db.collection("SmartLearn_user").add({
          email: this.email,
          password: this.hashPassword
        });
        console.log("注册成功");
        common_vendor.index.showToast({
          title: "注册成功"
        });
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/login/sign_up_success"
          });
        }, 1500);
      } catch (err) {
        console.log(err);
        common_vendor.index.showToast({
          icon: "error",
          title: "注册失败，请稍后再试"
        });
      }
    },
    enterLogin() {
      common_vendor.index.navigateTo({
        url: "log_in"
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
    e: $data.confirmPassword,
    f: common_vendor.o(($event) => $data.confirmPassword = $event.detail.value),
    g: common_vendor.o((...args) => $options.signup && $options.signup(...args)),
    h: common_vendor.o((...args) => $options.enterLogin && $options.enterLogin(...args)),
    i: $data.containerWidth,
    j: $data.containerHeight
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2c2afae1"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/login/sign_up.vue"]]);
wx.createPage(MiniProgramPage);
