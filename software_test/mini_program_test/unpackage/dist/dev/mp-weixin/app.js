"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/init_loading.js";
  "./pages/user/user_main_page.js";
  "./pages/review/learning.js";
  "./pages/review/history.js";
  "./pages/learn/bt_connected.js";
  "./pages/learn/wait4bt.js";
  "./pages/review/learned.js";
  "./pages/login/sign_up_success.js";
  "./pages/login/sign_up.js";
  "./pages/login/log_in.js";
  "./pages/login/welcome.js";
  "./pages/user/chat.js";
  "./pages/user/chat_history.js";
  "./pages/user/knowledgeMap.js";
  "./pages/review/reflectionchart.js";
  "./pages/review/review.js";
  "./pages/user/settings.js";
  "./pages/user/detect_record.js";
  "./pages/user/detecting60s.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/SmartLearn/software_test/mini_program_test/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
