<template>
  <view class="flex-col page">
    <view class="flex-col flex-1 group">
      <view class="shrink-0 section_5"></view>
      <view class="flex-col relative group_2 view">
        <view class="flex-col section_6">
          <image
            class="self-center image_5"
            src="https://ide.code.fun/api/image?token=66475f8d7a1eb60011e75c52&name=f5ffa1faad1f2da2b07b17a3fe1e5e09.png"
          />
          <view class="flex-col self-stretch mt-29">
            <text class="self-center text_2" @click="startTimer">GO!</text>

            <view class="flex-col self-stretch section_7 mt-29">
              <view class="flex-row items-center">
                <image
                  class="image_3"
                  src="https://ide.code.fun/api/image?token=66475f8d7a1eb60011e75c52&name=2f75093c4bd58121ca74137af03f707a.png"
                />
                <text class="font text_4 ml-5">蓝牙调试</text>
              </view>
              <view class="mt-10 grid">
                <view
                  class="flex-col justify-start items-center relative grid-item"
                >
                  <button class="font_2" @click="getservice">
                    获取蓝牙服务
                  </button>
                </view>
                <view
                  class="flex-col justify-start items-center relative grid-item"
                >
                  <button class="font_2" @click="getcharacteristics">
                    获取蓝牙特征值
                  </button>
                </view>
                <view
                  class="flex-col justify-start items-center relative grid-item"
                >
                  <button class="font_2" @click="charIdchange">
                    监听特征值变化
                  </button>
                </view>
                <view
                  class="flex-col justify-start items-center relative grid-item"
                >
                  <button class="font_2" @click="closeBluetooth">
                    关闭蓝牙
                  </button>
                </view>
              </view>
            </view>
            <view class="flex-col self-stretch section_7 mt-29">
              <view class="mt-10 grid">
                <view
                  class="flex-col justify-start items-center relative grid-item"
                >
                  <button class="font_2" @click="startTimer">开始学习</button>
                </view>
                <view
                  class="flex-col justify-start items-center relative grid-item"
                >
                  <button class="font_2" @click="stopTimer">暂停计时</button>
                </view>
                <view
                  class="flex-col justify-start items-center relative grid-item"
                >
                  <button class="font_2" @click="continueTimer">
                    继续学习
                  </button>
                </view>
                <view
                  class="flex-col justify-start items-center relative grid-item"
                >
                  <button class="font_2" @click="endTimer">结束学习</button>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="flex-col section_8">
          <view class="flex-row self-stretch">
            <image
              class="image_6"
              src="https://ide.code.fun/api/image?token=66475f8d7a1eb60011e75c52&name=3f4f714be92303b7275da786dd1e503a.png"
            />
            <text class="font text_5 ml-5">总计时</text>
          </view>
          <text class="mt-14 self-center text_6">{{ formattedTime }}</text>
        </view>
        <view class="flex-col section_9">
          <view class="flex-row group_3">
            <image
              class="image_6"
              src="https://ide.code.fun/api/image?token=66475f8d7a1eb60011e75c52&name=ab42ff36dd4bc9d14c16d4c238b461fe.png"
            />
            <text class="ml-4 font text_7">压力值</text>
          </view>
          <view class="flex-row group_4">
            <image
              class="image_7"
              src="https://ide.code.fun/api/image?token=66475f8d7a1eb60011e75c52&name=4c928d9c835db657f8bc8f954d32939e.png"
            />
            <text class="font_3 ml-7">心跳</text>
          </view>
          <image
            class="image_8"
            src="https://ide.code.fun/api/image?token=66475f8d7a1eb60011e75c52&name=4949f360447ba2c58b172a376744187b.png"
          />
          <view class="flex-row group_2 view_2">
            <image
              class="image_7"
              src="https://ide.code.fun/api/image?token=66475f8d7a1eb60011e75c52&name=29da009d84905e7c9f611644cff52e51.png"
            />
            <text class="font_3 text_8 ml-7">HRV指标</text>
          </view>
          <view class="flex-row equal-division">
            <view class="flex-col section_10 equal-division-item">
              <text class="self-start font_4">SDNN</text>
              <text class="mt-20 self-center font_5">{{ SDNNnum }}</text>
            </view>
            <view class="ml-14 flex-col section_10 equal-division-item">
              <text class="self-start font_4">RMSSD</text>
              <text class="mt-20 self-center font_5">{{ RMSSDnum }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      connectedDeviceId: "",
      serviceId: "", // 假设你已知需要监听的服务ID
      services: [],
      characteristics: [],
      characteristicId: "", // 假设你已知需要监听的特征ID
      timer: null,
      elapsedTime: 0,
      allLearnTime: 0, // 存储单次学习时间，xxxx秒，供数据库调用
      SDNNnum: 19,
      RMSSDnum: 229,
      receivedData: "",
    };
  },
  onLoad(options) {
    if (options.deviceId) {
      this.connectedDeviceId = options.deviceId;
      uni.showModal({
        title: "蓝牙已连接:",
        content: `连接蓝牙设备ID：${this.connectedDeviceId}`,
        showCancel: false,
      });
    } else {
      console.error("No device ID passed to page");
      uni.showModal({
        title: "蓝牙未连接成功:",
        content: "未接收到设备ID，无法连接蓝牙设备",
        showCancel: false,
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
        Math.floor((this.elapsedTime % 3600) / 60)
      ).padStart(2, "0");
      const seconds = String(this.elapsedTime % 60).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    },
  },
  methods: {
    getservice() {
      const that = this;
      uni.getBLEDeviceServices({
        deviceId: that.connectedDeviceId, // 在 uni-app 中通常不需要使用 `data` 属性
        success: function (res) {
          console.log(res.services);
          let serviceIds = res.services.map((service) => service.uuid);

          that.services = res.services; // 直接更新响应式数据
          uni.showModal({
            title: "获取服务成功:",
            content: `服务列表：${JSON.stringify(that.services)}`,
            showCancel: false,
          });
        },
        fail: function (err) {
          that.info = "获取设备服务失败！" + err.message; // `errMsg` 变成 `message` 在某些平台
          uni.showModal({
            title: "获取服务失败:",
            content: `服务列表：${JSON.stringify(that.services)}`,
            showCancel: false,
          });
        },
      });
    },
    //获取特征值
    getcharacteristics() {
      const that = this;
      if (that.services.length > 0) {
        let myuuid = that.services[0].uuid; //服务数组第一项服务的uuid
        uni.getBLEDeviceCharacteristics({
          deviceId: that.connectedDeviceId,
          serviceId: myuuid,
          success: function (res) {
            console.log(res.characteristics);
            that.characteristics = res.characteristics.map((chr) => ({
              uuid: chr.uuid,
              notify: chr.properties.notify,
              write: chr.properties.write,
              read: chr.properties.read,
            }));
            uni.showModal({
              title: "获取特征值成功:",
              content: `特征值列表：${JSON.stringify(that.characteristics)}`,
              showCancel: false,
            });
          },
          fail: function (err) {
            that.info = "特征值获取失败" + err.message;
            uni.showModal({
              title: "获取特征值失败:",
              content: `未能成功获取服务特征值！`,
              showCancel: false,
            });
          },
        });
      } else {
        that.info = "无可用服务";
      }
    },

    //监听特征值变化
    charIdchange() {
      const that = this;

      if (
        !that.connectedDeviceId ||
        !that.services.length ||
        !that.characteristics
      ) {
        uni.showModal({
          title: "错误",
          content: "设备未连接或服务特征未准备好",
          showCancel: false,
        });
        return;
      }
      const serviceId = that.services[0].uuid;
      const characteristicId = that.characteristics[1].uuid;
      uni.notifyBLECharacteristicValueChange({
        state: true,
        deviceId: this.connectedDeviceId, // 使用已保存的设备ID
        serviceId: serviceId, // 假设你已经定义并初始化了 serviceId 数组
        characteristicId: characteristicId, // 假设你已经定义并初始化了 characteristicId 数组
        success: function (res) {
          console.log("notifyBLECharacteristicValueChange success");
          that.info = "成功";
          uni.showModal({
            title: "监听特征值变化:",
            content: `成功设置监听特征值变化！`,
            showCancel: false,
          });
        },
        fail: function (err) {
          that.info = "失败：" + err.message; // 注意uni-app在某些平台上错误对象的属性可能是message
          uni.showModal({
            title: "监听特征值变化:",
            content: `未成功设置监听特征值变化！错误信息：${err.errMsg}`,
            showCancel: false,
          });
        },
      });

      // 函数将 ArrayBuffer 转换为十六进制字符串
      function ab2hex(buffer) {
        var hexArr = Array.prototype.map.call(
          new Uint8Array(buffer),
          function (bit) {
            return ("00" + bit.toString(16)).slice(-2);
          }
        );
        return hexArr.join("");
      }

      // 监听特征值变化
      uni.onBLECharacteristicValueChange(function (res) {
        that.receivedData = ab2hex(res.value);
        uni.showModal({
          title: "接收到数据:",
          content: `16进制数据为：${that.receivedData}`,
          showCancel: false,
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
      }, 1000);
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
        }, 1000);
      }
    },
    endTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.allLearnTime = this.elapsedTime;
      this.elapsedTime = 0;
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    // 清理蓝牙连接和监听器
    uni.offBLECharacteristicValueChange();
    if (this.isBluetoothAdapter) {
      uni.closeBluetoothAdapter();
    }
  },
};
</script>

