<template>
    <view class="flex-col page" :style="{ width: containerWidth, height: containerHeight}">
        <!-- Header -->
        <view class="flex-row header">
            <view class="flex-row header-title justify-center">
				<view class="flex-col backButton-container justify-center" @click="goBack">
				    <image
				        class="backButton"
				        src="../../static/ui_icon/exit.png"
				    />
				</view>
                <text class="header-main-title">监测记录</text>
            </view>
        </view>
        <!-- List -->
        <view class="record-list">
            <view v-for="(record, index) in records" :key="index" class="record-item">
                <view class="flex-row align-center index-container">
                    <text class="index-label">{{ index === 0 ? "new" : index }}</text>
                </view>
				<view class="flex-row align-center pressureValue-container">
					<text class="value-label">{{ record.value }}%</text>
				</view>
				
                <view class="flex-row align-center">
                    <text class="duration-label">净时长: {{ record.duration }}&nbsp&nbsp</text>
                    <text class="efficiency-label">效率: {{ record.efficiency }}%</text>
                </view>
                <image
                    class="more-icon"
                    src="../../static/ui_icon/load_more.png"
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
			containerWidth: '0px',
			containerHeight: '0px',
			
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
	onLoad() {
		// 获得屏幕信息
		this.setContainerSize();
	},
    methods: {
		setContainerSize() {
			try {
				const res = uni.getSystemInfoSync();
				console.log(res);
				const screenWidth = res.screenWidth;
				// 屏幕高度要前去头部
				// #ifdef MP-WEIXIN
				const screenHeight = res.windowHeight;
				// #endif
				// #ifdef H5
				const screenHeight = res.windowHeight;
				// #endif
		
				// 确认获取到了正确的宽度和高度
				if (screenWidth && screenHeight) {
					this.containerWidth = `${screenWidth}px`;
					this.containerHeight = `${screenHeight}px`;
				} else {
					console.error('获取 screenWidth 或 screenHeight 失败');
				}
			} catch (err) {
				console.error('获取系统信息失败', err);
			}
		},
        //待补充，使用uni.cloud将检测记录添加到records
    },
};
</script>

<style scoped lang="css">
.index-container{
	width: 60rpx;
	justify-content: center;
}
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
    padding: 16rpx;
    /* background-color: #fff; */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.backButton-container {
    position: absolute;
	left: 30rpx;
	top: 30rpx;
}
.backButton {
	width: 40rpx;
    height: 40rpx;
}
.header-title {
    flex: 1;
}
.header-main-title {
    font-size: 50rpx;
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
    padding: 20rpx 40rpx;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
}
.record-item.flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.index-label {
    color: purple;
}
.value-label {
    font-size: 35rpx;
}
.duration-label,
.efficiency-label {
    font-size: 25rpx;
    color: #666;
}
.more-icon {
    width: 24px;
    height: 24px;
}
</style>
