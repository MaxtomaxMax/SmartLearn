<template>
  <view class="flex-col page">
    <view class="flex-col flex-1 group">
      <text class="self-center text_2">请配置设备</text>
      <view class="self-stretch relative section_5">
        <view
          :class="{
            'flex-col items-center section_6_2 pos selected':
              isBluetoothAdapter,
            'flex-col items-center section_6_1 pos unselected':
              !isBluetoothAdapter,
          }"
          @click="openBluetoothAdapter"
        >
          <image
            class="image_5"
            src="https://ide.code.fun/api/image?token=6644a6da7a1eb60011e6e14f&name=f6f7bfa6d4ead52df7f6ecc1218d104e.png"
          />
          <text class="font text_3 mt-9">打开蓝牙</text>
        </view>

        <view
          :class="{
            'flex-col items-center .section_7_2 pos_2 selected':
              isBluetoothSearch,
            'flex-col items-center section_7_1 pos_2 unselected':
              !isBluetoothSearch,
          }"
          @click="searchBluetoothDevices"
        >
          <image
            class="image_6"
            src="https://ide.code.fun/api/image?token=6644a6da7a1eb60011e6e14f&name=6fb14d10b1bd1a6bd33d12a547b2c9d2.png"
          />
          <text class="mt-8 font text_4">搜索设备</text>
        </view>

        <view
          :class="{
            'flex-col justify-start items-center text-wrapper_2 pos_4 selected':
              isBluetoothInfo,
            'flex-col justify-start items-center text-wrapper_1 pos_4 unselected':
              !isBluetoothInfo,
          }"
          @click="connectBluetooth"
        >
          <image
            class="image_7 pos_3"
            src="https://ide.code.fun/api/image?token=6644a6da7a1eb60011e6e14f&name=7cc341cb07eae6bff54b9d6af659349f.png"
          />
          <text class="font text_5">获取信息</text>
        </view>
      </view>
      <text class="self-center text_6">全部点亮配置成功哦~</text>

      <scroll-view class="device-list" scroll-y="true" style="height: 300px">
        <block v-for="(device, index) in device" :key="device.deviceId">
          <button @tap="connectTo(device.deviceId)">{{ device.name }}</button>
        </block>
      </scroll-view>
    </view>
    <!--<view class="flex-row tab-bar">
            <view class="flex-col items-center section_8">
                <image
                    class="shrink-0 image_8"
                    src="https://ide.code.fun/api/image?token=6644a6da7a1eb60011e6e14f&name=805e88d24b0e0f44626c56046bcb8ae7.png"
                />
                <text class="font_2 text_8">温故</text>
            </view>
            <view class="flex-col items-center section_8">
                <image
                    class="shrink-0 image_8"
                    src="https://ide.code.fun/api/image?token=6644a6da7a1eb60011e6e14f&name=71bb645a12d9751a8fe561928fe04ee0.png"
                />
                <text class="mt-2 font_2 text_9">知新</text>
            </view>
            <view class="flex-col items-center section_8">
                <image
                    class="shrink-0 image_8"
                    src="https://ide.code.fun/api/image?token=6644a6da7a1eb60011e6e14f&name=896ea994c007f533c244d7c2a1bbfab3.png"
                />
                <text class="font_2 text_10">三省</text>
            </view>
            <view class="flex-col items-center section_9">
                <image
                    class="shrink-0 image_8"
                    src="https://ide.code.fun/api/image?token=6644a6da7a1eb60011e6e14f&name=0f87aac748005d33623018ac42a002ae.png"
                />
                <text class="mt-6 font_2 text_11">吾身</text>
            </view>
        </view>-->
  </view>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      info: "",
      device: [],
      service: [],
      isBluetoothAdapter: false,
      isBluetoothSearch: false,
      isBluetoothInfo: false,
    };
  },
  methods: {
    //打开蓝牙适配器
    openBluetoothAdapter() {
      const that = this;
      if (!that.isBluetoothAdapter) {
        uni.openBluetoothAdapter({
          success(res) {
            console.log("初始化蓝牙适配器成功", JSON.stringify(res));
            that.info = "初始化蓝牙适配器成功" + JSON.stringify(res);
            uni.showModal({
              title: "蓝牙适配情况",
              content: "初始化蓝牙适配器成功",
              showCancel: false,
            });
            that.isBluetoothAdapter = true;
          },
          fail(res) {
            console.log("初始化蓝牙适配器失败", JSON.stringify(res));
            that.info = "初始化蓝牙适配器失败" + JSON.stringify(res);
            uni.showModal({
              title: "蓝牙适配情况",
              content: "蓝牙适配失败，请检查手机蓝牙和定位功能是否打开",
              showCancel: false,
            });
          },
          complete() {
            console.log("初始化蓝牙适配器完成");
          },
        });
      } else {
        uni.closeBluetoothAdapter({
          success(res) {
            console.log("关闭蓝牙适配器成功", res);
            uni.showToast({
              title: "蓝牙适配器已关闭",
              icon: "success",
              duration: 1000,
            });
            that.isBluetoothAdapter = false;
          },
          fail(err) {
            console.log("关闭蓝牙适配器失败", err);
            uni.showToast({
              title: "关闭失败",
              icon: "none",
              duration: 1000,
            });
          },
        });
      }
    },
    //搜索蓝牙设备
    searchBluetoothDevices() {
      const that = this;

      if (!that.isBluetoothSearch) {
        uni.startBluetoothDevicesDiscovery({
          success(res) {
            console.log("开始搜索蓝牙设备", res);
            uni.showModal({
              title: "蓝牙搜索",
              content: "已成功开启蓝牙搜索",
              showCancel: false,
            });
            that.isBluetoothSearch = true;
          },
          fail(res) {
            console.log("搜索设备失败", JSON.stringify(res));
            uni.showModal({
              title: "蓝牙搜索",
              content: "未成功开启蓝牙搜索",
              showCancel: false,
            });
          },
        });
      } else {
        uni.stopBluetoothDevicesDiscovery({
          success(res) {
            console.log("关闭蓝牙搜索成功", res);
            uni.showModal({
              title: "蓝牙搜索",
              content: "已成功关闭蓝牙搜索",
              showCancel: false,
            });
            that.isBluetoothSearch = false;
          },
          fail(res) {
            console.log("关闭蓝牙搜索失败", res);
            uni.showModal({
              title: "蓝牙搜索",
              content: "未成功关闭蓝牙搜索",
              showCancel: false,
            });
          },
        });
      }
    },
    //点击连接蓝牙获取蓝牙设备信息
    connectBluetooth() {
      const that = this;
      uni.getBluetoothDevices({
        success(res) {
          that.device = res.devices.map((device) => ({
            deviceId: device.deviceId,
            name: device.name || "未命名设备",
          }));

          (that.isBluetoothInfo = true),
            uni.showModal({
              title: "搜索蓝牙数目:",
              content: `找到 ${res.device.length} 个蓝牙设备`,
              showCancel: false,
            }); // 移除多余的逗号
        },
        fail(err) {
          uni.showModal({
            title: "搜索蓝牙数目:",
            content: "获取蓝牙设备列表失败",
            showCancel: false,
          }); // 此处增加结束括号
        },
      });
    },
    //点击设备连接蓝牙
    connectTo(deviceId) {
      const that = this;
      uni.createBLEConnection({
        deviceId: deviceId,
        success(res) {
          uni.showModal({
            title: "连接设备成功:",
            content: `已连接设备ID：${deviceId}, 点击确认跳转`,
            showCancel: false,
            success: function (modalRes) {
              if (modalRes.confirm) {
                uni.navigateTo({
                  url: "/pages/user/detecting60s?deviceId=" + deviceId, // 修改为你的目标页面路径
                });
              }
            },
          });
        },
        fail(err) {
          console.error("连接设备失败", err);
          that.info = "连接失败";
          uni.showModal({
            title: "连接设备失败:",
            content: `未能成功连接设备ID：${deviceId}`,
            showCancel: false,
          });
        },
      });
    },
  },
};
</script>

