<script setup lang="ts">
import { reactive, nextTick, onActivated, onMounted, ref } from "vue";
import { contractList } from "@/api/constract";
import ContractList from "@/components/list/ContractList.vue";
import { showToast } from "vant";
import { contractStore } from "@/store/cotract";
import { onBeforeRouteLeave } from "vue-router";
import { onUpdated } from "vue";
import { myStore } from "@/store/my";

// 引入store
const mStore = myStore();
const store = contractStore();

// 获取用户信息
if (!mStore.userInfo.role) {
  await mStore.getUserInfo()
}

const tabs = [
  {
    type: 2,
    text: mStore.userInfo.role === 3 ? '待确认' : '待签约',
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
// 企业端添加tabs数据
if (mStore.userInfo.role === 3) {
  tabs.unshift({
    type: 1,
    text: "待发送",
  });
}
 
// 获取父组件传值
const props = defineProps({
  type: {
    type: String,
  },
});

// 根据props的值设置tabs
if (props.type === "0") {
  tabs.unshift({
    type: 0,
    text: "全部",
  });
}


const state = reactive({
  type: props.type || tabs[0].type,
  // 合同列表
  list: [],
  loading: false,
  // 页面是不是首次加载
  activeIndex: 0,
});

// 是否有滚动条
let isScroll = ref<boolean>(false);

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

onUpdated(() => {
  // 监听滚动条位置
  document.addEventListener("scroll", scrollTop, true);

  // 设置对应元素的滚动条
  let elVal: any = document.getElementsByClassName("task-list")[0];
  // 判断是否存在滚动条
  isScroll.value = elVal.scrollHeight > elVal.clientHeight;
});

// 实时滚动条高度
const scrollTop = () => {
  nextTick(() => {
    let elVal: any = document.getElementsByClassName("task-list")[0];
    store.setContractScoll(elVal.scrollTop);
  });
};

// 保持页面状态
onActivated(() => {
  // 保持上次浏览位置
  nextTick(() => {
    document.getElementsByClassName("task-list")[0].scrollTop =
      store.contractScoll;
  });
});

//记录滚动位置
onBeforeRouteLeave((to, from, next) => {
  // 参数必须和挂载时保持一致
  document.removeEventListener("scroll", scrollTop, true);
  next();
});

// 方法调用
getContractList();
</script>

<template>
  <div class="contract-tab">
    <span
      :class="Number(state.type) === tab.type? 'active' : '' "
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
    <van-loading v-if="state.activeIndex === 0 && state.loading"
      >加载中...</van-loading
    >
    <!-- 暂无数据显示 -->
    <div class="wy-no-data" v-if="!state.loading && state.list.length === 0">
      暂无数据
    </div>
  </van-pull-refresh>

  <!-- 企业端新建合约按钮 -->
  <router-link v-if="mStore.userInfo.role === 3" to="/my/contract/add">
    <button class="wy-submit">新建合约</button>
  </router-link>
  

</template>

<style scoped lang="scss">
// 解决下拉刷新高度不够
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
