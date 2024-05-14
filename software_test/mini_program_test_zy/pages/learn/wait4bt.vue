<template>
  <view class="flex-col page">
    <view class="flex-col flex-1 group">
      <button class="self-center button" @click="openBluetoothAdapter">
        打开蓝牙适配器
      </button>

      <!-- 搜索蓝牙设备按钮 -->
      <button class="self-center button" @click="searchBluetoothDevices">
        开始搜索蓝牙设备
      </button>

      <!-- 示例的第二个搜索按钮，可以按需删除或更改 -->
      <button class="self-center button" @click="closeDiscovery">
        结束搜索蓝牙设备
      </button>

      <view
        class="flex-col justify-start items-center self-center image-wrapper"
      >
        <image
          class="image_2"
          src="https://ide.code.fun/api/image?token=663e5372d578370011c704fb&name=a559292b52c6d5675a881601d876b37a.png"
        />
      </view>
      <view class="blank"> </view>

      <button class="self-center button" @click="connectBluetooth">
        点击连接蓝牙
      </button>
      <scroll-view class="device-list" scroll-y="true" style="height: 300px">
        <block v-for="(device, index) in devices" :key="device.deviceId">
          <button @tap="connectTo(device.deviceId)">{{ device.name }}</button>
        </block>
      </scroll-view>
      <!--在page。json单独设计tabBar，每个页面的这一part均可省略-->
      <!--<view class="flex-row equal-division section tabbar">
                <view class="flex-col items-center section_2 equal-division-item">
                    <image
                        class="shrink-0 image_3"
                        src="https://ide.code.fun/api/image?token=663e5372d578370011c704fb&name=3807e5ce846f1a122c99fa99f0f2ff32.png"
                    />
                    <text class="font text_4">温故</text>
                </view>
                <view class="flex-col items-center section_2 equal-division-item">
                    <image
                        class="shrink-0 image_4"
                        src="https://ide.code.fun/api/image?token=663e5372d578370011c704fb&name=447c9226d59ea4dd46e7f54fb27260b4.png"
                    />
                    <text class="font text_5">知新</text>
                </view>
                <view class="flex-col items-center section_2 equal-division-item">
                    <image
                        class="shrink-0 image_5"
                        src="https://ide.code.fun/api/image?token=663e5372d578370011c704fb&name=a28466b963e1bce1c140eaa66dfc8c13.png"
                    />
                    <text class="font text_6">三省</text>
                </view>
                <view class="flex-col items-center section_2 equal-division-item">
                    <image
                        class="shrink-0 image_3"
                        src="https://ide.code.fun/api/image?token=663e5372d578370011c704fb&name=248a963a79e2bce3d28e2766eede344f.png"
                    />
                    <text class="font mt-3">吾身</text>
                </view>
            </view>-->
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      info: "",
      devices: [],
      services: [],
    };
  },
  methods: {
    //打开蓝牙适配器
    openBluetoothAdapter() {
      const that = this;
      uni.openBluetoothAdapter({
        success(res) {
          console.log("初始化蓝牙适配器成功", JSON.stringify(res));
          that.info = "初始化蓝牙适配器成功" + JSON.stringify(res);
          uni.showModal({
            title: "蓝牙适配情况",
            content: "初始化蓝牙适配器成功",
            showCancel: false,
          });
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
    },
    //搜索蓝牙设备
    searchBluetoothDevices() {
      const that = this;

      uni.startBluetoothDevicesDiscovery({
        success(res) {
          console.log("开始搜索蓝牙设备", res);
          that.info = "开始搜索蓝牙设备" + JSON.stringify(res);
          uni.showModal({
            title: "蓝牙搜索",
            content: "已成功开启蓝牙搜索",
            showCancel: false,
          });
        },
        fail(res) {
          console.log("搜索设备失败", JSON.stringify(res));
          that.info = "搜索设备失败" + JSON.stringify(res);
          uni.showModal({
            title: "蓝牙搜索",
            content: "未成功开启蓝牙搜索",
            showCancel: false,
          });
        },
      });
    },
    //结束蓝牙设备搜索
    closeDiscovery() {
      const that = this;
      uni.stopBluetoothDevicesDiscovery({
        success(res) {
          console.log(res);
          uni.showModal({
            title: "蓝牙搜索",
            content: "已成功关闭蓝牙搜索",
            showCancel: false,
          });
        },
        fail(res) {
          console.log(res, "fail");
          uni.showModal({
            title: "蓝牙搜索",
            content: "未成功关闭蓝牙搜索",
            showCancel: false,
          });
        },
      });
    },
    //点击连接蓝牙获取蓝牙设备信息
    connectBluetooth() {
      const that = this;
      uni.getBluetoothDevices({
        success(res) {
          that.devices = res.devices.map((device) => ({
            deviceId: device.deviceId,
            name: device.name || "未命名设备",
          }));
          that.info = "搜索到的蓝牙数目：" + res.devices.length;
          uni.showModal({
            title: "搜索蓝牙数目:",
            content: `找到 ${res.devices.length} 个蓝牙设备`,
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
          console.log("连接设备成功", res);
          that.info = "已连接设备ID：" + deviceId;
          uni.showModal({
            title: "连接设备成功:",
            content: `已连接设备ID：${deviceId}, 点击确认跳转`,
            showCancel: false,
            success: function (modalRes) {
              if (modalRes.confirm) {
                // 启动倒计时
                setTimeout(function () {
                  // 页面跳转
                  uni.navigateTo({
                    url: "/pages/learn/bt_connected?deviceId=" + deviceId, // 修改为你的目标页面路径
                  });
                }, 1000); // 倒计时3秒
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
.mt-3 {
  margin-top: 6.25rpx;
}
.page {
  background-color: #f4f2fc;
  border-radius: 58.33rpx;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.blank {
  width: 200px; /* 固定宽度 */
  height: 50px; /* 固定高度 */
}
.button {
  margin: 10px 0;
  padding: 10px;
  width: 200px; /* 固定宽度 */
  height: 50px; /* 固定高度 */
  background-color: #7451ff;
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
}
.group {
  padding-top: 220.83rpx;
  overflow-y: auto;
}
.text {
  color: #000000;
  font-size: 50rpx;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 47rpx;
  letter-spacing: 8.33rpx;
}
.image-wrapper {
  margin-top: 66.67rpx;
  padding: 125rpx 0;
  filter: drop-shadow(0rpx 8.33rpx 4.17rpx #00000040);
  background-color: #ffffff;
  box-shadow: 0rpx 8.33rpx 6.25rpx #0000002e;
  border-radius: 50%;
  width: 416.67rpx;
}
.image_2 {
  width: 165.42rpx;
  height: 146.67rpx;
}
.text_2 {
  margin-top: 58.33rpx;
  color: #979797;
  font-size: 33.33rpx;
  font-family: ABeeZee;
  line-height: 30.77rpx;
}
.text_3 {
  margin-top: 141.67rpx;
  color: #000000;
  font-size: 100rpx;
  font-family: ABeeZee;
  line-height: 72.4rpx;
  letter-spacing: 8.33rpx;
}
.equal-division {
  align-self: stretch;
  margin-top: 237.5rpx;
}
.section {
  padding: 35.42rpx 0;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
  backdrop-filter: blur(0rpx);
}
.section_2 {
  flex: 1 1 188rpx;
}
.equal-division-item {
  padding: 8.33rpx 0;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.image_3 {
  width: 66.67rpx;
  height: 66.67rpx;
}
.font {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 19.29rpx;
  color: #a6a9b2;
}
.text_4 {
  line-height: 19.21rpx;
}
.image_4 {
  filter: drop-shadow(0rpx 2.08rpx 3.13rpx #7451ff);
  width: 66.67rpx;
  height: 66.67rpx;
}
.text_5 {
  color: #7451ff;
  line-height: 19.54rpx;
}
.image_5 {
  border-radius: 8.33rpx;
  width: 66.67rpx;
  height: 66.67rpx;
}
.text_6 {
  line-height: 19.13rpx;
}
</style>
