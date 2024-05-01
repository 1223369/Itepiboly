<script setup lang="ts">
import { ref } from "vue";
import { showToast } from "vant"
import { useRouter } from "vue-router";
import TalentInfo from "./components/TalentInfo.vue";
import WorkExperience from "./components/WorkExperience.vue";
import ProjectExperience from "./components/ProjectExperience.vue";
import EduExperience from "./components/EduExperience.vue";
import { getTalentDetail,addResumeCollect,deleteResumeCollect } from '@/api/talent'


const router = useRouter();
// 从路由中获取id
const id = router.currentRoute.value.params.id;

const state = ref({
  loading: false,
  status: 0, // 收藏状态: 0 未收藏 1 已收藏
  item: {}, // 人才详情
  projectList: [], // 项目经验列表 
  companyList: [], // 工作经验列表
})

// 获取人才详情
const getTalentDetailList = async() => {
  state.value.loading = true;
  const res = await getTalentDetail({
    id: id
  });
  if (res) {
    state.value.item = res.data[0].info[0]
    state.value.item.porjectNum = res.data[0].projectList.length
    state.value.projectList = res.data[0].projectList
    state.value.companyList = res.data[0].companyList
    state.value.status = state.value.item.status
  }
  state.value.loading = false;
}

// 收藏人才事件
const setCollection = async() => {
  if (state.value.status == 0) {
    const res = await addResumeCollect({
      "resume_id": id
    })
    if (res) {
      showToast('收藏成功')
    }
  } else {
    const res = await deleteResumeCollect({
      id: id
    })

    if (res) {
      showToast('取消收藏成功')
    }
  }
  getTalentDetailList();
}

// 立即沟通人才
const gotoMessage = () => {
  router.push('/message/talk/'+state.value.item.id+'/'+state.value.item.uid)
}

const leftBack = () => history.back();


// 函数调用
getTalentDetailList();
</script>

<template>
  <van-nav-bar fixed title="人才详情" left-arrow @click-left="leftBack" />

  <!--  -->
  <div class="detail-page">
    <TalentInfo :item="state.item"></TalentInfo>
    <WorkExperience :companyList="state.companyList"></WorkExperience>
    <ProjectExperience :projectList="state.projectList"></ProjectExperience>
    <EduExperience :item="state.item"></EduExperience>

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
