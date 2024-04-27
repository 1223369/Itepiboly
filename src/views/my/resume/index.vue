<script setup lang="ts">
import PersonInfo from "./components/PersonInfo.vue";
import PersonAdvantage from "./components/PersonAdvantage.vue";
import PositionType from "./components/PositionType.vue";
import ExcellentSkill from "./components/ExcellentSkill.vue";
import WorkExperience from "./components/WorkExperience.vue";
import ProjectExperience from "./components/ProjectExperience.vue";
import EducationalExperience from "./components/EducationalExperience.vue";
import { myStore } from "@/store/my";

const store = myStore();

// 获取store中的简历详情
store.getResumeDetail();
// 获取简历字典类型
store.getResumeDict();
console.log("store.loading", store.loading);
const leftBack = () => history.back();
</script>

<template>
  <div class="resume">
    <van-loading v-if="store.loading" size="24px" vertical>加载中...</van-loading>
    <div v-if="!store.loading">
      <van-nav-bar fixed title="我的简历" left-arrow @click-left="leftBack" />
      <PersonInfo :item="store.resumeInfo"></PersonInfo>
      <PersonAdvantage></PersonAdvantage>
      <PositionType></PositionType>
      <ExcellentSkill></ExcellentSkill>
      <WorkExperience></WorkExperience>
      <ProjectExperience></ProjectExperience>
      <EducationalExperience></EducationalExperience>
    </div>
  </div>

  <router-link to="/my/resume/preview">
    <button class="resume-btn">预览简历</button>
  </router-link>
</template>

<style scoped lang="scss">
.resume {
  margin-top: 46px;
  height: calc(100vh - 46px - 3rem);
  overflow: auto;
}
.resume-btn {
  height: 2.35rem;
  background: linear-gradient(90deg, #fea829, #fe8f27);
  border-radius: 0.27rem;
  margin: 0 0.64rem 0.64rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: calc(100vw - 1.28rem);
  border: none;
  font-size: 0.8rem;
  font-weight: 400;
  color: #ffffff;
}
</style>
