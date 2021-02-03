<template>
  <div
    :class="className"
    ref="linechartBox"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
export default {
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "800px",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      marginLeft: "calc(-400px + 50vw)",
      chart: null,
      list: null,
      dataList: null,
      xAxisList: null,
      arr: [],
      dataArr: [],
      sumAmountData: [],
      sumItemQtyDate: [],
      skuNameData: [],
      endLength: 0,
    };
  },
  created() {
    // console.log(this.$refs.linechartBox,777)
    //  this.$refs.linechartBox.scrollLeft='200'
  },
  mounted() {
    this.initChart();
    console.log(this.$refs.linechartBox, 777);
    // this.$refs.linechartBox.scrollLeft = 200
  },
  methods: {
    initChart(row, val) {
      //  row=[
      //    {price:1,skuId:1,skuName:'aa',sumAmount:1,sumItemQty:1},
      //    {price:2,skuId:2,skuName:'bb',sumAmount:2,sumItemQty:2},
      //    {price:3,skuId:3,skuName:'cc',sumAmount:3,sumItemQty:3},
      //    ]
      // console.log(row,88888888888)
      this.sumItemQtyDate = row && row.map((item) => item.sumItemQty);
      this.sumAmountData = row && row.map((item) => item.sumAmount);
      this.skuNameData =
        row && row.map((item) => item.skuName.slice(0, 88888888888));
      console.log(
        this.sumItemQtyDate,
        this.sumAmountData,
        this.skuNameData,
        88888888888
      );
      
      if (val == 1) {
        this.chart = echarts.init(this.$el, "macarons");
        this.chart.setOption({
          color: ["#1BBF97"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter:function(data){
          console.log(data,666666666666666)
          return data[0].name+ '</br>'+'金额'+':'+data[0].data
        }
          },

          // dataZoom:[
          //   {
          //     show:true,
          //     realtime:true,
          //     start:0,
          //     end:this.skuNameData.length
          //   },
          // ],
          grid: {
        left: '24px',
        right: '24px',
        bottom: '24px',
        top:"24px",
        containLabel: true
    },
          xAxis: [
            {
              type: "category",
              data: this.skuNameData,
              axisLine: {
                lineStyle: {
                  color: "#979797",
                },
              },
              axisTick: {
                show: false
              },
              // axisTick: {
              //     alignWithLabel: true
              // }
            },
          ],
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#979797",
                },
              },
              axisTick: {
                show: false
              },
            },
          ],
          series: [
            // {
            //   name: "商品销量排行",
            //   type: "bar",
            //   data: this.sumItemQtyDate,
            // },
            {
                name: '商品金额排行',
                type: 'bar',
                barWidth:10,
                data: this.sumAmountData
            }
          ],
        });
      }else{
        this.chart = echarts.init(this.$el, "macarons");
            this.chart.setOption({
    color: ['#1BBF97'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter:function(data){
          console.log(data,666666666666666)
          return  data[0].name+ '</br>'+ '销量'+':'+data[0].data
        }
    },
   
    // dataZoom:[
    //   {
    //     show:true,
    //     realtime:true,
    //     start:0,
    //     end:this.skuNameData.length  
    //   },
    // ],
     grid: {
        left: '24px',
        right: '24px',
        bottom: '24px',
        top:"24px",
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: this.skuNameData,
            axisLine:{
                        lineStyle:{
                            color:'#979797',
                        }
            },
            axisTick: {
                show: false
              },
            // axisTick: {
            //     alignWithLabel: true
            // }
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
            axisTick: {
                show: false
              },
        }
    ],
    series: [
        {
            name: '商品销量排行',
            type: 'bar',
            barWidth:10,
            data: this.sumItemQtyDate
        },
        // {
        //     name: '商品金额排行',
        //     type: 'bar',
        //     data: this.sumAmountData
        // }
    ]
});
      }
    },
  },
};
</script>
