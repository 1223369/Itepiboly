<!-- 教育经历组件 -->
<script setup lang="ts">
import { ref, provide } from "vue";
import EducationalExperiencePopup from "./EducationalExperiencePopup.vue";
import { myStore } from "@/store/my";

const store = myStore();
const state = ref({
  show: false,
  item: {},
});
const props = defineProps({
  page: {
    type: String,
  },
});
const closeChange = () => {
  state.value.show = false;
  store.getResumeDetail();
};
const editWork = () => {
  state.value.show = true;
};
provide("popup", {
  closeChange,
});
</script>

<template>
  <div class="resume-label">
    <h3>教育经历<van-icon v-if="props.page!=='preview'" @click="editWork" name="add-o" /></h3>
    <div v-if="store.resumeInfo.school_name">
      <h4>
        {{ store.resumeInfo.school_name
        }}<van-icon
          v-if="props.page !== 'preview'"
          @click="editWork"
          name="arrow"
        />
      </h4>
      <p>
        {{ store.resumeInfo.teach_start_time }} -
        {{ store.resumeInfo.teach_end_time }}
      </p>
      <h5>
        {{ store.resumeInfo.major }} | {{ store.resumeInfo.highest_education }}
      </h5>
    </div>
    <label v-else>请您填写教育经历</label>
    <!--弹窗-->
    <van-popup
      v-model:show="state.show"
      position="top"
      duration="0"
      :style="{ width: '100%', height: '100%' }"
    >
      <EducationalExperiencePopup></EducationalExperiencePopup>
    </van-popup>
  </div>
</template>

<style scoped lang="scss"></style>
