<script setup lang="ts">
import { ref } from "vue";
import AccountInfo from "../components/AccountInfo.vue";
import AccountList from "../components/AccountList.vue";
import { transferList, incomeList } from "@/api/my";
import { myStore } from "@/store/my";

const store = myStore();

const state = ref({
  check: 0,
  loading: false,
  list: [], // 余额操作列表
});

// tab标题
const tabs = [
  {
    type: 0,
    text: "全部",
  },
  {
    type: 1,
    text: "收入",
  },
  {
    type: 2,
    text: "提现",
  },
];

// 企业端添加支出选项
if (store.userInfo.role === 3) {
  tabs.splice(2, 0, {
    type: 3,
    text: "支出",
  });
}

// 切换tab
const toCheck = async (index: number, type: any) => {
  state.value.check = index;
  state.value.list = [];
  if (type === 0) {
    await getTransferList();
    await getIncomeList({
      type: 1,
    });

    // 企业端获取支出列表
    if (store.userInfo.role === 3) {
      await getIncomeList({
        type: 2,
      });
    }

    state.value.list = state.value.list.flat(2);
  }
  if (type === 1) {
    await getIncomeList({
      type: 1,
    });
    state.value.list = state.value.list.flat(2);
  }
  if (type === 2) {
    await getTransferList();
    state.value.list = state.value.list.flat(2);
  }
  if (type === 3) {
    await getIncomeList({
      type: 2,
    });
    state.value.list = state.value.list.flat(2);
  }
};

// 获取提现列表数据
const getTransferList = async () => {
  state.value.loading = true;
  const res = await transferList();
  if (res) {
    state.value.list.push(res);
  }
  state.value.loading = false;
};
// 获取收入列表数据
const getIncomeList = async (data: any) => {
  console.log("data", data);
  state.value.loading = true;
  const res = await incomeList(data);
  if (res) {
    state.value.list.push(res);
  }
  state.value.loading = false;
};

// 返回上一页
const leftBack = () => history.back();

// 默认为全部（0）
toCheck(0,0);
</script>

<template>
  <van-nav-bar fixed title="我的账户" left-arrow @click-left="leftBack" />
  <AccountInfo></AccountInfo>

  <dl>
    <dt
      :class="state.check === item.type ? 'active' : ''"
      v-for="item in tabs"
      :key="item.type"
      @click="toCheck(item.type, item.type)"
    >
      {{ item.text }}
    </dt>
  </dl>
  <AccountList :list="state.list"></AccountList>
</template>

<style scoped lang="scss">
:deep(.van-nav-bar__content) {
  background: #ff8e00;
}
:deep(.van-nav-bar__title) {
  color: #ffffff;
}
:deep(.van-icon-arrow-left:before) {
  color: #ffffff;
}
.van-hairline--bottom:after {
  border: 0;
}
dl {
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-around;
  dt {
    padding: 1.47rem 0 0.59rem;
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 500;
    color: #666666;
  }

  dt.active {
    color: #ff8e00;
    border-bottom: 1px solid #ff8e00;
  }
}
</style>
