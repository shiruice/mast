<template>
    <div :class="className" :style="{ height: height, width: width }"/>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "345px"
    },
    height: {
      type: String,
      default: "200px"
    },
  },
  data() {
    return {
      chart: null,
      orderDateData:null,
      sumAmountData:null,
    };
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart(row) {
       this.orderDateData=row&&row.map(item=>item.orderDate);
       this.sumAmountData=row&&row.map(item=>item.sumAmount);
       this.chart = echarts.init(this.$el, "macarons");
       this.chart.setOption({
    color: ['#1BBF97'], 
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '12px',
        right: '12px',
        bottom: '24px',
        top:"24px",
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            axisLine:{
                        lineStyle:{
                            color:'#979797',
                        }
            },            
            data: this.orderDateData,
            axisTick: {
                alignWithLabel: true,
                show: false
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLine:{
                        lineStyle:{
                            color:'#979797',
                        }
            }, 
            color:'#979797',
            axisTick: {
                show: false
            },
        }
    ],
    series: [
        {
            name: '金额',
            type: 'bar',
            barWidth: '60%',
            data: this.sumAmountData
        }
    ]
});
    },
  }
};
</script>
