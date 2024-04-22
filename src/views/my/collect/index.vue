<script setup lang="ts">
import { useRouter } from "vue-router";
import { collectList } from "@/api/my";
import TaskList from "@/components/list/TaskList.vue";
import { ref } from "vue";
import { showToast } from "vant";

const router = useRouter();
const state = ref({
  loading: false,
  list: [] //收藏列表
})

// 获取收藏列表
const getCollectList = async () => {
  state.value.loading = true;
  const res = await collectList();
  if (res) {
    state.value.list = res.data;
  } else {
    showToast(res.msg || "获取收藏列表失败")
  }
  state.value.loading = false;
}

// 返回上一页
const leftBack = () => history.back();

// 调用函数
getCollectList();
</script>

<template>
  <div class="set-page">
    <van-nav-bar title="我的收藏" left-arrow @click-left="leftBack" />
    <div class="collect-page">
      <van-pull-refresh v-model="state.loading" @refresh="getCollectList">
        <TaskList :taskList="state.list"></TaskList>
        <div class="wy-no-data" v-if="!state.loading && state.list.length==0">暂无数据</div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 解决下拉刷新高度不够
.van-pull-refresh {
  height: calc(100vh - 46px - 5rem);
  overflow: auto;
}
.collect-page {
  background: #f9f9f9;
  padding: 0.4rem 0.64rem 0;
  height: calc(100vh - 46px - 0.4rem);
}
</style>
