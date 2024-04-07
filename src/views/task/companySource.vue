<script setup lang="ts">
import { reactive } from "vue";
import { taskAllList } from '@/api/task';
import CompanySource from "./components/CompanySource.vue";
import CompanyTask from "./components/CompanyTask.vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";

const router = useRouter();
// 将路由携带的任务id赋值
const companyId = router.currentRoute.value.params.id;
const state = reactive({
  // 来源公司
  item: "",
  loading: false,
  // 公司任务
  taskList: [],
});

// 获取任务详情
const getTaskAllList = async () => {
  state.loading = true;
  const res = await taskAllList({
    company_id: companyId,
  });
  if (res) {
    state.item = res.records[0];
    state.taskList = res.records;
    state.loading = false;
  } else {
    showToast(res.msg);
    state.loading = false;
  }
};

// 执行函数
getTaskAllList();
</script>

<template>
  <van-nav-bar title="任务来源" left-arrow @click-left="leftBack" />
  <!-- 公司详情 -->
  <CompanySource :item="state.item"></CompanySource>

  <!-- 公司任务 -->
  <CompanyTask :taskList="state.taskList"></CompanyTask>
  
</template>

<style scoped lang="scss">

</style>
