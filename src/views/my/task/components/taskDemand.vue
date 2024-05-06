<script setup lang="ts">
import { inject, ref } from "vue";

const state = ref({
  value: "", // 输入框内容
});
// 接收父组件方法
const { closeDemand } = inject("popup") as () => void;
</script>

<template>
  <van-nav-bar title="任务要求" left-arrow @click-left="closeDemand()" />
  <van-field
    v-model="state.value"
    rows="12"
    autosize
    label=""
    type="textarea"
    maxlength="500"
    placeholder="请输入任务要求"
    show-word-limit
  />
  <button class="wy-submit" @click="closeDemand(state.value)">保存</button>
</template>

<style scoped lang="scss"></style>
