<template>
  <view>
    <view class="tabs">
      <view
        @click="a('week')"
        :class="['tab', activeTab === 'week' ? 'active' : '']"
        >周</view
      >
      <view
        @click="a('month')"
        :class="['tab', activeTab === 'month' ? 'active' : '']"
        >月</view
      >
      <view
        @click="a('year')"
        :class="['tab', activeTab === 'year' ? 'active' : '']"
        >年</view
      >
      <view
        @click="a('total')"
        :class="['tab', activeTab === 'total' ? 'active' : '']"
        >总</view
      >
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
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31",
          ],
          series: [
            //{ name: '正常学习时间', data: [20, 25, 22, 30], color: '#ffb238' },
            {
              name: "学习时间",
              data: [
                12, 5, 7, 2, 9, 4, 2, 5, 10, 6, 4, 6, 2, 11, 7, 9, 2, 6, 0, 6,
                5, 7, 3, 8,
              ],
              color: "#7451ff",
            },
          ],
        },
        year: {
          type: "line",
          categories: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          series: [
            //{ name: '正常学习时间', data: [100, 120, 110, 150, 160, 130, 140, 170, 180, 190, 200, 210], color: '#ffb238' },
            {
              name: "学习时间",
              data: [5, 10, 13, 10, 10, 16, 10, 8, 10, 10, 3, 10],
              color: "#7451ff",
            },
          ],
        },
        total: {
          type: "line",
          categories: ["2018", "2019", "2020", "2021", "2022"],
          series: [
            // { name: '正常学习时间', data: [500, 600, 550, 700, 750], color: '#ffb238' },
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
    //这里的 750 对应 css .charts 的 width
    this.cWidth = uni.upx2px(750);
    //这里的 500 对应 css .charts 的 height
    this.cHeight = uni.upx2px(500);
    // this.getServerData();
    this.drawChartscolumn(
      "iCNaOsBiQOyeQimNgKXrtNkyqEaHNQww",
      this.chartData.week
    );
  },
  methods: {
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
        this.drawChartszhuzhaungtu(
          "iCNaOsBiQOyeQimNgKXrtNkyqEaHNQww",
          this.chartData[i]
        );
      } else {
        this.drawChartsLine(
          "iCNaOsBiQOyeQimNgKXrtNkyqEaHNQww",
          this.chartData[i]
        );
      }
    },
    drawChartszhuzhaungtu(id, data) {
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
          "#FAC858",
          "#EE6666",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc",
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
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          type: "line",
          categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          series: [
            //{ name: '正常学习时间', data: [20, 25, 22, 30], color: '#ffb238' },
            {
              name: "学习时间",
              data: [12, 5, 7, 2, 9, 4, 2, 5, 10, 6],
              color: "#7451ff",
            },
          ],
          // categories: ['一', '二', '三', '四', '五', '六', '日'],
          // 	          series: [
          // 	            { name: '正常学习时间', data: [4, 5, 3, 6, 7, 4, 2], color: '#ffb238' },
          // 	            { name: '高压学习时间', data: [1, 1, 1, 1, 1, 1, 1], color: '#7451ff' }
          // 	          ]
        };
        this.drawChartsLine("iCNaOsBiQOyeQimNgKXrtNkyqEaHNQww", res);
      }, 500);
    },
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
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc",
        ],
        padding: [15, 10, 0, 15],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true,
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
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc",
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
            // activeBgColor: "#000000",
            // activeBgOpacity: 0.08,
            // labelPosition: "center",
            barBorderCircle: true,
            // linearType: "custom"
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

<style scoped>
.charts {
  width: 750rpx;
  height: 500rpx;
}

.chart-container {
  width: 100%;
  height: 100px;
}

.mt-9 {
  margin-top: 18.75rpx;
}

.ml-3 {
  margin-left: 6.25rpx;
}

.ml-7 {
  margin-left: 14.58rpx;
}

.page {
  background-color: #f4f2fc;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
}

