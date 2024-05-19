"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_qiunDataCharts_js_sdk_uCharts_uCharts = require("../../uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js");
var uChartsInstance = {};
const _sfc_main = {
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
              color: "#ffb238"
            },
            {
              name: "高压学习时间",
              data: [1, 1, 1, 1, 1, 1, 1],
              color: "#7451ff"
            }
          ]
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
            "31"
          ],
          series: [
            //{ name: '正常学习时间', data: [20, 25, 22, 30], color: '#ffb238' },
            {
              name: "学习时间",
              data: [
                12,
                5,
                7,
                2,
                9,
                4,
                2,
                5,
                10,
                6,
                4,
                6,
                2,
                11,
                7,
                9,
                2,
                6,
                0,
                6,
                5,
                7,
                3,
                8
              ],
              color: "#7451ff"
            }
          ]
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
            "十二月"
          ],
          series: [
            //{ name: '正常学习时间', data: [100, 120, 110, 150, 160, 130, 140, 170, 180, 190, 200, 210], color: '#ffb238' },
            {
              name: "学习时间",
              data: [5, 10, 13, 10, 10, 16, 10, 8, 10, 10, 3, 10],
              color: "#7451ff"
            }
          ]
        },
        total: {
          type: "line",
          categories: ["2018", "2019", "2020", "2021", "2022"],
          series: [
            // { name: '正常学习时间', data: [500, 600, 550, 700, 750], color: '#ffb238' },
            {
              name: "高压学习时间",
              data: [245, 540, 816, 224, 92],
              color: "#7451ff"
            }
          ]
        }
      }
    };
  },
  onReady() {
    this.cWidth = common_vendor.index.upx2px(750);
    this.cHeight = common_vendor.index.upx2px(500);
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
      const ctx = common_vendor.index.createCanvasContext(id, this);
      uChartsInstance[id] = new uni_modules_qiunDataCharts_js_sdk_uCharts_uCharts.uCharts({
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
          "#ea7ccc"
        ],
        padding: [15, 15, 0, 5],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          data: [
            {
              min: 0
            }
          ]
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
            customColor: ["#FA7D8D", "#EB88E2"]
          }
        }
      });
    },
    getServerData() {
      setTimeout(() => {
        let res = {
          type: "line",
          categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          series: [
            //{ name: '正常学习时间', data: [20, 25, 22, 30], color: '#ffb238' },
            {
              name: "学习时间",
              data: [12, 5, 7, 2, 9, 4, 2, 5, 10, 6],
              color: "#7451ff"
            }
          ]
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
      const ctx = common_vendor.index.createCanvasContext(id, this);
      uChartsInstance[id] = new uni_modules_qiunDataCharts_js_sdk_uCharts_uCharts.uCharts({
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
          "#ea7ccc"
        ],
        padding: [15, 10, 0, 15],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2
        },
        extra: {
          line: {
            type: "straight",
            width: 2,
            activeType: "hollow"
          }
        }
      });
    },
    drawChartscolumn(id, data) {
      const ctx = common_vendor.index.createCanvasContext(id, this);
      uChartsInstance[id] = new uni_modules_qiunDataCharts_js_sdk_uCharts_uCharts.uCharts({
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
          "#ea7ccc"
        ],
        padding: [15, 15, 0, 5],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          data: [
            {
              min: 0
            }
          ]
        },
        extra: {
          column: {
            type: "stack",
            width: 30,
            // activeBgColor: "#000000",
            // activeBgOpacity: 0.08,
            // labelPosition: "center",
            barBorderCircle: true
            // linearType: "custom"
          }
        }
      });
    },
    tap(e) {
      uChartsInstance[e.target.id].touchLegend(e);
      uChartsInstance[e.target.id].showToolTip(e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.a("week")),
    b: common_vendor.n($data.activeTab === "week" ? "active" : ""),
    c: common_vendor.o(($event) => $options.a("month")),
    d: common_vendor.n($data.activeTab === "month" ? "active" : ""),
    e: common_vendor.o(($event) => $options.a("year")),
    f: common_vendor.n($data.activeTab === "year" ? "active" : ""),
    g: common_vendor.o(($event) => $options.a("total")),
    h: common_vendor.n($data.activeTab === "total" ? "active" : ""),
    i: common_vendor.o((...args) => $options.tap && $options.tap(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3de7eb56"], ["__file", "D:/SmartLearn/software_test/mini_program_test/pages/review/reflectionchart.vue"]]);
wx.createPage(MiniProgramPage);
