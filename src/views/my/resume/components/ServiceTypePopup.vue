<script setup lang="ts">
import { ref, inject } from "vue";
import { myStore } from "@/store/my";

const store = myStore()
const state = ref({
  value: [], // 服务方式
});

const props = defiendProps({
  page: {
    type: string,
  }
})

const { closeServiceType } = inject("popup");
</script>

<template>
  <van-nav-bar title="服务类型" left-arrow @click-left="closeServiceType('')" />
  <van-checkbox-group v-model="state.value">
    <van-checkbox
      :name="item"
      shape="square"
      v-for="(item, index) in store.jobsType"
      :key="index"
      >{{ item }}</van-checkbox
    >
  </van-checkbox-group>
  <button class="wy-submit" @click="closeServiceType(state.value)">保存</button>
</template>

<style scoped lang="scss">
.van-checkbox-group {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}
</style>
