<script setup lang="ts">
import { reactive } from "vue";
import { contractList } from "@/api/constract";
import ContractList from "@/components/list/ContractList.vue";
import { showToast } from "vant";

const tabs = [
  {
    type: 2,
    text: "待签约",
  },
  {
    type: 3,
    text: "履约中",
  },
  {
    type: 4,
    text: "已完成",
  },
  {
    type: 5,
    text: "已失效",
  },
];

const state = reactive({
  type: tabs[0].type,
  // 合同列表
  list: [],
  loading: false,
  // 页面是不是首次加载
  activeIndex: 0,
});

// 获取列表
const getContractList = async () => {
  state.loading = true;
  const res = await contractList({
    is_contract_type: state.type,
  });

  if (res) {
    state.list = res.records;
  } else {
    showToast(res.msg);
  }
  state.loading = false;
  state.activeIndex++;
};

// 切换tab
const setTabList = (type: number) => {
  if (state.type === type) return;
  state.type = type;
  getContractList();
};

// 方法调用
getContractList();
</script>

<template>
  <div class="contract-tab">
    <span
      :class="{ active: tab.type === state.type }"
      v-for="tab in tabs"
      :key="tab.type"
      @click="setTabList(tab.type)"
      >{{ tab.text }} <i></i
    ></span>
  </div>

  <!-- 任务列表 -->
  <van-pull-refresh
    class="task-list"
    v-model="state.loading"
    success-text="刷新成功"
    @refresh="getContractList"
  >
    <ContractList :contractList="state.list"></ContractList>
    <van-loading v-if="state.activeIndex === 0 &&state.loading">加载中...</van-loading>
    <!-- 暂无数据显示 -->
    <div class="wy-no-data" v-if="!state.loading && state.list.length === 0">
      暂无数据
    </div>
  </van-pull-refresh>
</template>

<style scoped lang="scss">
.van-pull-refresh {
  height: calc(100vh - 46px - 5rem);
  overflow: auto;
}

.contract-tab {
  display: flex;

  span {
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 400;
    color: #666666;
    flex: 1;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    padding: 0.59rem 0;
    text-align: center;
    position: relative;
  }

  span.active {
    color: #ff9415;

    i {
      width: 1.63rem;
      height: 0.05rem;
      background: #ff9415;
      position: absolute;
      bottom: 0px;
      left: 50%;
      margin-left: -0.815rem;
    }
  }
}
</style>