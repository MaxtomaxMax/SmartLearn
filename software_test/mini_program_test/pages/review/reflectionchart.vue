<template>
    <view class="flex-col page" :style="{ width: containerWidth, height: containerHeight}">
		<view class="flex-row justify-center title-container">
			<text class="title-text">智学系统数据统计</text>
		</view>
        <view class="tabs">
            <view
                @click="a('week')"
                :class="['tab', activeTab === 'week' ? 'active' : '']"
            >
                周
            </view>
            <view
                @click="a('month')"
                :class="['tab', activeTab === 'month' ? 'active' : '']"
            >
                月
            </view>
            <view
                @click="a('year')"
                :class="['tab', activeTab === 'year' ? 'active' : '']"
            >
                年
            </view>
            <view
                @click="a('total')"
                :class="['tab', activeTab === 'total' ? 'active' : '']"
            >
                总
            </view>
        </view>
        <canvas
            canvas-id="iCNaOsBiQOyeQimNgKXrtNkyqEaHNQww"
            id="iCNaOsBiQOyeQimNgKXrtNkyqEaHNQww"
            class="charts"
            @touchend="tap"
        />
    </view>
</template>

<script>
import uCharts from "@/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js";
var uChartsInstance = {};
export default {
    data() {
        return {
			containerWidth: '0px',
			containerHeight: '0px',
			
            activeTab: "week",
            cWidth: 750,
            cHeight: 500,
            chartData: {
                week: {
                    type: "column",
                    categories: ["一", "二", "三", "四", "五", "六", "日"],
                    series: [
                        {
                            name: "正常学习时间",
                            data: [4, 5, 3, 6, 7, 4, 2],
                            color: "#ffb238",
                        },
                        {
                            name: "高压学习时间",
                            data: [1, 1, 1, 1, 1, 1, 1],
                            color: "#7451ff",
                        },
                    ],
                },
                month: {
                    type: "line",
                    categories: [
                        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", 
                        "20", "21", "22", "23", "24", "25", "26", "27", "28",
                        "29", "30", "31"
                    ],
                    series: [
                        {
                            name: "学习时间",
                            data: [
                                12, 5, 7, 2, 9, 4, 2, 5, 10, 6, 4, 6, 2, 11, 7,
                                9, 2, 6, 0, 6, 5, 7, 3, 8
                            ],
                            color: "#7451ff",
                        },
                    ],
                },
                year: {
                    type: "line",
                    categories: [
                        "一月", "二月", "三月", "四月", "五月", "六月", "七月", 
                        "八月", "九月", "十月", "十一月", "十二月"
                    ],
                    series: [
                        {
                            name: "学习时间",
                            data: [5, 10, 13, 10, 10, 16, 10, 8, 10, 10, 3, 10],
                            color: "#7451ff",
                        },
                    ],
                },
                total: {
                    type: "bar",
                    categories: ["2018", "2019", "2020", "2021", "2022"],
                    series: [
                        {
                            name: "高压学习时间",
                            data: [245, 540, 816, 224, 92],
                            color: "#7451ff",
                        },
                    ],
                },
            },
        };
    },
    onReady() {
        this.cWidth = uni.upx2px(750);
        this.cHeight = uni.upx2px(500);
        this.drawChartscolumn(
            "iCNaOsBiQOyeQimNgKXrtNkyqEaHNQww",
            this.chartData.week
        );
    },
	onLoad() {
		// 获取屏幕高度
		this.setContainerSize();
		
		// 获取用户ID
		this.userId = uni.getStorageSync("user_id");
	},
    methods: {
		setContainerSize() {
			try {
				const res = uni.getSystemInfoSync();
				console.log(res);
				const screenWidth = res.screenWidth;
				// 屏幕高度要前去头部
				// #ifdef MP-WEIXIN
				const screenHeight = res.screenHeight - res.screenTop;
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
        a(i) {
            if (this.activeTab == i) {
                return;
            }
            this.activeTab = i;
            if (this.activeTab == "week") {
                this.drawChartscolumn(
                    "iCNaOsBiQOyeQimNgKXrtNkyqEaHNQww",
                    this.chartData.week
                );
            } else if (this.activeTab == "total") {
                this.drawChartsBar(
                    "iCNaOsBiQOyeQimNgKXrtNkyqEaHNQww",
                    this.chartData[i]
                );
            } else {
				// 年和月都是用折线图
                this.drawChartsLine(
                    "iCNaOsBiQOyeQimNgKXrtNkyqEaHNQww",
                    this.chartData[i]
                );
            }
        },
        drawChartsBar(id, data) {
            const ctx = uni.createCanvasContext(id, this);
            uChartsInstance[id] = new uCharts({
                type: "column",
                context: ctx,
                width: this.cWidth,
                height: this.cHeight,
                categories: data.categories,
                series: data.series,
                animation: true,
                background: "#FFFFFF",
                color: [
                    "#FAC858", "#EE6666", "#FAC858", "#EE6666", "#73C0DE",
                    "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"
                ],
                padding: [15, 15, 0, 5],
                enableScroll: false,
                legend: {},
                xAxis: {
                    disableGrid: true,
                },
                yAxis: {
                    data: [
                        {
                            min: 0,
                        },
                    ],
                },
                extra: {
                    column: {
                        type: "group",
                        width: 30,
                        activeBgColor: "#000000",
                        activeBgOpacity: 0.08,
                        linearType: "custom",
                        seriesGap: 5,
                        linearOpacity: 0.5,
                        barBorderCircle: true,
                        customColor: ["#FA7D8D", "#EB88E2"],
                    },
                },
            });
        },
        // getServerData() {
        //     setTimeout(() => {
        //         let res = {
        //             type: "line",
        //             categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        //             series: [
        //                 {
        //                     name: "学习时间",
        //                     data: [12, 5, 7, 2, 9, 4, 2, 5, 10, 6],
        //                     color: "#7451ff",
        //                 },
        //             ],
        //         };
        //         this.drawChartsLine("iCNaOsBiQOyeQimNgKXrtNkyqEaHNQww", res);
        //     }, 500);
        // },
        drawChartsLine(id, data) {
            const ctx = uni.createCanvasContext(id, this);
            uChartsInstance[id] = new uCharts({
                type: "line",
                context: ctx,
                width: this.cWidth,
                height: this.cHeight,
                categories: data.categories,
                series: data.series,
                animation: true,
                background: "#FFFFFF",
                color: [
                    "#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE",
                    "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"
                ],
                padding: [15, 10, 0, 15],
                enableScroll: false,
                legend: {},
                xAxis: {
                    disableGrid: true,
					fontSize: 10,
                },
                yAxis: {
                    gridType: "dash",
                    dashLength: 2,
                },
                extra: {
                    line: {
                        type: "straight",
                        width: 2,
                        activeType: "hollow",
                    },
                },
            });
        },
        drawChartscolumn(id, data) {
            const ctx = uni.createCanvasContext(id, this);
            uChartsInstance[id] = new uCharts({
                type: "column",
                context: ctx,
                width: this.cWidth,
                height: this.cHeight,
                categories: data.categories,
                series: data.series,
                barBorderCircle: true,
                animation: true,
                background: "#FFFFFF",
                color: [
                    "#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE",
                    "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"
                ],
                padding: [15, 15, 0, 5],
                enableScroll: false,
                legend: {},
                xAxis: {
                    disableGrid: true,
                },
                yAxis: {
                    data: [
                        {
                            min: 0,
                        },
                    ],
                },
                extra: {
                    column: {
                        type: "stack",
                        width: 30,
                        barBorderCircle: true,
                    },
                },
            });
        },
        tap(e) {
            uChartsInstance[e.target.id].touchLegend(e);
            uChartsInstance[e.target.id].showToolTip(e);
        },
    },
};
</script>

<style scoped lang="css">
.title-container{
	margin-bottom: 30rpx;
}
.title-text{
	font-size: 50rpx;
}
.charts {
    width: 750rpx;
    height: 500rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
}

.chart-container {
    width: 100%;
    height: 100px;
}

.page {
    background-color: #f4f2fc;
    width: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
	padding: 30rpx 0rpx;
}

.tabs {
    display: flex;
    justify-content: space-around;
    background-color: #f2f2f2e6;
    padding: 8px;
    border-radius: 16px;
    box-shadow: 0px 2px 6px #00000040;
    margin-bottom: 20rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
}

.tab {
    flex: 1;
    text-align: center;
    padding: 8px 0;
    border-radius: 16px;
    font-size: 10px;
    color: #666;
}

.tab.active {
    background-color: #fff;
    font-size: 11px;
    color: #000;
}

.group {
    padding: 37.5rpx 41.67rpx 16.67rpx;
    overflow-y: auto;
}



.text-wrapper {
    padding: 8.33rpx 0;
    flex: 1 1 133.33rpx;
    background-color: #ffffff;
    border-radius: 83.33rpx;
    height: 33.33rpx;
}

.view {
    margin-left: 27.08rpx;
}
.font {
    font-size: 20.83rpx;
    font-family: SF Pro Text;
    line-height: 19.25rpx;
    color: #000000;
}
.text_2 {
    line-height: 18.27rpx;
}

.pos {
    position: absolute;
    left: 184.65rpx;
    right: 311.46rpx;
    top: 0;
}
</style>
