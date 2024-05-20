<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

// 接收父组件传参
const props = defineProps({
  data: {
    type: Object,
  },
});

const state = ref({
  option: {
    tooltip: {},
    grid: {
      top: "10%",
      left: "3%",
      right: "3%",
      bottom: "5%",
      containLabel: true,
    },
    dataset: {
      source: [
        ["product", "人才", "企业"],
        ["周一", 43.3, 85.8],
        ["周二", 83.1, 73.4],
        ["周三", 86.4, 65.2],
        ["周四", 72.4, 53.9],
        ["周五", 72.4, 53.9],
        ["周六", 72.4, 53.9],
        ["周日", 72.4, 53.9],
      ],
    },
    xAxis: {
      type: "category",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        barWidth: "10",
        itemStyle: {
          color: "#6DA6EA",
        },
      },
      {
        type: "bar",
        barWidth: "10",
        itemStyle: {
          color: "#FBC605",
        },
      },
    ],
  },
});

onMounted(() => {
  // 页面加载完毕再赋值
  state.value.option.dataset.source = [];
  state.value.option.dataset.source[0] = [
    "product",
    props.data.talent.name,
    props.data.company.name,
  ];
  // 遍历赋值具体值
  for (var i = 0; i < props.data.title.length; i++) {
    state.value.option.dataset.source.push([
      props.data.title[i],
      props.data.talent.data[i],
      props.data.company.data[i],
    ]);
  }
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById("chartBar"));
  // 绘制图表
  myChart.setOption(state.value.option);
  // 图表响应式
  window.addEventListener("resize", () => {
    myChart.resize();
  });
});
</script>

<template>
  <div id="chartBar"></div>
</template>

<style scoped lang="scss">
#chartBar {
  height: 11.63rem;
  background: #ffffff;
  border-radius: 0.27rem;
  width: 100%;
}
</style>
