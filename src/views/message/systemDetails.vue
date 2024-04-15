<script setup lang="ts">
import { reactive } from "vue";
import { systemDetails } from '@/api/message';
import { useRouter } from "vue-router";
import { showToast } from "vant";
const router = useRouter();
// 将路由携带的任务id赋值
const id = router.currentRoute.value.params.id;
const state = reactive({
  // 职位类型默认值
  item: "",
  loading: false,
});

// 获取任务详情
const getSystemDetails = async () => {
  state.loading = true;
  const res = await systemDetails({
    id: id,
  });
  if (res) {
    state.item = res[0];
  } else {
    showToast(res.msg);
  }
  state.loading = false;
};


const leftBack = () => history.back();

// 执行函数
getSystemDetails();
</script>

<template>
  <van-nav-bar title="查看消息" left-arrow @click-left="leftBack" />

  <h3>{{ state.item.title }}</h3>
  <p>{{ state.item.content }}</p>
</template>

<style scoped lang="scss">
h3 {
  font-size: 0.8rem;
  line-height: 0.8rem;
  font-weight: 400;
  color: #333333;
  margin: 1.7rem 0.75rem 0.83rem;
}
p{
    font-size: 0.69rem;
    font-weight: 500;
    color: #666666;
    line-height: 1.23rem;
    text-indent: 2em;
}
</style>