.tabs {
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: #f2f2f2e6;
  padding: 8px;
  border-radius: 16px;
  box-shadow: 0px 2px 6px #00000040;
  margin-bottom: 20rpx;
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

.section_5 {
  padding: 8.33rpx;
  background-color: #f2f2f2e6;
  border-radius: 83.33rpx;
  box-shadow: 0rpx 2.08rpx 6.25rpx #00000040;
}

.text-wrapper {
  padding: 8.33rpx 0;
  flex: 1 1 133.33rpx;
  background-color: #ffffff;
  border-radius: 83.33rpx;
  height: 33.33rpx;
}

.text-wrapper_2 {
  flex: 1 1 133.33rpx;
  padding: 8.33rpx 0;
  background-color: #ffffff00;
  border-radius: 83.33rpx;
  height: 33.33rpx;
}

.view {
  margin-left: 27.08rpx;
}

.view_2 {
  margin-left: 41.67rpx;
}

.view_3 {
  margin-left: 29.17rpx;
  margin-right: 18.75rpx;
}

.group_2 {
  padding: 0 41.67rpx;
}

.view_4 {
  margin-top: 50rpx;
}

.font_2 {
  font-size: 25rpx;
  font-family: SF Pro Text;
  line-height: 22.88rpx;
  color: #000000;
}

.text_5 {
  color: #979797;
  line-height: 23.13rpx;
}

.image_5 {
  border-radius: 50%;
  width: 25rpx;
  height: 25rpx;
}

.group_3 {
  margin-top: 66.67rpx;
  padding: 0 45.83rpx;
}

.font_3 {
  font-size: 66.67rpx;
  font-family: SF Pro Text;
  line-height: 49.25rpx;
  color: #000000;
}

.text_6 {
  margin-left: 16.67rpx;
}

.text_7 {
  margin-left: 16.67rpx;
  line-height: 23.08rpx;
}

.view_5 {
  margin-top: 54.17rpx;
}

.font {
  font-size: 20.83rpx;
  font-family: SF Pro Text;
  line-height: 19.25rpx;
  color: #000000;
}

.text_10 {
  margin-top: 12.5rpx;
  line-height: 19.31rpx;
}

.text_8 {
  margin-left: 4.17rpx;
  color: #b3b3b3;
  line-height: 19.38rpx;
}

.text_4 {
  line-height: 18.9rpx;
}

.text_3 {
  line-height: 18.08rpx;
}

.text_2 {
  line-height: 18.27rpx;
}

.text_9 {
  color: #000000;
  font-size: 41.67rpx;
  font-family: SF Pro Text;
  line-height: 29.35rpx;
}

.text_11 {
  margin-top: 12.5rpx;
  line-height: 19.27rpx;
}

.image_6 {
  margin-top: 16.67rpx;
  width: 8.33rpx;
  height: 12.5rpx;
}

.section_6 {
  margin-top: 54.17rpx;
  padding: 58.33rpx 41.67rpx 0;
  background-color: #ffffff;
  border-radius: 25rpx;
}

.text_12 {
  color: #1d2129;
  font-size: 29.17rpx;
  font-family: PingFang SC;
  line-height: 27.25rpx;
}

.group_4 {
  margin-top: 70.83rpx;
}

.divider {
  background-color: #e5e6eb;
  height: 2.08rpx;
}

.group_5 {
  margin-top: 45.83rpx;
  padding-top: 54.17rpx;
}

.group_6 {
  padding-top: 33.33rpx;
  border-bottom: solid 2.08rpx #c9cdd4;
}

.group_8 {
  margin-top: 66.67rpx;
}

.font_4 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 15.46rpx;
  color: #86909c;
}

.text_13 {
  line-height: 15.17rpx;
}

.text_14 {
  line-height: 15.17rpx;
}

.group_7 {
  padding: 75rpx 0 112.5rpx;
}

.view_6 {
  margin-top: 112.5rpx;
}

.view_7 {
  margin-top: 112.5rpx;
}

