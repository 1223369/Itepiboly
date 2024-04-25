<!-- 个人优势组件 -->
<script setup lang="ts">
import { ref, provide } from "vue";
import PersonAdvantagePopup from "./PersonAdvantagePopup.vue";
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
      个人优势<van-icon name="edit" @click="state.show = true"></van-icon>
    </h3>
    <label>{{ store.resumeInfo.advantage  || "请您填写个人优势" }}</label>
  </div>

  <!-- 编辑个人优势弹窗 -->
  <van-popup
    v-model:show="state.show"
    position="top"
    duration="0"
    :style="{ width: '100%', height: '100%' }"
  >
    <PersonAdvantagePopup></PersonAdvantagePopup>
  </van-popup>
</template>

<style scoped lang="scss"></style>
