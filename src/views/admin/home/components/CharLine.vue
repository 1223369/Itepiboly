<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, inject, onMounted } from "vue";

// 接收App.vue注入的echars
const echars = inject("echars");

// 接收父组件传参
const props = defineProps({
  data: {
    type: Object,
  },
});

const state = ref({
  option: {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: '10%',
      left: "3%",
      right: "5%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      // boundaryGap: false,
      data: [],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: true,
        lineStyle: {
          color: "",
        },
      },
    },
    series: [
      {
        name: "上周",
        type: "line",
        stack: "Total",
        data: [],
        symbol: "circle",
        symbolSize: 8,
        itemStyle: {
          color: "#6DA6EA",
        },
      },
      {
        name: "这周",
        type: "line",
        stack: "Total",
        data: [],
        symbol: "circle",
        symbolSize: 8,
        itemStyle: {
          color: "#FBC605",
        },
      },
    ],
  },
});

onMounted(() => {
  // 页面加载完毕再赋值
  // 赋上周的值
  state.value.option.series[0].name = props.data.lastWeek.name;
  state.value.option.series[0].data = props.data.lastWeek.data;
  // 赋这周的值
  state.value.option.series[1].name = props.data.theWeek.name;
  state.value.option.series[1].data = props.data.theWeek.data;
  state.value.option.xAxis.data = props.data.title;
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById("chartLine"));
  // 绘制图表
  myChart.setOption(state.value.option);
  // 图表响应式
  window.addEventListener("resize", () => {
    myChart.resize();
  });
});
</script>

<template>
  <div id="chartLine"></div>
</template>

<style scoped lang="scss">
#chartLine {
  height: 11.63rem;
  background: #ffffff;
  border-radius: 0.27rem;
  width: 100%;
}
</style>