<style scoped lang="css">
.mt-9 {
  margin-top: 18.75rpx;
}
.page {
  background-color: #f4f2fc;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
}
.group {
  padding: 245.83rpx 120.83rpx 237.5rpx 141.67rpx;
  overflow-y: auto;
}
.text_2 {
  color: #000000;
  font-size: 50rpx;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 47.21rpx;
  letter-spacing: 8.33rpx;
}
.section_5 {
  margin: 66.67rpx 45.83rpx 0 25rpx;
  background-color: #f4f2fc;
  box-shadow: 0rpx 8.33rpx 6.25rpx #0000002e;
  border-radius: 50%;
  height: 416.67rpx;
}
.section_6_1 {
  padding: 41.67rpx 0;
  background-color: #ffffff;
  box-shadow: 0rpx 8.33rpx 8.33rpx #00000040;
  border-radius: 50%;
  width: 208.33rpx;
}
.section_6_2 {
  padding: 41.67rpx 0;
  background-color: #ffbd53;
  box-shadow: 0rpx 8.33rpx 8.33rpx #00000040;
  border-radius: 50%;
  width: 208.33rpx;
}
.pos {
  position: absolute;
  left: 22.92rpx;
  top: 39.58rpx;
}
.image_5 {
  width: 83.33rpx;
  height: 83.33rpx;
}
.section_7_1 {
  padding: 37.5rpx 41.67rpx;
  background-color: #ffffff;
  box-shadow: 0rpx 8.33rpx 8.33rpx #00000040;
  border-radius: 50%;
}
.section_7_2 {
  padding: 37.5rpx 41.67rpx;
  background-color: #ffd490;
  box-shadow: 0rpx 8.33rpx 8.33rpx #00000040;
  border-radius: 50%;
}
.pos_2 {
  position: absolute;
  right: 8.33rpx;
  top: 79.17rpx;
}
.image_6 {
  margin-left: 8.33rpx;
  width: 72.92rpx;
  height: 72.92rpx;
}
.font {
  font-size: 20.83rpx;
  font-family: ABeeZee;
  line-height: 19.54rpx;
  color: #979797;
}
.text_3 {
  font-size: 22.92rpx;
  line-height: 21.15rpx;
}
.text_4 {
  font-size: 22.92rpx;
  line-height: 21.29rpx;
}
.text-wrapper_1 {
  padding: 120.83rpx 0 33.33rpx;
  background-color: #ffffff;
  box-shadow: 0rpx 8.33rpx 8.33rpx #00000040;
  border-radius: 50%;
  width: 175rpx;
}
.text-wrapper_2 {
  padding: 120.83rpx 0 33.33rpx;
  background-color: #ffe5bd;
  box-shadow: 0rpx 8.33rpx 8.33rpx #00000040;
  border-radius: 50%;
  width: 175rpx;
}
.pos_4 {
  position: absolute;
  left: 50%;
  top: 233.33rpx;
  transform: translateX(-50%);
}
.text_5 {
  font-size: 22.92rpx;
  line-height: 21.38rpx;
}
.image_7 {
  width: 139.58rpx;
  height: 152.08rpx;
}
.pos_3 {
  position: absolute;
  left: 50%;
  bottom: 41.67rpx;
  transform: translateX(-50%);
}
.text_6 {
  margin-top: 58.33rpx;
  color: #979797;
  font-size: 33.33rpx;
  font-family: ABeeZee;
  line-height: 31rpx;
}
.text_7 {
  margin-top: 141.67rpx;
  color: #000000;
  font-size: 100rpx;
  font-family: ABeeZee;
  line-height: 72.4rpx;
  letter-spacing: 8.33rpx;
}
.tab-bar {
  padding: 35.42rpx 0;
  background-color: #ffffff;
  box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
  backdrop-filter: blur(0rpx);
}
.section_8 {
  flex: 1 1 188rpx;
  padding: 16.67rpx 0 8.33rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.image_8 {
  width: 54rpx;
  height: 54rpx;
}
.section_9 {
  padding: 8.33rpx 0;
  flex: 1 1 188rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.font_2 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 19.54rpx;
  color: #a6a9b2;
}
.text_10 {
  line-height: 19.13rpx;
}
.text_9 {
  color: #7451ff;
}
.text_8 {
  line-height: 19.21rpx;
}
.text_11 {
  line-height: 19.29rpx;
}
</style>
