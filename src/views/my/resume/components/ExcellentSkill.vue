<!-- 个人优势组件 -->
<script setup lang="ts">
import { ref, provide } from "vue";
import ExcellentSkillPopup from "./ExcellentSkillPopup.vue";
import { myStore } from "@/store/my";

const store = myStore();

const state = ref({
  show: false,
});

const props = defineProps({
  page: {
    type: String,
  }
})

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
      擅长技能<van-icon name="add-o" v-if="props.page!=='preview'" @click="state.show = true"></van-icon>
    </h3>
    <dl
      v-if="store.resumeInfo.sys_skill_ids || store.resumeInfo.skill_ids"
      class="text-list"
    >
      <dt
        v-if="store.resumeInfo.sys_skill_ids"
        v-for="(item, index) in store.resumeInfo.sys_skill_ids.split(',')"
        :key="index"
      >
        {{ item }}
      </dt>
      <dt
        v-if="store.resumeInfo.skill_ids"
        v-for="(item, index) in store.resumeInfo.skill_ids.split(',')"
        :key="index"
      >
        {{ item }}
      </dt>
    </dl>
    <label v-else>请您选择擅长技能</label>
  </div>

  <!-- 编辑个人优势弹窗 -->
  <van-popup
    v-model:show="state.show"
    position="top"
    duration="0"
    :style="{ width: '100%', height: '100%' }"
  >
    <ExcellentSkillPopup></ExcellentSkillPopup>
  </van-popup>
</template>

<style scoped lang="scss">
.text-list {
  dt {
    font-size: 0.59rem;
    line-height: 0.59rem;
    font-weight: 300;
    color: #666666;
    padding: 0.4rem 0.5rem;
    margin-right: 0.27rem;
    margin-bottom: 0.3rem;
    background: #f6f7f8;
    border-radius: 0.16rem;
    display: inline-block;
  }
}
</style>
