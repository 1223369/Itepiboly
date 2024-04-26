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

const leftBack = () => history.back();
</script>

<template>
  <div class="resume">
    <van-nav-bar fixed title="预览简历" left-arrow @click-left="leftBack" />
    <PersonInfo page="preview" :item="store.resumeInfo"></PersonInfo>
    <PersonAdvantage page="preview"></PersonAdvantage>
    <PositionType page="preview"></PositionType>
    <ExcellentSkill page="preview"></ExcellentSkill>
    <WorkExperience page="preview"></WorkExperience>
    <ProjectExperience page="preview"></ProjectExperience>
    <EducationalExperience page="preview"></EducationalExperience>
  </div>
</template>

<style scoped lang="scss">
.resume {
  margin-top: 46px;
  height: calc(100vh - 46px);
  overflow: auto;
}
</style>
