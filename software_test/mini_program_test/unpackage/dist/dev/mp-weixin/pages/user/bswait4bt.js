"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  props: {},
  data() {
    return {
      info: "",
      device: [],
      service: [],
      isBluetoothAdapter: false,
      isBluetoothSearch: false,
      isBluetoothInfo: false
    };
  },
  methods: {
    //打开蓝牙适配器
    openBluetoothAdapter() {
      const that = this;
      if (!that.isBluetoothAdapter) {
        common_vendor.index.openBluetoothAdapter({
          success(res) {
            console.log("初始化蓝牙适配器成功", JSON.stringify(res));
            that.info = "初始化蓝牙适配器成功" + JSON.stringify(res);
            common_vendor.index.showModal({
              title: "蓝牙适配情况",
              content: "初始化蓝牙适配器成功",
              showCancel: false
            });
            that.isBluetoothAdapter = true;
          },
          fail(res) {
            console.log("初始化蓝牙适配器失败", JSON.stringify(res));
            that.info = "初始化蓝牙适配器失败" + JSON.stringify(res);
            common_vendor.index.showModal({
              title: "蓝牙适配情况",
              content: "蓝牙适配失败，请检查手机蓝牙和定位功能是否打开",
              showCancel: false
            });
          },
          complete() {
            console.log("初始化蓝牙适配器完成");
          }
        });
      } else {
        common_vendor.index.closeBluetoothAdapter({
          success(res) {
            console.log("关闭蓝牙适配器成功", res);
            common_vendor.index.showToast({
              title: "蓝牙适配器已关闭",
              icon: "success",
              duration: 1e3
            });
            that.isBluetoothAdapter = false;
          },
          fail(err) {
            console.log("关闭蓝牙适配器失败", err);
            common_vendor.index.showToast({
              title: "关闭失败",
              icon: "none",
              duration: 1e3
            });
          }
        });
      }
    },
    //搜索蓝牙设备
    searchBluetoothDevices() {
      const that = this;
      if (!that.isBluetoothSearch) {
        common_vendor.index.startBluetoothDevicesDiscovery({
          success(res) {
            console.log("开始搜索蓝牙设备", res);
            common_vendor.index.showModal({
              title: "蓝牙搜索",
              content: "已成功开启蓝牙搜索",
              showCancel: false
            });
            that.isBluetoothSearch = true;
          },
          fail(res) {
            console.log("搜索设备失败", JSON.stringify(res));
            common_vendor.index.showModal({
              title: "蓝牙搜索",
              content: "未成功开启蓝牙搜索",
              showCancel: false
            });
          }
        });
      } else {
        common_vendor.index.stopBluetoothDevicesDiscovery({
          success(res) {
            console.log("关闭蓝牙搜索成功", res);
            common_vendor.index.showModal({
              title: "蓝牙搜索",
              content: "已成功关闭蓝牙搜索",
              showCancel: false
            });
            that.isBluetoothSearch = false;
          },
          fail(res) {
            console.log("关闭蓝牙搜索失败", res);
            common_vendor.index.showModal({
              title: "蓝牙搜索",
              content: "未成功关闭蓝牙搜索",
              showCancel: false
            });
          }
        });
      }
    },
    //点击连接蓝牙获取蓝牙设备信息
    connectBluetooth() {
      const that = this;
      common_vendor.index.getBluetoothDevices({
        success(res) {
          that.device = res.devices.map((device) => ({
            deviceId: device.deviceId,
            name: device.name || "未命名设备"
          }));
          that.isBluetoothInfo = true, common_vendor.index.showModal({
            title: "搜索蓝牙数目:",
            content: `找到 ${res.device.length} 个蓝牙设备`,
            showCancel: false
          });
        },
        fail(err) {
          common_vendor.index.showModal({
            title: "搜索蓝牙数目:",
            content: "获取蓝牙设备列表失败",
            showCancel: false
          });
        }
      });
    },
    //点击设备连接蓝牙
    connectTo(deviceId) {
      const that = this;
      common_vendor.index.createBLEConnection({
        deviceId,
        success(res) {
          common_vendor.index.showModal({
            title: "连接设备成功:",
            content: `已连接设备ID：${deviceId}, 点击确认跳转`,
            showCancel: false,
            success: function(modalRes) {
              if (modalRes.confirm) {
                common_vendor.index.navigateTo({
                  url: "/pages/user/detecting60s?deviceId=" + deviceId
                  // 修改为你的目标页面路径
                });
              }
            }
          });
        },
        fail(err) {
          console.error("连接设备失败", err);
          that.info = "连接失败";
          common_vendor.index.showModal({
            title: "连接设备失败:",
            content: `未能成功连接设备ID：${deviceId}`,
            showCancel: false
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.isBluetoothAdapter ? 1 : "",
    b: !$data.isBluetoothAdapter ? 1 : "",
    c: common_vendor.o((...args) => $options.openBluetoothAdapter && $options.openBluetoothAdapter(...args)),
    d: $data.isBluetoothSearch ? 1 : "",
    e: !$data.isBluetoothSearch ? 1 : "",
    f: common_vendor.o((...args) => $options.searchBluetoothDevices && $options.searchBluetoothDevices(...args)),
    g: $data.isBluetoothInfo ? 1 : "",
    h: !$data.isBluetoothInfo ? 1 : "",
    i: common_vendor.o((...args) => $options.connectBluetooth && $options.connectBluetooth(...args)),
    j: common_vendor.f($data.device, (device, index, i0) => {
      return {
        a: common_vendor.t(device.name),
        b: common_vendor.o(($event) => $options.connectTo(device.deviceId), device.deviceId),
        c: device.deviceId
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b42506ea"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/user/bswait4bt.vue"]]);
wx.createPage(MiniProgramPage);
