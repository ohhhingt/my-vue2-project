<template>
  <div class="echartspage">
    <div class="headers">
      <el-button
        type="primary"
        class="headers-button"
        @click="$router.push('/home')"
      >
        <i class="el-icon-back"></i>
        返回首页
      </el-button>
      <h2>可视化展板-ECharts</h2>
      <div class="now">当前时间: {{ currentTime }}</div>
    </div>
    <div class="content">
      <div class="left">
        <div class="panel">
          <h2>柱形图-就业行业</h2>
          <div class="bar echartsboxmeitichaxun" ref="barchart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel" style="position: relative">
          <h2>线图-就业行业</h2>
          <div class="clickyear">
            <a href="#" @click="clickyearevent(0)">2020</a>
            <a href="#" @click="clickyearevent(1)">2021</a>
          </div>
          <div class="line echartsboxmeitichaxun" ref="linechart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>饼图-就业行业</h2>
          <div class="pie echartsboxmeitichaxun" ref="piechartoneref"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="center">
        <div class="center-top">
          <ul>
            <li>12581</li>
            <li>10000</li>
          </ul>
          <dl>
            <dd>前端需求人数</dd>
            <dd>市场供应人数</dd>
          </dl>
        </div>
        <div class="center-map">
          <div class="mapsphere"></div>
          <div class="mapsphererotate"></div>
          <div class="mapspherearrow"></div>
          <div class="chinamap" ref="chinamap"></div>
        </div>
      </div>
      <div class="right">
        <div class="panel">
          <h2>柱形图-就业行业</h2>
          <div class="bar echartsboxmeitichaxun" ref="horizontalchart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>线图-就业行业</h2>
          <div
            class="line echartsboxmeitichaxun"
            ref="linechartvariesref"
          ></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>饼图-就业行业</h2>
          <div class="pie echartsboxmeitichaxun" ref="piecharttworef"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// import china from "../lib/china.js";
