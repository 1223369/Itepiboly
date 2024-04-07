<script setup lang="ts">
import { reactive } from "vue";
import { taskDetail,taskCollection } from '@/api/task';
import { useRouter } from "vue-router";
import { showToast } from "vant";
import TaskDetail from "./components/TaskDetail.vue";
const router = useRouter();
// 将路由携带的任务id赋值
const taskId = router.currentRoute.value.params.id;
const state = reactive({
  // 职位类型默认值
  item: "",
  loading: false,
  // 是否收藏
  status: 0,
});

// 获取任务详情
const getTaskDetail = async () => {
  state.loading = true;
  const res = await taskDetail({
    task_id: taskId,
  });
  if (res) {
    state.item = res.records[0];
    state.status = res.records[0].status;
    state.loading = false;
  } else {
    showToast(res.msg);
    state.loading = false;
  }
};

// 任务收藏
const setTaskCollection = async () => {
  const res = await taskCollection({
    task_id: taskId,
  });
  if (res) {
    state.status = res.data.status;
  }
  showToast(res.msg);
};

// 立即沟通方法
const gotoMessage = () => {
  router.push("/message/talk/" + state.item.user_id);
};

const leftBack = () => history.back();

// 执行函数
getTaskDetail();
</script>

<template>
  <van-nav-bar title="任务详情" left-arrow @click-left="leftBack" />
  <!-- 任务详情 -->
  <TaskDetail :item="state.item" v-if="state.item"></TaskDetail>

  <!-- 底部操作按钮 -->
  <div class="task-detail-footer">
    <van-action-bar-icon :class="{ active: state.status === 1 }" icon="star-o" text="收藏" @click="setTaskCollection" />
    <van-button type="primary" block @click="gotoMessage">立即沟通</van-button>
  </div>
</template>

<style scoped lang="scss">
.task-detail-footer {
  display: flex;
  position: fixed;
  left: 0;
  width: 100%;
  align-items: center;
  background: #ffffff;
  bottom: 0;
  padding: 0.64rem 0;
  button {
    margin-right: 0.64rem;
  }
  .active :deep(.van-icon-star-o:before)  {
    color: #fe8f27;
  }
}
</style>
