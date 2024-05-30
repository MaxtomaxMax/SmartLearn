"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      connectedDeviceid: "",
      serviceid: "",
      // 假设你已知需要监听的服务ID
      service: [],
      characteristic: [],
      characteristicid: "",
      // 假设你已知需要监听的特征ID
      BsreceivedData: [],
      countdown: 60
    };
  },
  onLoad(options) {
    if (options.deviceId) {
      this.connectedDeviceid = options.deviceId;
      common_vendor.index.showModal({
        title: "蓝牙已连接:",
        content: `连接蓝牙设备ID：${this.connectedDeviceid}`,
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
  methods: {
    getservice() {
      const that = this;
      common_vendor.index.getBLEDeviceServices({
        deviceId: that.connectedDeviceid,
        // 在 uni-app 中通常不需要使用 `data` 属性
        success: function(res) {
          console.log(res.service);
          res.services.map((service) => service.uuid);
          that.service = res.services;
          common_vendor.index.showModal({
            title: "获取服务成功:",
            content: `服务列表：${JSON.stringify(that.service)}`,
            showCancel: false
          });
        },
        fail: function(err) {
          that.info = "获取设备服务失败！" + err.message;
          common_vendor.index.showModal({
            title: "获取服务失败:",
            content: `服务列表：${JSON.stringify(that.service)}`,
            showCancel: false
          });
        }
      });
    },
    //获取特征值
    getcharacteristics() {
      const that = this;
      if (that.service.length > 0) {
        let myuuid = that.service[0].uuid;
        common_vendor.index.getBLEDeviceCharacteristics({
          deviceId: that.connectedDeviceid,
          serviceId: myuuid,
          success: function(res) {
            console.log(res.characteristics);
            that.characteristic = res.characteristics.map((chr) => ({
              uuid: chr.uuid,
              notify: chr.properties.notify,
              write: chr.properties.write,
              read: chr.properties.read
            }));
            common_vendor.index.showModal({
              title: "获取特征值成功:",
              content: `特征值列表：${JSON.stringify(that.characteristic)}`,
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
      that.countdown = 60;
      const timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(timer);
          that.countdown = 60;
          common_vendor.index.showModal({
            title: "Baseline结果",
            content: "你已完成今天的Baseline测量，开始学习吧~",
            showCancel: false
          });
        }
      }, 1e3);
      if (!that.connectedDeviceid || !that.service.length || !that.characteristic) {
        common_vendor.index.showModal({
          title: "错误",
          content: "设备未连接或服务特征未准备好",
          showCancel: false
        });
        return;
      }
      const serviceid = that.service[0].uuid;
      const characteristicid = that.characteristic[1].uuid;
      common_vendor.index.notifyBLECharacteristicValueChange({
        state: true,
        deviceId: this.connectedDeviceid,
        //deviceid: this.connectedDeviceid,  // 使用已保存的设备ID
        serviceId: serviceid,
        // 假设你已经定义并初始化了 serviceId 数组
        characteristicId: characteristicid,
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
        const hexData = ab2hex(res.value);
        const timestamp = (/* @__PURE__ */ new Date()).toISOString();
        that.BsreceivedData.push({ data: hexData, time: timestamp });
      });
    },
    //发送数据到云服务器
    sendDataToServer() {
      const dataToSend = this.BsreceivedData;
      if (dataToSend.length > 0) {
        common_vendor.index.request({
          url: "http://workspace.featurize.cn:56691/smartlearn/milliwave-detection",
          // 替换为你的云服务器地址
          method: "POST",
          data: {
            BsreceivedData: dataToSend
          },
          success: (res) => {
            common_vendor.index.showModal({
              title: "服务器返回结果",
              content: JSON.stringify(res.data, null, 2),
              showCancel: false
            });
            this.BsreceivedData = [];
          },
          fail: (err) => {
            common_vendor.index.showModal({
              title: "服务器返回结果:",
              content: "发送数据或返回失败",
              showCancel: false
            });
          }
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.getservice && $options.getservice(...args)),
    b: common_vendor.o((...args) => $options.getcharacteristics && $options.getcharacteristics(...args)),
    c: common_vendor.o((...args) => $options.charIdchange && $options.charIdchange(...args)),
    d: common_vendor.o((...args) => $options.sendDataToServer && $options.sendDataToServer(...args)),
    e: common_vendor.t($data.countdown)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f71916e6"], ["__file", "D:/SmartLearn/software_test/mini_program_test_zy/pages/user/detecting60s.vue"]]);
wx.createPage(MiniProgramPage);
