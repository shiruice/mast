<template>
  <div :class="className" :style="{ height: height, width: width }" />
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
      default: "345px",
    },
    height: {
      type: String,
      default: "250px",
    },
  },
  data() {
    return {
      chart: null,
      list: null,
      dataList: null,
      xAxisList: null,
      arr: [],
      dataArr: [],
      firstLevelCategoryNameData: [],
      endLength: 0,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart(row, type) {
      // console.log(type,row,777777777777);
      // row=[
      //   {amount:1,firstLevelCategoryId:1,firstLevelCategoryName:2,proportion:11},
      //   {amount:1,firstLevelCategoryId:2,firstLevelCategoryName:3,proportion:11},
      //   {amount:1,firstLevelCategoryId:3,firstLevelCategoryName:4,proportion:11},
      //   {amount:1,firstLevelCategoryId:4,firstLevelCategoryName:5,proportion:11},
      //   {amount:1,firstLevelCategoryId:5,firstLevelCategoryName:6,proportion:11},
      //   {amount:1,firstLevelCategoryId:6,firstLevelCategoryName:7,proportion:11},
      //   ];
      if (type == "userGroups") {
        this.firstLevelCategoryNameData =
          row && row.map((item) => item.customerUserGroupName);
      } else {
        this.firstLevelCategoryNameData =
          row && row.map((item) => item.firstLevelCategoryName);
        //  console.log(firstLevelCategoryNameData)
      }
      console.log(row, 77777777777777);
      //  if(type=='')
      let proportionData =
        row &&
        row.map((item) => {
          return {
            name: item.firstLevelCategoryName || item.customerUserGroupName,
            value: item.proportion,
            amount: item.amount,
          };
        });
      //  proportionData.push({name:})
      //  let userGroupsData=row.map(item.)
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        color: [
          "#1BBF97",
          "#8C6AFF",
          "#FF9A52",
          "#FFC05C",
          "#5C96E0",
          "#F95A75",
        ],
        grid: {
          left: "12px",
          right: "12px",
          bottom: "24px",
          top: "24px",
          containLabel: true,
        },
        tooltip: {
          trigger: "item",
          formatter: function (data) {
            // debugger
            let str = Number(data.data.value * 100).toFixed(2) + "%";
            return (
              "名称" +
              ":" +
              data.data.name +
              "," +
              "</br>" +
              "金额" +
              ":" +
              data.data.amount +
              "," +
              "</br>" +
              "占比" +
              ":" +
              str
            );
          },
        },
        series: [
          {
            name: "订单构成",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "60%"],
            data: proportionData,
            bottom: 5,
            // minAngle: 0,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            labelLine: {
              show: true,
              length: 15,
              length2: 15,
              // lineStyle: {
              //   type:'solid',
              //   color: {
              //     type: "linear",
              //     x: 0.2,
              //     y: 0.5,
              //     x2: 0.3,
              //     y2: 1,
              //     // colorStops: [
              //     //   {
              //     //     offset: 0,
              //     //     color: "#F8F8F8", // 0% 处的颜色
              //     //   },
              //     //   {
              //     //     offset: 1,
              //     //     color: "#F8F8F8", // 100% 处的颜色
              //     //   },
              //     // ],
              //     global: false, // 缺省为 false
              //   },
              // },
            },
          },
        ],
      });
    },
  },
};
</script>

// {
//     color: ['#1BBF97', '#8C6AFF', '#FF9A52', '#FFC05C', '#5C96E0', '#F95A75'],   
//     tooltip: {
//         trigger: 'item',
//         formatter: function(data){
//           // debugger
//           let str=Number(data.data.value*100).toFixed(2)  +'%'
//           return '名称'+':'+data.data.name+','+'</br>'+'金额'+':'+data.data.amount+','+'</br>'+'占比'+':'+str
//         },
//         // left:'3%'
//     },
//     legend: {
//         // bottom: -3,
//         type:'scroll',
//         orient: 'vertical',
//         data: this.firstLevelCategoryNameData,
//         right: 10,
//         top: 30,
//         bottom: 20,
//         textStyle: {
//               color: '#333333'  // 图例文字颜色
//             },
//     },
//     series: [
//         {
//             name: '',
//             type: 'pie',
//             radius: ['40%', '70%'],
//             // avoidLabelOverlap: false,
//             // selectedMode: 'single',
//             label: {
//                 show: false,
//                 position: 'center'
//             },
//             emphasis: {
//                 label: {
//                     show: true,
//                     fontSize: '20',
//                     fontWeight: 'bold'
//                 },
//                 itemStyle: {
//                     shadowBlur: 10,
//                     shadowOffsetX: 0,
//                     shadowColor: 'rgba(0, 0, 0, 0.5)'
//                 }
//             },
//             data: proportionData
//         }
//     ]
// }