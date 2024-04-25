<!-- 个人优势组件 -->
<script setup lang="ts">
import { ref, provide } from "vue";
import PositionTypePopup from "./PositionTypePopup.vue";
import { myStore } from "@/store/my";

const store = myStore();

const state = ref({
  show: false,
});

// 关闭弹窗
const closeChange = () => {
  state.value.show = false;
  store.getResumeDetail();
};

// 向子组件传参数
provide("popup", {
  closeChange,
});
</script>

<template>
  <div class="resume-label">
    <h3>
      求职意愿<van-icon name="add-o" @click="state.show = true"></van-icon>
    </h3>
    <label
      v-if="
        store.resumeInfo.position_name ||
        store.resumeInfo.service_mode ||
        store.resumeInfo.service_price
      "
    >
      {{ store.resumeInfo.position_name }} |
      {{ store.resumeInfo.service_mode }} | {{ store.resumeInfo.service_price }}
    </label>
    <label v-else>请您填写求职意愿</label>
  </div>

  <!-- 编辑个人优势弹窗 -->
  <van-popup
    v-model:show="state.show"
    position="top"
    duration="0"
    :style="{ width: '100%', height: '100%' }"
  >
    <PositionTypePopup></PositionTypePopup>
  </van-popup>
</template>

<style scoped lang="scss"></style>
