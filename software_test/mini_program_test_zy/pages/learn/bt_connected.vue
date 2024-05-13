<template>
  <view class="flex-col page">
    <view> </view>
    <!-- 获取服务与特征值，监听蓝牙特征值变化获取数据交互 -->
    <button class="self-center button" @click="getservice">获取设备服务</button>
    <button class="self-center button" @click="getcharacteristics">
      获取连接设备特征值
    </button>
    <button class="self-center button" @click="charIdchange">
      监听蓝牙特征值变化
    </button>

    <view class="flex-col flex-1 group">
      <text class="self-center text">设备已配对</text>
      <view class="flex-col items-start self-stretch section">
        <text class="font">READY</text>
        <text class="mt-8 font text_1">？</text>
      </view>
      <text class="self-center text_2">点击开始计时</text>
      <text class="self-center text_3">00:00:00</text>
    </view>
    <view class="flex-row tab-bar">
      <view class="flex-col items-center section_1">
        <image
          class="image_2"
          src="https://ide.code.fun/api/image?token=663e5372d578370011c704fb&name=c27e47588fc51f198750cf896df6d092.png"
        />
        <text class="font_2 text_4">温故</text>
      </view>
      <view class="flex-col items-center section_2">
        <image
          class="image_2"
          src="https://ide.code.fun/api/image?token=663e5372d578370011c704fb&name=95939757903d5fea0ce0279fd67d3926.png"
        />
        <text class="mt-2 font_2 text_5">知新</text>
      </view>
      <view class="flex-col items-center section_4">
        <image
          class="image_2"
          src="https://ide.code.fun/api/image?token=663e5372d578370011c704fb&name=199555151d0ab2676d0571f82052a737.png"
        />
        <text class="font_2 text_6">三省</text>
      </view>
      <view class="flex-col items-center section_3">
        <image
          class="image_2"
          src="https://ide.code.fun/api/image?token=663e5372d578370011c704fb&name=086346215073334eefa1a267175b8d92.png"
        />
        <text class="mt-6 font_2">吾身</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      connectedDeviceId: "",
      serviceId: "", // 假设你已知需要监听的服务ID
      services: [],
      characteristics: [],
      characteristicId: "", // 假设你已知需要监听的特征ID
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

  methods: {
    //获取设备服务,服务列表存放在services数组中
    getservice() {
      const that = this;
      uni.getBLEDeviceServices({
        deviceId: that.connectedDeviceId, // 在 uni-app 中通常不需要使用 `data` 属性
        success: function (res) {
          console.log(res.services);
          let serviceIds = res.services.map((service) => service.uuid);
          console.log(serviceIds);
          that.services = res.services; // 直接更新响应式数据
          that.info = "获取服务成功！===" + JSON.stringify(res.services);
          uni.showModal({
            title: "获取服务成功:",
            content: `服务列表：${JSON.stringify(that.services)}`,
            showCancel: false,
          });
        },
        fail: function (err) {
          that.info = "获取设备服务失败！" + err.message; // `errMsg` 变成 `message` 在某些平台
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
            that.info =
              "获取特征值成功: " + JSON.stringify(that.characteristics);
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
        console.log("characteristic value changed:", ab2hex(res.value));
        that.info = "接收到的数据：" + ab2hex(res.value);
        uni.showModal({
          title: "接收到数据:",
          content: `16进制数据为：${ab2hex(res.value)}`,
          showCancel: false,
        });
      });
    },
  },
};
</script>

<style scoped lang="css">
.page {
  background-color: #f4f2fc;
  border-radius: 58.33rpx;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group {
  padding: 210.44rpx 120.52rpx 236.29rpx 141.98rpx;
  overflow-y: auto;
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
.text {
  color: #000000;
  font-size: 50rpx;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 47.21rpx;
  letter-spacing: 8.33rpx;
}
.section {
  margin: 65.29rpx 46.15rpx 0 24.69rpx;
  padding: 140.5rpx 55.77rpx 60.67rpx 71.31rpx;
  background-image: linear-gradient(180deg, #ffb238 0%, #ffeacc 100%);
  box-shadow: 0rpx 8.33rpx 6.25rpx #0000002e;
  border-radius: 50%;
}
.font {
  font-size: 83.33rpx;
  font-family: PingFang SC;
  line-height: 100rpx;
  font-weight: 600;
  color: #000000;
}
.text_1 {
  text-align: center;
}
.text_2 {
  margin-top: 57.42rpx;
  color: #979797;
  font-size: 33.33rpx;
  font-family: ABeeZee;
  line-height: 30.79rpx;
}
.text_3 {
  margin-top: 142.67rpx;
  color: #000000;
  font-size: 100rpx;
  font-family: ABeeZee;
  line-height: 72.4rpx;
  letter-spacing: 8.33rpx;
}
.tab-bar {
  padding: 35.42rpx 0 35.42rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
  backdrop-filter: blur(0rpx);
}
.section_1 {
  padding: 16.75rpx 0 10.35rpx;
  flex: 1 1 188rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.image_2 {
  width: 54rpx;
  height: 54rpx;
}
.section_2 {
  padding: 14.67rpx 0 10.27rpx;
  flex: 1 1 188rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.section_4 {
  padding: 16.75rpx 0 10.44rpx;
  flex: 1 1 188rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.section_3 {
  padding: 6.33rpx 0 10.38rpx;
  flex: 1 1 188rpx;
  background-color: #ffffff;
  border-radius: 58.33rpx;
  overflow: hidden;
  height: 102.08rpx;
}
.font_2 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 19.29rpx;
  color: #a6a9b2;
}
.text_6 {
  line-height: 19.13rpx;
}
.text_5 {
  color: #7451ff;
  line-height: 19.54rpx;
}
.text_4 {
  line-height: 19.21rpx;
}
</style>