import china from "../lib/china.json";
import "../lib/flexible.js";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      currentTime: "", // 用于存储当前时间
      interval: null, // 用于存储定时器
      // echarts图表实例
      barChartInstance: null, // 柱状图1
      horizontalChartInstance: null, // 柱状图2
      lineChartInstance: null,
      linechartOption: {}, // 存储折线图配置 因为需要释放这个变量
      linechartvariesInstance: null, // 折线图2
      piechartoneInstance: null, // 饼图1
      piecharttwoInstance: null, // 饼图2
      chinamapInstance: null, // 中国地图
      // Api请求数据
      bar: [], // 柱状图1
      horizontal: [], // 横向柱状图2
      line: [], // 折线图
      linevariesarr: [], // 折线图波动
      piechartonearr: [], // 饼图1
      piecharttwoarr: [], // 饼图2
      chinamaparr: [], // 中国地图
    };
  },
  // api在这里请求
  created() {
    // 从api获取数据
    this.barData();
    this.horizontalData();
    this.lineData();
    this.linevariesData();
    this.piechartoneData();
    this.piecharttwoData();
    this.chinamapdata();
  },
  // 这里适合DOM操作
  mounted() {
    // 使用函数 初始化时间
    this.updateTime();
    // 每秒更新时间
    this.interval = setInterval(this.updateTime, 1000);

    // 初始化(图表)
    // 本来图标是在这里初始化的 但加入的数据请求之后
    // 初始化就必需放在数据请求后面了 不然this指向出问题
    // 柱状图
    // 横向柱状图
    // 折线图
    // 折线图波动
    // 饼图1
    // 饼图2
    // 中国地图
    // console.log("china", china); // 打印 china 对象

    // // 自适应图表
    window.addEventListener("resize", this.handleResize); // 添加窗口大小变化监听

    // script.js
    window.addEventListener("resize", () => {
      const newFontSize = window.innerWidth / 100; // 根据窗口宽度计算新的字体大小
      document.documentElement.style.fontSize = `${newFontSize}px`;
    });
  },
  methods: {
    // 获取时间初始设置
    updateTime() {
      const date = new Date();
      this.currentTime = date.toLocaleString(); // 格式化为可读字符串
    },

    // 接口数据请求(待修改) + 启动函数
    // 柱状图1
    async barData() {
      // 饼图
      const res_bardata = await axios.get("/api/bardata");
      // console.log(res_bardata);

      // 提取需要的字段并保存到数组
      this.bar = res_bardata.data.data.map((item) => ({
        xAxisdata: item.xAxisdata,
        seriesData: item.seriesData,
      }));
      // console.log(this.bar);

      // 数据请求-函数调用
      // 柱状图
      this.barChart();
    },
    // 柱状图2
    async horizontalData() {
      const res_horizontaldata = await axios.get("/api/horizontaldata");
      this.horizontal = res_horizontaldata.data.data.map((item) => ({
        yAxisfirstdata: item.yAxisfirstdata,
        yAxisseconddata: item.yAxisseconddata,
        seriesthirdData: item.seriesthirdData,
        seriesfourthData: item.seriesfourthData,
      }));

      // 数据请求-函数调用
      // 横向柱状图
      this.horizontalChart();
    },
    // 折线图
    async lineData() {
      const res_linedata = await axios.get("/api/lineData");
      // console.log(res_linedata);
      this.line = res_linedata.data.data.map((item) => ({
        xAxisdata: item.xAxisdata,
        seriesoneData: item.seriesoneData,
        seriestwoData: item.seriestwoData,
      }));

      // 数据请求-函数调用
      // 横向柱状图
      this.lineChart();
    },
    // 折线图波动
    async linevariesData() {
      const res_linevaries = await axios.get("/api/linevariesdata");
      this.linevariesarr = res_linevaries.data.data.map((item) => ({
        xAxisdata: item.xAxisdata,
        seriesoneData: item.seriesoneData,
        seriestwoData: item.seriestwoData,
      }));

      // 数据请求-函数调用
      // 横向柱状图
      this.linechartvariesInit();
    },
    // 饼图1
    async piechartoneData() {
      const {
        data: { data },
      } = await axios.get("/api/piechartonedata");
      this.piechartonearr = data.map(({ value, name }) => ({ value, name }));

      // 数据请求-函数调用
      // 横向柱状图
      this.piechartone();
    },
    // 饼图2
    async piecharttwoData() {
      const {
        data: { data },
      } = await axios.get("/api/piecharttwodata");
      this.piecharttwoarr = data.map(({ value, name }) => ({ value, name }));

      // 数据请求-函数调用
      // 横向柱状图
      this.piecharttwo();
    },
    // 中国地图
    async chinamapdata() {
      try {
        const {
          data: { data },
        } = await axios.get("/api/chinamapdata");
        this.chinamaparr = data;

        // console.log(this.chinamaparr);
        // 检查容器大小
        // console.log(
        //   this.$refs.chinamap.clientWidth,
        //   this.$refs.chinamap.clientHeight
        // );
        // 放在了$nextTick里面 防止DOM更新前操作
        // 注册完 调用中国地图函数

        echarts.registerMap("china", china); // 注册地图
        this.$nextTick(() => {
          // console.log("Inside nextTick, this:", this);
          this.chinamap(); // 启动中国地图函数
        });
      } catch (error) {
        console.error("Error fetching chinamap data:", error);
      }
    },

    // echarts已废弃属性 normal textStyle em..
    // 但是有些地方还是需要 不然属性不生效

    // // 柱形图
    barChart() {
      // 这个输出测试 this的指向
      // console.log(this.bar);
      const chartDom = this.$refs.barchart;
      this.barChartInstance = echarts.init(chartDom); // 将实例存储到组件中
      const option = {
        // 网格位置
        grid: {
          left: "0%",
          right: "0%",
          top: "5%",
          bottom: "0%",
          containLabel: true,
        },
        // 提示框
        tooltip: {
          // 触发方式
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器 坐标轴触发有效
            type: "shadow", // 可选: line shadow
          },
        },
        // toolbox 点击后下载
        xAxis: {
          type: "category",
          // show: true,

          // 修改x刻度标签 相关样式
          axisLabel: {
            rotate: 20, // 字体旋转
            margin: 10, // 图上下
            color: "rgba(255, 255, 255, .6)",
            // 字体大小
            // fontSize: '.0915rem'
          },
          // 不显示x坐标轴
          axisLine: {
            show: false,
          },

          axisTick: {
            show: false,
            // 去除刻度线
            alignWithLabel: true,
          },
          // 是否让我们的线条和坐标轴有缝隙
          boundaryGap: true,
          // x轴里的 data设置x轴显示文字
          data: this.bar.map((ele) => ele.xAxisdata),
        },
        yAxis: {
          // show: true
          type: "value",
          axisLabel: {
            margin: 10,
            color: "rgba(255, 255, 255, .6)",
            fontSize: ".0784rem",
          },
          axisLine: {
            // 这个属性axixLine需要加 show才能显示
            show: true,
            lineStyle: {
              type: "solid",
              color: "rgba(255, 255, 255, .3)",
              width: 2,
            },
          },
          // y轴分割线的颜色
          splitLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, .1)",
            },
          },
        },
        // 数据系列
        series: [
          {
            // series里面如果有name了
            // 那么legend里面的data可以删掉
            name: "销量",
            // 使用什么图 bar是柱形图
            type: "bar",
            // 柱子粗细
            barWidth: "35%",
            // stick 属性 使用后会堆叠数据
            // data: [
            //     // 单独设置颜色
            //     { value: 5, itemStyle: { color: 'pink' } },
            //     { value: 20, itemStyle: { color: 'red' } },
            //     { value: 36, itemStyle: { color: 'green' } },
            //     { value: 10, itemStyle: { color: 'skyblue' } },
            //     { value: 10, itemStyle: { color: 'blue' } },
            //     { value: 20, itemStyle: { color: 'purple' } }
            // ]
            // series里的data才是真正的数据(实际开发这里一般导入接口数据)
            data: this.bar.map((ele) => ele.seriesData),
            // 修改柱子样式
            itemStyle: {
              // 柱子圆角
              borderRadius: 5,
            },
          },
        ],
        // 在这里设置颜色 需要series有多个数据系列
        // 不然就需要去data中单独设置
        // color: ['pink', 'red', 'green', 'skyblue', 'blue', 'purple']
        // 只有一个数据可以直接设置一个
        color: ["#2f89cf"],
      };
      this.barChartInstance.setOption(option); // 使用 this.myChart
    },
    // 横向柱状图
    horizontalChart() {
      var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8878F6"];
      const chartDom = this.$refs.horizontalchart;
      this.horizontalChartInstance = echarts.init(chartDom);
      const option = {
        grid: {
          top: "0%",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        // 不显示x轴
        xAxis: {
          show: false,
        },
        yAxis: [
          {
            type: "category",
            data: this.horizontal.map((ele) => ele.yAxisfirstdata),
            // 反转数据
            inverse: true,
            // 不显示y轴线条
            axisLine: {
              show: false,
            },
            // 不显示刻度线
            axisTick: {
              show: false,
            },
            // 把刻度标签里面的文字颜色设置为白色
            axisLabel: {
              color: "#fff",
            },
          },
          {
            data: this.horizontal.map((ele) => ele.yAxisseconddata),
            inverse: true,
            // 不显示y轴线条
            axisLine: {
              show: false,
            },
            // 不显示刻度
            axisTick: {
              show: false,
            },
            // 把刻度标签里面的文字颜色设置为白色
            axisLabel: {
              fontSize: 12,
              color: "#fff",
            },
          },
        ],
        series: [
          {
            name: "条",
            type: "bar",
            data: this.horizontal.map((ele) => ele.seriesthirdData),
            yAxisIndex: 0, // 使用第一个 Y 轴
            // 修改第一组柱子的圆角
            itemStyle: {
              borderRadius: 20,
              // 这个color分别设置柱子不同的颜色
              color: function (params) {
                // console.log(params);
                // 使用箭头函数保持 this 上下文
                return myColor[params.dataIndex];
              },
            },
            // 柱子之间的距离
            barCategoryGap: 50,
            // 柱子的宽度
            barWidth: 10,
            // 显示柱子内的文字
            label: {
              show: true,
              position: "inside",
              // {c} 会自动的解析为 数据 data里面的数据
              formatter: "{c}%",
            },
          },
          {
            name: "框", // 数据系列名称
            type: "bar", // 柱状图
            barCategoryGap: 50, // 类别之间的间距
            barWidth: 15, // 柱子的宽度
            yAxisIndex: 1, // 使用第二个 Y 轴
            data: this.horizontal.map((ele) => ele.seriesfourthData),
            itemStyle: {
              color: "none", // 柱子的填充颜色，none表示不填充颜色
              borderColor: "#00c1de", // 边框颜色
              borderWidth: 3, // 边框宽度
              borderRadius: 15, // 柱子圆角
            },
          },
        ],
      };
      this.horizontalChartInstance.setOption(option);
    },
    // 折线图
    lineChart() {
      const chartDom = this.$refs.linechart;
      this.lineChartInstance = echarts.init(chartDom);
      this.linechartOption = {
        // 通过这两个 修改线的颜色
        color: ["#00f2f1", "#ed3f35"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // 如果 series对象 有name值 则legend可以不用写data
          // 图例颜色
          textStyle: {
            color: "#4c9bfd",
            right: "10%",
          },
        },
        grid: {
          top: "20%",
          left: "0%",
          right: "6%",
          bottom: "5%",
          show: true,
          borderColor: "#012f4a", // 右边小边框
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.line.map((ele) => ele.xAxisdata),
          axisTick: {
            show: false, // 去除刻度线
          },
          axisLabel: {
            color: "#4c9bfd", // 文本颜色
          },
          axisLine: {
            show: false, // 去除轴线
          },
          boundaryGap: false, // 去除轴内间距
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false, // 去除刻度
          },
          axisLabel: {
            color: "#4c9bfd", // 文字颜色
          },
          splitLine: {
            lineStyle: {
              color: "#012f4a", // 分割线颜色
            },
          },
        },
        series: [
          {
            name: "新增粉丝",
            type: "line",
            stack: "Total",
            data: this.line.map((ele) => ele.seriesoneData),
            // 折线修饰为圆滑
            smooth: true,
          },
          {
            name: "新增游客",
            data: this.line.map((ele) => ele.seriestwoData),
            type: "line",
            smooth: true,
          },
        ],
      };
      this.lineChartInstance.setOption(this.linechartOption);
    },
    // 折线图的点击年份切换事件
    clickyearevent(num) {
      var yearData = [
        {
          year: "2020", // 年份
          data: [
            // 两个数组是因为有两条线
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
          ],
        },
        {
          year: "2021", // 年份
          data: [
            // 两个数组是因为有两条线
            [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
            [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34],
          ],
        },
      ];
      // 确保 num 是有效的索引
      if (num >= 0 && num < yearData.length) {
        console.log(yearData[num].data[0]); // 新增粉丝数据(当前年份)
        console.log(yearData[num].data[1]); // 新增游客数据(当前年份)

        // 更新 chartOptions 中的 series 数据
        this.linechartOption.series[0].data = yearData[num].data[0]; // 更新新增粉丝数据
        this.linechartOption.series[1].data = yearData[num].data[1]; // 更新新增游客数据

        // 重新设置图表配置(将配置项重新设置到实例中)
        this.lineChartInstance.setOption(this.linechartOption); // 重新渲染图表
      } else {
        console.error("Invalid year index:", num); // 错误处理
      }
    },
    // 折线图波动
    linechartvariesInit() {
      const chartDom = this.$refs.linechartvariesref;
      this.linechartvariesInstance = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          top: "0%",
          // data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12",
          },
        },
        grid: {
          top: "20%",
          left: "0%",
          right: "6%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
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
              "26",
              "28",
              "29",
              "30",
            ],
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: 12,
            },
            // x轴线的颜色为   rgba(255,255,255,.2)
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.2)",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: 12,
            },
            // 修改分割线的颜色
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            smooth: "true",
            // 单独修改当前线条的样式
            lineStyle: {
              color: "0184d5",
              width: "2",
            },
            // 设置填充颜色
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(1, 132, 213, 0.4)", // 渐变色的起始颜色
                  },
                  {
                    offset: 0.8,
                    color: "rgba(1, 132, 213, 0.1)", // 渐变线的结束颜色
                  },
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
            // 设置拐点
            symbol: "circle",
            // 拐点大小
            symbolSize: 8,
            // 开始不显示拐点 鼠标经过显示
            showSymbol: false,
            // 设置拐点颜色以及边框
            itemStyle: {
              color: "#0184d5",
              borderColor: "rgba(221, 220, 107, .1)",
              borderWidth: 12,
            },
            data: [
              30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40,
              30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40,
            ],
          },
          {
            name: "联盟广告",
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#00d887",
              width: 2,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(0, 216, 135, 0.4)",
                  },
                  {
                    offset: 0.8,
                    color: "rgba(0, 216, 135, 0.1)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
            // 设置拐点 小圆点
            symbol: "circle",
            // 拐点大小
            symbolSize: 8,
            // 设置拐点颜色以及边框
            itemStyle: {
              color: "#00d887",
              borderColor: "rgba(221, 220, 107, .1)",
              borderWidth: 12,
            },
            // 开始不显示拐点， 鼠标经过显示
            showSymbol: false,
            data: [
              130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40,
              130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20,
            ],
          },
        ],
      };
      this.linechartvariesInstance.setOption(option);
    },
    // 饼图1 piechartoneref
    piechartone() {
      const chartDom = this.$refs.piechartoneref;
      this.piechartoneInstance = echarts.init(chartDom);
      const option = {
        color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
        tooltip: {
          trigger: "item",
        },
        legend: {
          // 距离底部为0%
          bottom: "0%",
          // 小图标的宽度和高度
          itemWidth: 10,
          itemHeight: 10,
          // 这里因为series有data 所以legend不用
          // 修改图例组件的文字为 .0784rem
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12",
          },
        },
        series: [
          {
            name: "年龄分布",
            type: "pie",
            // 第一个是内圆的半径 第二个是外圆的
            radius: ["40%", "60%"],
            center: ["50%", "45%"],
            avoidLabelOverlap: false,
            // 圆外面的文字
            label: {
              show: true,
              // position: "center",
            },
            // 连接圆外面的文字 的线
            labelLine: {
              show: true,
            },
            data: this.piechartonearr.map((item) => item),
          },
        ],
      };
      this.piechartoneInstance.setOption(option); // 使用 this.myChart
    },
    // 饼图2 piecharttworef
    piecharttwo() {
      const chartDom = this.$refs.piecharttworef;
      this.piecharttwoInstance = echarts.init(chartDom);
      const option = {
        color: [
          "#006cff",
          "#60cda0",
          "#ed8884",
          "#ff9f7f",
          "#0096ff",
          "#9fe6b8",
          "#32c5e9",
          "#1d9dff",
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          bottom: "0%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12",
          },
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     restore: { show: true },
        //     saveAsImage: { show: true },
        //   },
        // },
        series: [
          {
            name: "地区分布",
            type: "pie",
            // 设置内圆 外圆半径
            radius: ["10%", "70%"],
            // 位置设置(左右 上下)
            center: ["50%", "40%"],
            roseType: "radius",
            // 图形的文字标签
            label: {
              fontSize: 10,
            },
            // 链接图形贺文字的线条
            labelLine: {
              // 斜线
              length: 6,
              // 横线
              length2: 8,
            },
            itemStyle: {
              borderRadius: 5,
            },
            data: this.piecharttwoarr.map((item) => item),
          },
        ],
      };
      this.piecharttwoInstance.setOption(option);
    },

    // 中国地图
    chinamap() {
      // 将vue data中的数组转到该函数中
      // 记住js变量前面不用 this.
      const innerchinamaparr = this.chinamaparr;
      const chartDom = this.$refs.chinamap;
      if (!chartDom) return;

      // 确保容器有正确的尺寸
      if ((chartDom.clientwidth === 0) | (chartDom.clientHeight === 0)) {
        console.warn("地图容器尺寸为0，等待重新渲染");
        setTimeout(() => this.chinamap(), 100);
        return;
      }

      this.chinamapInstance = echarts.init(chartDom); // 将实例存储到组件中

      // 坐标映射 geoCoordMap
      // 数据定义 XAData XNData YCData

      // 路径定义
      var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
      //var planePath = 'arrow';

      // 数据转换函数 这里改为箭头函数 这样里面就可以用this了
      var convertData = (data) => {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];

          var fromCoord = innerchinamaparr.geoCoordMap[dataItem[0].name];
          var toCoord = innerchinamaparr.geoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord],
              value: dataItem[1].value,
            });
          }
        }
        return res;
      };
      var color = ["#a6c84c", "#ffa022", "#46bee9"]; //航线的颜色
      // 系列数据构建
      var series = [];
      [
        ["西安", innerchinamaparr.XAData],
        ["西宁", innerchinamaparr.XNData],
        ["银川", innerchinamaparr.YCData],
      ].forEach(function (item, i) {
        series.push(
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: "red", //arrow箭头的颜色
              symbolSize: 3,
            },
            lineStyle: {
              color: color[i],
              width: 0,
              curveness: 0.2,
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 2,
            symbol: ["none", "arrow"],
            symbolSize: 10,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: 15,
            },
            lineStyle: {
              color: color[i],
              width: 1,
              opacity: 0.6,
              curveness: 0.2,
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              show: true,
              position: "right",
              formatter: "{b}",
            },
            symbolSize: function (val) {
              return val[2] / 8;
            },
            itemStyle: {
              color: color[i],
              areaColor: "#2B91B7",
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[1].name,
                value: innerchinamaparr.geoCoordMap[dataItem[1].name].concat([
                  dataItem[1].value,
                ]),
              };
            }),
          }
        );
      });

      // 根据窗口大小设置 zoom 值
      // const zoomValue = window.innerWidth < 1069 ? 1.2 : 1.8; // 小于768px时使用1.2，否则使用1.5
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function (params, ticket, callback) {
            if (params.seriesType == "effectScatter") {
              return "线路：" + params.data.name + "" + params.data.value[2];
            } else if (params.seriesType == "lines") {
              return (
                params.data.fromName +
                ">" +
                params.data.toName +
                "<br />" +
                params.data.value
              );
            } else {
              return params.name;
            }
          },
        },
        // legend: {
        //   orient: "vertical",
        //   top: "bottom",
        //   left: "right",
        //   data: ["西安 Top3", "西宁 Top3", "银川 Top3"],
        //   color: "#fff",
        //   selectedMode: "multiple",
        // },
        geo: {
          map: "china",
          label: {
            show: true,
            color: "#fff",
          },
          itemStyle: {
            // 地图省份的背景颜色
            areaColor: "rgba(20, 9, 87, 0.8)",
            borderColor: "#0692a4",
            areaColor: "#0b1c2d",
          },
          // 放大地图
          zoom: 1.2,
          top: "20%", // 将地图向下移动10%
        },
        series: series,
      };
      this.chinamapInstance.setOption(option); // 使用 this.myChart
    },

    // 监听页面变化 给图表实例 让它实现自适应
    handleResize() {
      console.log("Resizing charts..."); // 调试信息
      if (this.barChartInstance) {
        this.barChartInstance.resize();
      }
      if (this.horizontalChartInstance) {
        this.horizontalChartInstance.resize();
      }
      if (this.lineChartInstance) {
        this.lineChartInstance.resize();
      }
      if (this.linechartvariesInstance) {
        this.linechartvariesInstance.resize();
      }
      if (this.piechartoneInstance) {
        this.piechartoneInstance.resize();
      }
      if (this.piecharttwoInstance) {
        this.piecharttwoInstance.resize();
      }
      if (this.chinamapInstance) {
        this.chinamapInstance.resize();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.echartspage {
  min-height: 100vh; /* 或者具体的像素值 */
  background-image: url(../assets/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  /* 背景图片居中显示 */
  // width: 98vw;
  // height: 72vw;

  .headers {
    height: 4.375rem;
    padding: 0 0.625rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #09133c;
    background: url(../assets/head_bg.png);
    background-repeat: no-repeat;
    background-size: cover;

    .headers-button {
      background-color: #18275c;
      border-color: #485ead;
      width: 6.25rem;
      height: 2.5rem;
      line-height: 2.5rem;
      font-size: 0.875rem;
      padding: 0;
    }

    h2 {
      height: 3.125rem;
      line-height: 3.125rem;
      color: #fff;
      margin-left: 6rem;
    }

    .now {
      color: #646e7a;
      display: flex;
      align-items: center;
    }
  }

  .content {
    display: flex;
    height: 39.8125rem;
    // 设置最大最小宽度 以免超出
    min-width: 60rem;
    max-width: 100rem;
    padding-top: 0.9375rem;
    padding: 0.625rem;
    margin: 0 auto;
    // /* background-color: #1ee1cb; */

    // 左边
    .left {
      flex: 3;

      .panel {
        /* 折线图 770 1102 */
        .bar {
          /* width: 25rem; */
          height: 21.9vh;
          border: 0.0625rem solid #000;
          // background-color: pink;
          // background-color: pink;
          // @media (max-width: 555px) {
          //   height: 29vh; /* 50% 视口高度 */
          // }
        }

        .line {
          /* width: 25rem; */
          height: 9.6875rem;
          border: 0.0625rem solid #000;
        }
        .clickyear {
          position: absolute;
          top: 0;
          right: 0;
          a {
            color: #fff;
            font-size: 0.8125rem;
            margin-left: 0.25rem;
            cursor: pointer;
            &:hover {
              background-color: #bbaeae;
            }
          }
        }

        .pie {
          /* width: 25rem; */
          height: 9.6875rem;
          border: 0.0625rem solid #000;
        }
      }
    }

    // 地图
    .center {
      flex: 5;
      // background-color: #ca2727;
      margin: 0 0.625rem 0.9375rem;

      .center-top {
        background: rgba(101, 132, 226, 0.2);
        padding: 0.9375rem;

        ul {
          display: flex;
          height: 4.375rem;
          line-height: 4.375rem;
          background: rgba(25, 186, 139, 0.17);
          position: relative;

          &::before {
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            width: 0.8125rem;
            height: 0.625rem;
            border-top: 0.125rem solid #02a6b5;
            border-left: 0.125rem solid #02a6b5;
          }

          &::after {
            position: absolute;
            bottom: 0;
            right: 0;
            content: "";
            width: 0.8125rem;
            height: 0.625rem;
            border-bottom: 0.125rem solid #02a6b5;
            border-right: 0.125rem solid #02a6b5;
          }

          li {
            // 各占一份
            flex: 1;
            font-size: 4.375rem;
            color: #ffeb7b;
            font-family: "electronicFont";
            position: relative;

            &::after {
              content: "";
              position: absolute;
              top: 25%;
              right: 0;
              height: 50%;
              width: 0.0625rem;
              background: rgba(255, 255, 255, 0.2);
            }
          }
        }

        dl {
          display: flex;
          margin: 0;

          dd {
            flex: 1;
            text-align: center;
            color: rgba(255, 255, 255, 0.7);
            font-size: 1.125rem;
            height: 1.25rem;
            line-height: 1.25rem;
            margin-left: 0;
            padding-top: 0.625rem;
          }
        }
      }

      .center-map {
        height: 31.875rem;
        // background-color: pink;
        position: relative;
        // 地球
        .mapsphere {
          width: 19.375rem;
          height: 19.375rem;
          // 改为固定定位 无论何时都位于中间 网状结构 旋转光环 同理
          position: fixed;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: url(../assets/map.png);
          background-size: 100% 100%;
          opacity: 0.3;
        }
        // 网状结构
        .mapsphererotate {
          position: fixed;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 22.5rem;
          height: 22.5rem;
          background: url(../assets/lbx.png);
          // 添加此行 适应元素大小
          background-size: 100% 100%;
          animation: rotate1 15s linear infinite;
          opacity: 0.6;
        }

        @keyframes rotate1 {
          form {
            // 这里第一个属性后不加分号 否则不行
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        // 旋转光环
        .mapspherearrow {
          position: fixed;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20.625rem;
          height: 20.625rem;
          background: url(../assets/jt.png);
          // 添加此行 适应元素大小
          background-size: 100% 100%;
          animation: rotate2 5s linear infinite;
          opacity: 0.6;
        }

        @keyframes rotate2 {
          form {
            // 这里第一个属性后不加分号 否则不行
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }
        // 中国地图
        .chinamap {
          position: absolute;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
          // background-color: pink;
          width: 43rem;
          height: 32rem;
          @media (max-width: 1063px) {
            top: 90%;
            height: 45rem;
          }
        }
      }
    }

    // 右边
    .right {
      flex: 3;

      // background-color: #20b820;
      .panel {
        /* 折线图 */
        .bar {
          /* width: 25rem; */
          height: 9.6875rem;
          border: 0.0625rem solid #000;
        }

        .line {
          /* width: 25rem; */
          height: 9.6875rem;
          border: 0.0625rem solid #000;
        }

        .pie {
          /* width: 25rem; */
          height: 9.6875rem;
          border: 0.0625rem solid #000;
        }
      }
    }
  }
}

// panel公共样式
.echartspage {
  .content {
    // 这里不写left right 因为它们都要使用
    .panel {
      width: 27vw; /* 50% 视口宽度 */
      height: 28vh; /* 50% 视口高度 */
      border: 0.0625rem solid rgba(25, 186, 139, 0.17);
      background: url(../assets/line.png);
      // padding: 0 0 .9375rem 0;
      margin-bottom: 0.9375rem;
      position: relative;
      // 这种媒体查询 只有在必要时做 比如主要的展区之类的 没有必要的不做
      // 而且背景图片使用contain的话 可能会被裁剪 所以这种方法只适合普通盒子
      // 当窗口宽度小于768时
      @media (max-width: 760px) {
        height: 31vh; /* 50% 视口高度 */
      }
      @media (min-width: 760px) and (max-width: 1062px) {
        height: 30vh; /* 设置高度 */
      }

      // 两个伪元素
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 0.625rem;
        height: 0.625rem;
        border-left: 0.125rem solid #02a6b5;
        border-top: 0.125rem solid #02a6b5;
        content: "";
      }

      &::after {
        position: absolute;
        top: 0;
        right: 0;
        width: 0.625rem;
        height: 0.625rem;
        border-right: 0.125rem solid #02a6b5;
        border-top: 0.125rem solid #02a6b5;
        content: "";
      }

      h2 {
        height: 2.8125rem;
        color: #fff;
        line-height: 3rem;
        text-align: center;
        font-size: 1.25rem;
        font-weight: 400;
      }

      .panel-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        &::before {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0.625rem;
          height: 0.625rem;
          border-right: 0.125rem solid #02a6b5;
          border-bottom: 0.125rem solid #02a6b5;
          content: "";
        }

        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0.625rem;
          height: 0.625rem;
          border-left: 0.125rem solid #02a6b5;
          border-bottom: 0.125rem solid #02a6b5;
          content: "";
        }
      }
    }
  }
}
// 放echarts的盒子的媒体查询
.echartsboxmeitichaxun {
  @media (min-width: 555px) and (max-width: 600px) {
    height: 29vh !important; /* 在 555px 到 600px 之间的高度 */
  }

  @media (min-width: 601px) and (max-width: 700px) {
    height: 28.7vh !important; /* 在 601px 到 700px 之间的高度 */
  }

  @media (min-width: 701px) and (max-width: 760px) {
    height: 28.3vh !important; /* 在 701px 到 760px 之间的高度 */
  }

  @media (min-width: 760px) and (max-width: 850px) {
    height: 26.2vh !important; /* 在 760px 到 850px 之间的高度 */
  }

  @media (min-width: 851px) and (max-width: 950px) {
    height: 26.4vh !important; /* 在 851px 到 950px 之间的高度 */
  }

  @media (min-width: 951px) and (max-width: 1062px) {
    height: 26.2vh !important; /* 在 951px 到 1062px 之间的高度 */
  }

  @media (min-width: 1062px) and (max-width: 1150px) {
    height: 24vh !important; /* 在 1062px 到 1150px 之间的高度 */
  }

  @media (min-width: 1151px) and (max-width: 1250px) {
    height: 23.6vh !important; /* 在 1151px 到 1250px 之间的高度 */
  }

  @media (min-width: 1251px) and (max-width: 1350px) {
    height: 23.2vh !important; /* 在 1251px 到 1350px 之间的高度 */
  }

  @media (min-width: 1351px) and (max-width: 1450px) {
    height: 23.1vh !important; /* 在 1351px 到 1450px 之间的高度 */
  }

  @media (min-width: 1451px) and (max-width: 1550px) {
    height: 22.7vh !important; /* 在 1451px 到 1550px 之间的高度 */
  }

  @media (min-width: 1551px) and (max-width: 1650px) {
    height: 22.2vh !important; /* 在 1551px 到 1650px 之间的高度 */
  }

  @media (min-width: 1651px) and (max-width: 1696px) {
    height: 22vh !important; /* 在 1651px 到 1696px 之间的高度 */
  }

  @media (min-width: 1696px) {
    height: 21.8vh !important; /* 在更大屏幕上设置高度 */
  }
}
</style>

