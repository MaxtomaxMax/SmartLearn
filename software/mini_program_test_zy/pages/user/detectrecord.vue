<template>
  <view class="flex-col page">
    <!-- Header -->
    <view class="flex-row header">
      <view class="back-button" @click="goBack">
        <image
          class="back-icon"
          src="https://ide.code.fun/api/image?token=66438f237a1eb60011e6a7bf&name=82b5708c739735183862d8b42997758f.png"
        />
      </view>
      <view class="flex-col header-title">
        <text class="header-main-title">监测记录</text>
        <text class="header-subtitle">第一列压力值</text>
      </view>
    </view>
    <!-- List -->
    <view class="record-list">
      <view v-for="(record, index) in records" :key="index" class="record-item">
        <view class="flex-row align-center">
          <text class="index-label">{{ index === 0 ? "new" : index }}</text>
          <text class="value-label">{{ record.value }}%</text>
        </view>
        <view class="flex-row align-center">
          <text class="duration-label">净时长: {{ record.duration }}</text>
          <text class="efficiency-label">效率: {{ record.efficiency }}%</text>
        </view>
        <image
          class="more-icon"
          src="https://ide.code.fun/api/image?token=66438f237a1eb60011e6a7bf&name=82b5708c739735183862d8b42997758f.png"
        />
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
      records: [
        //默认测试数据
        { value: 54, duration: "01:54:43", efficiency: 73 },
        { value: 22, duration: "02:14:33", efficiency: 66 },
      ],
    };
  },
  mounted() {
    this.fetchRecords();
  },

  methods: {
    //待补充，使用uni.cloud将检测记录添加到records
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
  height: 100vh;
}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.back-button {
  margin-right: 16px;
}
.back-icon {
  width: 24px;
  height: 24px;
}
.header-title {
  flex: 1;
}
.header-main-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
.header-subtitle {
  font-size: 14px;
  color: #666;
}
.record-list {
  display: flex;
  flex-direction: column;
}
.record-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
}
.record-item .flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.index-label {
  color: purple;
  margin-right: 10px;
}
.value-label {
  font-size: 18px;
  margin-right: 16px;
  width: 50px; /* Ensure consistent width */
}
.duration-label,
.efficiency-label {
  font-size: 14px;
  color: #666;
}
.more-icon {
  width: 24px;
  height: 24px;
}
</style>
