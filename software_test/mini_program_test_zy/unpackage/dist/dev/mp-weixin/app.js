"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/learn/wait4bt.js";
  "./pages/user/detecting60s.js";
  "./pages/reflection/reflectionchart.js";
  "./pages/learn/learntiming.js";
  "./pages/user/user_main_page.js";
  "./pages/learn/bt_connected.js";
  "./pages/user/bslinedetect.js";
  "./pages/user/bswait4bt.js";
  "./pages/index/index.js";
  "./pages/user/settings.js";
  "./pages/review/learned.js";
  "./pages/user/detectreport.js";
  "./pages/user/detectrecord.js";
  "./pages/review/learning.js";
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
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/SmartLearn/software_test/mini_program_test_zy/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
