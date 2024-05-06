<script setup lang="ts">
import { ref } from "vue";
import { myTaskAllList } from "@/api/task";
import { useRouter } from "vue-router";

const state = ref({
  loading: false,
  list: [], // 任务列表
  cur: 0,
});

const router = useRouter();

// tab数组
const tabs = [
  {
    type: 0,
    text: "审核中",
  },
  {
    type: 1,
    text: "已开启",
  },
  {
    type: 2,
    text: "已下架",
  },
  {
    type: 3,
    text: "已关闭",
  },
];

// 切换tab
const getTabList = async (type: number) => {
  state.value.list = [];
  state.value.cur = type;
  state.value.loading = true;
  const res = await myTaskAllList({ type });
  if (res) {
    console.log("res", res);
    state.value.list = res.records;
  }
  state.value.loading = false;
};

// 跳转到任务详情
const gotoDetails = (id: number) => {
  router.push("/my/task/details/" + id);
};

// 返回上一页
const leftBack = () => history.back();

// 调用函数
getTabList(0); // 默认显示审核中任务


</script>

<template>
  <van-nav-bar fixed title="任务管理" left-arrow @click-left="leftBack" />

  <div class="task-contract-tab">
    <span
      v-for="item in tabs"
      :key="item.type"
      :class="{ active: state.cur === item.type }"
      @click="getTabList(item.type)"
      >{{ item.text }} <i></i
    ></span>
  </div>

  <!-- 任务列表 -->
  <div class="task-contract-list">
    <div class="wy-no-data" v-if="!state.loading && state.list.length == 0">
      暂无数据
    </div>
    <van-loading v-if="state.loading">加载中...</van-loading>
    <div
      class="task-contract-item"
      v-for="item in state.list"
      :key="item.task_id"
      @click="gotoDetails(item.task_id)"
    >
      <h2>
        <label for="">{{ item.task_name }}</label>
        <span>{{ item.is_check_text }}</span>
      </h2>
      <p>
        {{ item.task_budget }} ｜ {{ item.task_cycle }}天 ｜
        {{ item.service_mode }}<
      </p>
    </div>
  </div>

  <!-- 新建任务按钮 -->
  <router-link to="/my/task/add">
    <button class="wy-submit">新建任务</button>
  </router-link>
</template>

<style scoped lang="scss">
.task-contract-tab {
  margin-top: 2.9rem;
  display: flex;

  span {
    flex: 1;
    font-size: 0.75rem;
    font-weight: 400;
    color: #666666;
    line-height: 0.75rem;
    text-align: center;
    padding: 0.59rem 0;
    border-bottom: 1px solid #eeeeee;
    position: relative;

    i {
      width: 1.63rem;
      height: 0.05rem;
      background: #ffffff;
      position: absolute;
      bottom: 0px;
      left: 50%;
      margin-left: -0.815rem;
    }
  }

  span.active i {
    background: #ff9415;
  }
}

.task-contract-list {
  width: 100%;
  height: calc(100vh - 7.5rem);

  .task-contract-item {
    padding: 1.63rem 0.59rem 1.43rem;
    border-bottom: 1px solid #eeeeee;

    h2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0 0.48rem;

      label {
        font-size: 0.85rem;
        line-height: 0.85rem;
        font-weight: 400;
        color: #333333;
      }
      span {
        font-size: 0.75rem;
        line-height: 0.75rem;
        font-weight: 400;
        color: #ff9415;
      }
    }
  }
  // 选中最后一个元素
  .task-contract-item:last-child {
    padding-bottom: 5rem;
  }
}
</style>
