<script setup lang="ts">
//接收父组件传过来的参数
const props = defineProps({
  item: {
    type: Object,
  },
});

// 判断状态
const contractState = (index: number) => {
  if (index === 1) return "green";
  if (index === 2) return "orange";
  if (index === 3) return "red";
  return "";
};
</script>

<template>
  <!-- 进度条 -->
  <div class="contract-progress">
    <i :class="contractState(item?.contract_I_state)"></i>
    <i :class="contractState(item?.contract_II_state)"></i>
    <i :class="contractState(item?.contract_III_state)"></i>
    <i :class="contractState(item?.contract_IIII_state)"></i>
  </div>
</template>

<style scoped lang="scss">
.contract-progress {
  display: flex;
  height: 0.53rem;
  width: 100%;

  i {
    flex: 1;
    background: #f3f3f3;
    margin: 0 1px;
  }

  i.green {
    background: #50d400;
  }
  i.orange {
    background: #fe9215;
  }
  i.red {
    background: #ff4800;
  }
}
</style>