.section_10 {
  background-image: linear-gradient(180deg, #7451ff 0%, #7451ff99 100%);
  border-radius: 8.33rpx;
  height: 285.42rpx;
}

.pos_5 {
  position: absolute;
  left: 43.5rpx;
  right: 452.6rpx;
  top: 133.33rpx;
}

.section_9 {
  background-image: linear-gradient(180deg, #7451ff 0%, #7451ff99 100%);
  border-radius: 8.33rpx;
  height: 291.67rpx;
}

.pos_4 {
  position: absolute;
  left: 114.06rpx;
  right: 382.04rpx;
  top: 127.08rpx;
}

.section_7 {
  background-image: linear-gradient(180deg, #7451ff 0%, #7451ff99 100%);
  border-radius: 8.33rpx;
  height: 418.75rpx;
}

.pos {
  position: absolute;
  left: 184.65rpx;
  right: 311.46rpx;
  top: 0;
}

.section_13 {
  background-image: linear-gradient(180deg, #7451ff 0%, #7451ff99 100%);
  border-radius: 8.33rpx;
  height: 266.67rpx;
}

.pos_8 {
  position: absolute;
  left: 255.21rpx;
  right: 240.9rpx;
  top: 152.08rpx;
}

.section_8 {
  background-image: linear-gradient(180deg, #7451ff 0%, #7451ff99 100%);
  border-radius: 8.33rpx;
  height: 331.25rpx;
}

.pos_3 {
  position: absolute;
  left: 325.79rpx;
  right: 170.31rpx;
  top: 87.5rpx;
}

.section_14 {
  background-image: linear-gradient(180deg, #7451ff 0%, #7451ff99 100%);
  border-radius: 8.33rpx;
  height: 252.08rpx;
}

.pos_9 {
  position: absolute;
  left: 396.35rpx;
  right: 99.75rpx;
  top: 166.67rpx;
}

.section_15 {
  background-image: linear-gradient(180deg, #ffb238 0%, #ffeacc 100%);
  border-radius: 8.33rpx;
  height: 244.04rpx;
}

.pos_10 {
  position: absolute;
  left: 43.48rpx;
  right: 452.58rpx;
  top: 174.71rpx;
}

.section_16 {
  background-image: linear-gradient(180deg, #ffb238 0%, #ffeacc 100%);
  border-radius: 8.33rpx;
  height: 217.6rpx;
}

.pos_11 {
  position: absolute;
  left: 114.04rpx;
  right: 382.02rpx;
  top: 201.15rpx;
}

.section_12 {
  background-image: linear-gradient(180deg, #ffb238 0%, #ffeacc 100%);
  border-radius: 8.33rpx;
  height: 266.67rpx;
}

.pos_7 {
  position: absolute;
  left: 184.65rpx;
  right: 311.42rpx;
  top: 152.08rpx;
}

.section_18 {
  background-image: linear-gradient(180deg, #ffb238 0%, #ffeacc 100%);
  border-radius: 8.33rpx;
  height: 171.67rpx;
}

.pos_13 {
  position: absolute;
  left: 255.23rpx;
  right: 240.83rpx;
  top: 247.08rpx;
}

.section_11 {
  background-image: linear-gradient(180deg, #ffb238 0%, #ffeacc 100%);
  border-radius: 8.33rpx;
  height: 285.42rpx;
}

.pos_6 {
  position: absolute;
  left: 325.79rpx;
  right: 170.27rpx;
  top: 133.33rpx;
}

.section_17 {
  background-image: linear-gradient(180deg, #ffb238 0%, #ffeacc 100%);
  border-radius: 8.33rpx;
  height: 185.42rpx;
}

.pos_12 {
  position: absolute;
  left: 395.83rpx;
  right: 100rpx;
  top: 233.04rpx;
}

.image_7 {
  width: 33.33rpx;
  height: 33.33rpx;
}

.pos_2 {
  position: absolute;
  right: 176.44rpx;
  top: 45.54rpx;
}

.group_9 {
  padding: 25rpx 29.17rpx 54.17rpx 83.33rpx;
}

.font_5 {
  font-size: 25rpx;
  font-family: PingFang SC;
  line-height: 19.25rpx;
  color: #86909c;
}

.text_21 {
  line-height: 1.79rpx;
}

.text_15 {
  line-height: 17.54rpx;
}

.text_16 {
  line-height: 19.71rpx;
}

.text_17 {
  line-height: 20.96rpx;
}

.text_18 {
  line-height: 20.4rpx;
}

.text_19 {
  line-height: 22.52rpx;
}

.text_20 {
  line-height: 21.83rpx;
}

.tab-bar {
  padding: 54.17rpx 62.5rpx 41.67rpx 66.67rpx;
  background-color: #ffffff;
  box-shadow: 0rpx 1.04rpx 0rpx #0000002e inset;
  backdrop-filter: blur(0rpx);
}

.group_10 {
  height: 77.06rpx;
}

.image_8 {
  width: 54rpx;
  height: 54rpx;
}

.font_6 {
  font-size: 20.83rpx;
  font-family: PingFang SC;
  line-height: 19.25rpx;
  color: #a6a9b2;
}

.text_22 {
  line-height: 19.21rpx;
}

.group_11 {
  height: 77.08rpx;
}

.text_23 {
  line-height: 19.44rpx;
}

.group_12 {
  height: 77.04rpx;
}

.text_24 {
  color: #7451ff;
}

.text_25 {
  line-height: 19.29rpx;
}
</style>
