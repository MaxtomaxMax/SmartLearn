"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      connectedDeviceId: "",
      serviceId: "",
      // 假设你已知需要监听的服务ID
      services: [],
      characteristics: [],
      characteristicId: "",
      // 假设你已知需要监听的特征ID
      timer: null,
      elapsedTime: 0,
      allLearnTime: 0,
      // 存储单次学习时间，xxxx秒，供数据库调用
      SDNNnum: 19,
      RMSSDnum: 229,
      receivedData: ""
    };
  },
  onLoad(options) {
    if (options.deviceId) {
      this.connectedDeviceId = options.deviceId;
      common_vendor.index.showModal({
        title: "蓝牙已连接:",
        content: `连接蓝牙设备ID：${this.connectedDeviceId}`,
        showCancel: false
      });
    } else {
      console.error("No device ID passed to page");
      common_vendor.index.showModal({
        title: "蓝牙未连接成功:",
        content: "未接收到设备ID，无法连接蓝牙设备",
        showCancel: false
      });
    }
  },
  computed: {
    formattedTime() {
      const hours = String(Math.floor(this.elapsedTime / 3600)).padStart(
        2,
        "0"
      );
      const minutes = String(
        Math.floor(this.elapsedTime % 3600 / 60)
      ).padStart(2, "0");
      const seconds = String(this.elapsedTime % 60).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    }
  },
  methods: {
    getservice() {
      const that = this;
      common_vendor.index.getBLEDeviceServices({
        deviceId: that.connectedDeviceId,
        // 在 uni-app 中通常不需要使用 `data` 属性
        success: function(res) {
          console.log(res.services);
          res.services.map((service) => service.uuid);
          that.services = res.services;
          common_vendor.index.showModal({
            title: "获取服务成功:",
            content: `服务列表：${JSON.stringify(that.services)}`,
            showCancel: false
          });
        },
        fail: function(err) {
          that.info = "获取设备服务失败！" + err.message;
          common_vendor.index.showModal({
            title: "获取服务失败:",
            content: `服务列表：${JSON.stringify(that.services)}`,
            showCancel: false
          });
        }
      });
    },
    //获取特征值
    getcharacteristics() {
      const that = this;
      if (that.services.length > 0) {
        let myuuid = that.services[0].uuid;
        common_vendor.index.getBLEDeviceCharacteristics({
          deviceId: that.connectedDeviceId,
          serviceId: myuuid,
          success: function(res) {
            console.log(res.characteristics);
            that.characteristics = res.characteristics.map((chr) => ({
              uuid: chr.uuid,
              notify: chr.properties.notify,
              write: chr.properties.write,
              read: chr.properties.read
            }));
            common_vendor.index.showModal({
              title: "获取特征值成功:",
              content: `特征值列表：${JSON.stringify(that.characteristics)}`,
              showCancel: false
            });
          },
          fail: function(err) {
            that.info = "特征值获取失败" + err.message;
            common_vendor.index.showModal({
              title: "获取特征值失败:",
              content: `未能成功获取服务特征值！`,
              showCancel: false
            });
          }
        });
      } else {
        that.info = "无可用服务";
      }
    },
    //监听特征值变化
    charIdchange() {
      const that = this;
      if (!that.connectedDeviceId || !that.services.length || !that.characteristics) {
        common_vendor.index.showModal({
          title: "错误",
          content: "设备未连接或服务特征未准备好",
          showCancel: false
        });
        return;
      }
      const serviceId = that.services[0].uuid;
      const characteristicId = that.characteristics[1].uuid;
      common_vendor.index.notifyBLECharacteristicValueChange({
        state: true,
        deviceId: this.connectedDeviceId,
        // 使用已保存的设备ID
        serviceId,
        // 假设你已经定义并初始化了 serviceId 数组
        characteristicId,
        // 假设你已经定义并初始化了 characteristicId 数组
        success: function(res) {
          console.log("notifyBLECharacteristicValueChange success");
          that.info = "成功";
          common_vendor.index.showModal({
            title: "监听特征值变化:",
            content: `成功设置监听特征值变化！`,
            showCancel: false
          });
        },
        fail: function(err) {
          that.info = "失败：" + err.message;
          common_vendor.index.showModal({
            title: "监听特征值变化:",
            content: `未成功设置监听特征值变化！错误信息：${err.errMsg}`,
            showCancel: false
          });
        }
      });
      function ab2hex(buffer) {
        var hexArr = Array.prototype.map.call(
          new Uint8Array(buffer),
          function(bit) {
            return ("00" + bit.toString(16)).slice(-2);
          }
        );
        return hexArr.join("");
      }
      common_vendor.index.onBLECharacteristicValueChange(function(res) {
        that.receivedData = ab2hex(res.value);
        common_vendor.index.showModal({
          title: "接收到数据:",
          content: `16进制数据为：${that.receivedData}`,
          showCancel: false
        });
      });
    },
    startTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.elapsedTime = 0;
      this.timer = setInterval(() => {
        this.elapsedTime++;
      }, 1e3);
      this.startBluetoothProcess();
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    continueTimer() {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.elapsedTime++;
        }, 1e3);
      }
    },
    endTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.allLearnTime = this.elapsedTime;
      this.elapsedTime = 0;
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    common_vendor.index.offBLECharacteristicValueChange();
    if (this.isBluetoothAdapter) {
      common_vendor.index.closeBluetoothAdapter();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.startTimer && $options.startTimer(...args)),
    b: common_vendor.o((...args) => $options.getservice && $options.getservice(...args)),
    c: common_vendor.o((...args) => $options.getcharacteristics && $options.getcharacteristics(...args)),
    d: common_vendor.o((...args) => $options.charIdchange && $options.charIdchange(...args)),
    e: common_vendor.o((...args) => _ctx.closeBluetooth && _ctx.closeBluetooth(...args)),
    f: common_vendor.o((...args) => $options.startTimer && $options.startTimer(...args)),
    g: common_vendor.o((...args) => $options.stopTimer && $options.stopTimer(...args)),
    h: common_vendor.o((...args) => $options.continueTimer && $options.continueTimer(...args)),
    i: common_vendor.o((...args) => $options.endTimer && $options.endTimer(...args)),
    j: common_vendor.t($options.formattedTime),
    k: common_vendor.t($data.SDNNnum),
    l: common_vendor.t($data.RMSSDnum)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8da1649f"], ["__file", "D:/SmartLearn/software_test/mini_program_test_zy/pages/learn/learntiming.vue"]]);
wx.createPage(MiniProgramPage);
