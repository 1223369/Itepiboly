<script setup lang="ts">
import { ref } from "vue";
import TalentInfo from "./components/TalentInfo.vue";
import WorkExperience from "./components/WorkExperience.vue";
import ProjectExperience from "./components/ProjectExperience.vue";
import EduExperience from "./components/EduExperience.vue";


const state = ref({
  status: 0, // 收藏状态: 0 未收藏 1 已收藏
})

// 收藏人才事件
const setCollection = () => {
  console.log("收藏人才");
}

// 立即沟通人才
const gotoMessage = () => {
  console.log("立即沟通");
}

const leftBack = () => history.back();
</script>

<template>
  <van-nav-bar fixed title="人才详情" left-arrow @click-left="leftBack" />

  <!--  -->
  <div class="detail-page">
    <TalentInfo></TalentInfo>
    <WorkExperience></WorkExperience>
    <ProjectExperience></ProjectExperience>
    <EduExperience></EduExperience>

    <div class="task-detail-footer">
      <van-action-bar-icon
        :class="state.status == 1 ? 'active' : ''"
        icon="star-o"
        text="收藏"
        @click="setCollection"
      />
      <van-button type="primary" block @click="gotoMessage"
        >立即沟通</van-button
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.van-nav-bar__content) {
  background: #ff8e00;
}
:deep(.van-nav-bar__title),
:deep(.van-icon-arrow-left:before) {
  color: #ffffff;
}

.van-hairline--bottom:after {
  border: 0;
}

.detail-page {
  border: 1px solid red;
  margin: 2.9rem 0.53rem 0.53rem 0.53rem;
  padding-bottom: 2rem;
}

.task-detail-footer {
  display: flex;
  position: fixed;
  left: 0;
  width: 100%;
  align-items: center;
  background: #ffffff;
  bottom: 0;
  padding: 0.64rem 0;
}
.task-detail-footer button {
  margin-right: 0.64rem;
}
.task-detail-footer .active :deep(.van-icon-star-o:before) {
  color: #fe8f27;
}
</style>
