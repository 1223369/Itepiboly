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
    toolbox: {
      show: true,
    },
    grid: {
      top: "5%",
      left: "0%",
      right: "0%",
      bottom: "5%",
      containLabel: true,
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [10, 70],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 1,
        },
        data: [],
        label: {
          fonsSize: 10,
          formatter(params: any) {
            return params.name + " : " + params.percent + "%";
          },
        },
      },
    ],
  },
});

onMounted(() => {
  // 页面加载完毕再赋值
  // 赋上周的值
  state.value.option.series[0].data = props.data as any;
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById("chartPie"));
  // 绘制图表
  myChart.setOption(state.value.option);
  // 图表响应式
  window.addEventListener("resize", () => {
    myChart.resize();
  });
});
</script>

<template>
  <div id="chartPie"></div>
</template>

<style scoped lang="scss">
#chartPie {
  height: 11.63rem;
  background: #ffffff;
  border-radius: 0.27rem;
  width: 100%;
}
</style>
