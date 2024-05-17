"use strict";
const common_vendor = require("../../common/vendor.js");
const db = common_vendor.Ws.database();
const _sfc_main = {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    // 点击登录按钮	
    //         login() {				
    //             login_obj.login({
    // 	email: this.email,
    // 	password: this.password
    // }).then(res=>{
    // 	console.log(res)
    // }).catch(err=>{
    // 	console.log(err)
    // })
    // },
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
          common_vendor.index.navigateTo({
            url: "sign_up_success"
          });
          let userId = emailRes.result.data[0]._id;
          common_vendor.index.setStorageSync("user_id", userId);
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
        url: "sign_up"
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
    f: common_vendor.o((...args) => $options.enterSignup && $options.enterSignup(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d8144b15"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/login/log_in.vue"]]);
wx.createPage(MiniProgramPage);
