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
      formattedTime: null,
      //计时显示时间
      elapsedTime: 0,
      allLearnTime: 0,
      // 存储单次学习时间，xxxx秒，需上云供数据库调用
      SDNNnum: 0,
      RMSSDnum: 0,
      SDNNlist: [],
      RMSSDlist: [],
      receivedData: [],
      shootTimer: null,
      upBtTimer: null,
      lastPhoto: null,
      // 存储最后一张照片的路径
      cameraKey: 0,
      tiredTime: 0,
      //
      tiredformatTime: null,
      //疲劳计时显示时间
      NopersoninSeat: 0,
      //离座计次
      NoattTime: 0,
      //分心计时
      NoattformatTime: null,
      //分心计时显示时间
      Closeeyecount: 0,
      //闭眼次数
      Yawncount: 0,
      //打哈欠计次
      fatiguePlus: false
    };
  },
  onLoad(options) {
    if (options.deviceId) {
      this.connectedDeviceId = options.deviceId;
    } else {
      console.error("No device ID passed to page");
      common_vendor.index.showModal({
        title: "蓝牙未连接成功:",
        content: "未接收到设备ID，无法连接蓝牙设备",
        showCancel: false
      });
    }
    this.stopAutoTakePhoto();
    this.checkAndRequestCameraPermission();
  },
  computed: {
    formattedTime() {
      const hours = String(Math.floor(this.elapsedTime / 3600)).padStart(2, "0");
      const minutes = String(Math.floor(this.elapsedTime % 3600 / 60)).padStart(2, "0");
      const seconds = String(this.elapsedTime % 60).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    },
    tiredformatTime() {
      const hours = String(Math.floor(this.tiredTime / 3600)).padStart(2, "0");
      const minutes = String(Math.floor(this.tiredTime % 3600 / 60)).padStart(2, "0");
      const seconds = String(this.tiredTime % 60).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    },
    NoattformatTime() {
      const hours = String(Math.floor(this.NoattTime / 3600)).padStart(2, "0");
      const minutes = String(Math.floor(this.NoattTime % 3600 / 60)).padStart(2, "0");
      const seconds = String(this.NoattTime % 60).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    }
  },
  methods: {
    checkAndRequestCameraPermission() {
      common_vendor.index.getSetting({
        success: (res) => {
          if (!res.authSetting["scope.camera"]) {
            common_vendor.index.authorize({
              scope: "scope.camera",
              success: () => {
                console.log("相机授权成功");
              },
              fail: () => {
                common_vendor.index.showModal({
                  title: "相机权限未授权",
                  content: "请授权相机权限以使用相机功能",
                  showCancel: false,
                  success: (modalRes) => {
                    if (modalRes.confirm) {
                      common_vendor.index.openSetting({
                        success: (settingRes) => {
                          if (settingRes.authSetting["scope.camera"]) {
                            console.log("用户在设置后授权了相机权限");
                          } else {
                            console.log("用户没有开启相机权限");
                          }
                        }
                      });
                    }
                  }
                });
              }
            });
          } else {
            console.log("相机已授权");
          }
        }
      });
    },
    takePhoto() {
      const context = common_vendor.index.createCameraContext();
      context.takePhoto({
        quality: "high",
        success: (res) => {
          console.log("拍照成功:", res.tempImagePath);
          this.uploadPhotoToServer1(res.tempImagePath);
          this.uploadPhotoToServer2(res.tempImagePath);
          this.lastPhoto = res.tempImagePath;
          this.cameraKey++;
        },
        fail: () => {
          console.error("拍照失败");
          common_vendor.index.showToast({
            title: "拍照失败",
            icon: "fail",
            duration: 500
            // 显示时长1000毫秒，即1秒
          });
        }
      });
    },
    uploadPhotoToServer1(filePath) {
      common_vendor.index.uploadFile({
        url: "http://42.194.198.63:5000/smartlearn/fatigue-detection",
        // 
        filePath,
        name: "file",
        formData: {
          "user": "test"
        },
        success: (uploadFileRes) => {
          console.log("上传服务器1成功:", uploadFileRes.data);
          let responseData = JSON.parse(uploadFileRes.data);
          if (responseData.eyes === "fatigue" && responseData.mouth === "fatigue") {
            console.log("眼睛和嘴巴都疲劳");
            this.Closeeyecount++;
            this.Yawncount++;
            this.tiredTime += 5;
          } else {
            if (responseData.eyes === "fatigue") {
              console.log("眼睛疲劳");
              this.Closeeyecount++;
              if (!(responseData.mouth === "fatigue")) {
                this.tiredTime += 5;
              }
            }
            if (responseData.mouth === "fatigue") {
              console.log("嘴巴疲劳");
              this.Yawncount++;
              if (!(responseData.eyes === "fatigue")) {
                this.tiredTime += 5;
              }
            }
          }
        },
        fail: () => {
          console.error("上传服务器1失败");
        }
      });
    },
    // 上传到第二个服务器
    uploadPhotoToServer2(filePath) {
      common_vendor.index.uploadFile({
        url: "http://42.194.198.63:5000/smartlearn/human-detection",
        filePath,
        name: "file",
        formData: {
          "user": "test"
        },
        success: (uploadFileRes) => {
          console.log("上传到服务器2成功:", uploadFileRes.data);
          let responseData = JSON.parse(uploadFileRes.data);
          if (responseData.message === "No detection") {
            this.NopersoninSeat++, this.NoattTime = this.NoattTime + 5, common_vendor.index.showToast({
              title: "离开座位",
              icon: "次数加1",
              duration: 500
              // 显示时长1000毫秒，即1秒
            });
            console.log("No person in seat count:", this.NopersoninSeat);
          }
        },
        fail: () => {
          console.error("上传到服务器2失败");
        }
      });
    },
    /*startAutoTakePhoto() {
          if (!this.shootTimer) {
            this.shootTimer = setInterval(this.takePhoto, 10000);
          }
    },
    stopAutoTakePhoto() {
          if (this.shootTimer) {
            clearInterval(this.shootTimer);
            this.shootTimer = null;
          }
    },*/
    getservice() {
      const that = this;
      common_vendor.index.getBLEDeviceServices({
        deviceId: that.connectedDeviceId,
        // 在 uni-app 中通常不需要使用 `data` 属性
        success: function(res) {
          console.log(res.services);
          res.services.map((service) => service.uuid);
          that.services = res.services;
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
      if (!this.connectedDeviceId || !this.services.length || !this.characteristics) {
        common_vendor.index.showModal({
          title: "错误",
          content: "设备未连接或服务特征未准备好",
          showCancel: false
        });
        return;
      }
      const serviceId = this.services[0].uuid;
      const characteristicId = this.characteristics[1].uuid;
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
          common_vendor.index.showModal({
            title: "监听特征值变化:",
            content: `成功设置监听特征值变化！`,
            showCancel: false
          });
        },
        fail: function(err) {
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
      common_vendor.index.onBLECharacteristicValueChange((res) => {
        const hexData = ab2hex(res.value);
        const timestamp = Date.now();
        this.receivedData.push({ data: hexData, time: timestamp });
      });
    },
    uploadBtData() {
      const dataToSend = this.receivedData;
      if (dataToSend.length > 0) {
        common_vendor.index.request({
          url: "http://42.194.198.63:5000/smartlearn/pressure-detection",
          method: "POST",
          data: dataToSend,
          header: {
            "Content-Type": "application/json"
            // 指定请求体格式为JSON
          },
          success: (res) => {
            let data = res.data;
            this.RMSSDnum = parseInt(data.RMSSD);
            this.SDNNnum = parseInt(data.SDNN);
            this.SDNNlist.push({ SDNN: this.SDNNnum });
            this.RMSSDlist.push({ RMSSD: this.RMSSDnum });
            console.log("SDNNlist:", this.SDNNlist);
            console.log("RMSSDlist:", this.RMSSDlist);
            common_vendor.index.showModal({
              title: "服务器返回结果",
              content: JSON.stringify(res.data, null, 2),
              showCancel: false
            });
            this.receivedData = [];
            console.log("Data uploaded successfully", res);
          },
          fail: function(uploadErr) {
            console.error("Failed to upload data", uploadErr);
          }
        });
      }
    },
    closeBluetooth() {
      if (this.upBtTimer) {
        clearInterval(this.upBtTimer);
        this.upBtTimer = null;
        console.log("定时上传已停止");
      }
      common_vendor.index.closeBluetoothAdapter({
        success: (res) => {
          console.log("蓝牙适配器关闭成功", res);
          common_vendor.index.showToast({
            title: "蓝牙已关闭",
            icon: "success",
            duration: 500
          });
        },
        fail: (err) => {
          console.error("蓝牙适配器关闭失败", err);
          common_vendor.index.showModal({
            title: "关闭失败",
            content: "无法关闭蓝牙适配器，请重试",
            showCancel: false
          });
        }
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
      if (!this.shootTimer) {
        this.shootTimer = setInterval(this.takePhoto, 5e3);
      }
      if (!this.upBtTimer) {
        this.upBtTimer = setInterval(this.uploadBtData, 6e4);
      }
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
      if (this.shootTimer) {
        clearInterval(this.shootTimer);
        this.shootTimer = null;
      }
    },
    goTothisReport() {
      common_vendor.index.navigateTo({
        url: "/pages/learn/thisTimeReport"
        // 本次学习报告页面
      });
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
    a: $data.cameraKey,
    b: common_vendor.o((...args) => $options.getservice && $options.getservice(...args)),
    c: common_vendor.o((...args) => $options.getcharacteristics && $options.getcharacteristics(...args)),
    d: common_vendor.o((...args) => $options.charIdchange && $options.charIdchange(...args)),
    e: common_vendor.o((...args) => $options.closeBluetooth && $options.closeBluetooth(...args)),
    f: common_vendor.o((...args) => $options.startTimer && $options.startTimer(...args)),
    g: common_vendor.o((...args) => $options.stopTimer && $options.stopTimer(...args)),
    h: common_vendor.o((...args) => $options.continueTimer && $options.continueTimer(...args)),
    i: common_vendor.o((...args) => $options.endTimer && $options.endTimer(...args)),
    j: common_vendor.t($options.formattedTime),
    k: common_vendor.t($data.SDNNnum),
    l: common_vendor.t($data.RMSSDnum),
    m: common_vendor.t($options.tiredformatTime),
    n: common_vendor.t($data.Closeeyecount),
    o: common_vendor.t($data.Yawncount),
    p: common_vendor.t($options.NoattformatTime),
    q: common_vendor.t($data.SDNNnum),
    r: common_vendor.t($data.NopersoninSeat),
    s: common_vendor.o((...args) => $options.goTothisReport && $options.goTothisReport(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8da1649f"], ["__file", "D:/Git/SmartLearn/software_test/mini_program_test_zy/pages/learn/learntiming.vue"]]);
wx.createPage(MiniProgramPage);