<style scoped lang="css">
.mt-29 {
  margin-top: 60.42rpx;
}
.ml-5 {
  margin-left: 10.42rpx;
}
.ml-7 {
  margin-left: 14.58rpx;
}
.page {
  background-color: #f4f2fc;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.image_3 {
  width: 37.5rpx;
  height: 37.5rpx;
}
.group {
  overflow-y: auto;
}
.section_5 {
  background-color: #d9d9d900;
  height: 141.67rpx;
}
.group_2 {
  padding: 0 22.92rpx;
}
.view {
  margin-top: -83.33rpx;
}
.section_6 {
  padding: 12.5rpx 18.75rpx 27.08rpx;
  background-color: #d9d9d900;
}
.image_5 {
  border-radius: 10.42rpx;
  width: 127.08rpx;
  height: 27.08rpx;
}
.text_3 {
  color: #000000;
  font-size: 75rpx;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 55.65rpx;
  letter-spacing: 8.33rpx;
}
.section_7 {
  padding: 25rpx 12.5rpx;
  background-color: #ffffff;
  border-radius: 25rpx;
}
.grid {
  margin: 0 12.5rpx;
  height: 100rpx;
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-columns: repeat(2, minmax(0, 1fr));
  row-gap: 18.67rpx;
  column-gap: 18.67rpx;
}
.grid-item {
  padding: 12.5rpx 0;
  background-color: #ffffff;
  border-radius: 8.33rpx;
  box-shadow: 0rpx 4.17rpx 4.17rpx #00000040;
}
.section_8 {
  margin: 0 18.75rpx;
  padding: 25rpx 16.67rpx 41.67rpx;
  background-color: #ffffff;
  border-radius: 25rpx;
}
.image_6 {
  width: 33.33rpx;
  height: 33.33rpx;
}
.text_6 {
  color: #000000;
  font-size: 66.67rpx;
  font-family: ABeeZee;
  line-height: 48.27rpx;
}
.section_9 {
  margin: 25rpx 18.75rpx 0;
  padding: 25rpx 0 12.5rpx;
  background-color: #ffffff;
  border-radius: 25rpx 25rpx 0 0;
}
.group_3 {
  padding: 0 16.67rpx;
}
.font {
  font-size: 33.33rpx;
  font-family: PingFang SC;
  line-height: 30.83rpx;
  color: #000000;
}
.text_5 {
  line-height: 31rpx;
}
.text_4 {
  line-height: 30.71rpx;
}
.text_7 {
  line-height: 30.77rpx;
}
.group_4 {
  margin-top: 27.08rpx;
  padding: 0 20.83rpx;
}
.image_7 {
  width: 25rpx;
  height: 25rpx;
}
.font_3 {
  font-size: 25rpx;
  font-family: PingFang SC;
  line-height: 22.98rpx;
  color: #000000;
}
.image_8 {
  margin-top: 22.92rpx;
  width: 666.67rpx;
  height: 191.67rpx;
}
.view_2 {
  margin-top: 22.92rpx;
}
.text_8 {
  line-height: 22.85rpx;
}
.equal-division {
  margin: 22.92rpx 22.92rpx 0;
}
.font_4 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 15.46rpx;
  color: #000000;
}
.font_5 {
  font-size: 66.67rpx;
  font-family: PingFang SC;
  line-height: 49.46rpx;
  color: #000000;
}
.section_10 {
  flex: 1 1 295.83rpx;
}
.equal-division-item {
  padding: 25rpx 16.67rpx 66.67rpx;
  background-color: #ffeacc;
  border-radius: 25rpx;
  height: 195.83rpx;
}
.tab-bar {
  padding: 35.42rpx 0;
  background-color: #ffffff;
  box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
  backdrop-filter: blur(0rpx);
}
.section_11 {
  flex: 1 1 188rpx;
  padding: 16.67rpx 0 8.33rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.image_9 {
  width: 54rpx;
  height: 54rpx;
}
.font_2 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 19.29rpx;
  color: #000000;
}
.text_10 {
  color: #7451ff;
  line-height: 19.54rpx;
}
.section_12 {
  padding: 8.33rpx 0;
  flex: 1 1 188rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.font_6 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 19.29rpx;
  color: #a6a9b2;
}
.text_11 {
  line-height: 19.13rpx;
}
.text_9 {
  line-height: 19.21rpx;
}
</style>
