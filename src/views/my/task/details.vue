<script setup lang="ts">
import { reactive } from "vue";
import { taskDetail, onOrOff } from "@/api/task";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import TaskDetail from "@/views/task/components/TaskDetail.vue";
const router = useRouter();
// 将路由携带的任务id赋值
const taskId = router.currentRoute.value.params.id;
const state = reactive({
  // 职位类型默认值
  item: "",
  loading: false,
});

// 获取任务详情
const getTaskDetail = async () => {
  state.loading = true;
  const res = await taskDetail({
    task_id: taskId,
  });
  console.log('res', res)
  if (res) {
    state.item = res.records[0];
    state.status = res.records[0].status;
    state.loading = false;
  } else {
    showToast(res.msg);
    state.loading = false;
  }
};

// 关闭任务
const taskOperate = async (type: number) => {
  state.loading = true;
  const text = type == 3 ? "关闭" : "启动";
  const res = await onOrOff({
    task_id: taskId,
    is_check: type,
  });
  if (res) {
    leftBack();
    showToast(text + "成功");
  } else {
    showToast(text + "失败");
  }
  state.loading = false;
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
  <div
    class="task-detail-footer"
    v-if="state.item.is_check == 1 || state.item.is_check == 3 
    || state.item.is_check == 0"

  >
    <button
      class="wy-submit"
      v-if="state.item.is_check == 0"
      @click="taskOperate(3)"
    >
      关闭任务
    </button>
    <button
      class="wy-submit"
      v-if="state.item.is_check == 3"
      @click="taskOperate(1)"
    >
      启动任务
    </button>
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
  .active :deep(.van-icon-star-o:before) {
    color: #fe8f27;
  }
}
</style>
