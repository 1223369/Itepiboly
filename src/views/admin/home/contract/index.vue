<script setup lang="ts">
import { reactive } from "vue";
import { adminContractList } from "@/api/admin";
import ContractList from "@/components/list/ContractList.vue";
import { showToast } from "vant";
import { contractStore } from "@/store/cotract";
import Tabs from "@/components/Tabs.vue";
import ProgressBar from "@/components/ProgressBar.vue";

const tabs = [
  {
    type: 0,
    text: "全部",
  },
  {
    type: 3,
    text: "履约中",
  },
  {
    type: 4,
    text: "已完成",
  },
];

const state = reactive({
  type: 0, // tab类型
  // 合同列表
  contractList: [],
  loading: false,
});

// 获取列表
const getContractList = async () => {
  state.loading = true;
  const res = await adminContractList({
    is_contract_type: state.type,
  });

  if (res) {
    state.contractList = res.records;
  } else {
    showToast(res.msg);
  }
  state.loading = false;
};

// 切换tab--接受自子组件
const setTabList = (type: number) => {
  if (state.type === type) return;
  state.type = type;
  getContractList();
};

// 方法调用
getContractList();
</script>

<template>
  <div class="wy-admin-page">
    <van-nav-bar title="合约管理" left-arrow @click-left="leftBack" />
    <Tabs :tabs="tabs" @tabsCall="setTabList"></Tabs>

    <!-- 合约列表 -->
    <van-pull-refresh
      class="task-list"
      v-model="state.loading"
      success-text="刷新成功"
      @refresh="getContractList"
    >
      <div
        class="home-contract-list"
        v-for="(item, index) in state.contractList"
        :key="index"
        @click="gotoDetail((item as any).contract_id)"
      >
        <dl>
          <!-- 合约名称 -->
          <dt>
            <h3>{{ item.contract_name }}</h3>
          </dt>

          <!-- 合约内容 -->
          <dt>
            <label for="">公司名称：</label>
            <span>{{ item.company_name }}</span>
          </dt>
          <dt>
            <label for="">任务薪资：</label>
            <span>{{ item.contract_type }}</span>
          </dt>
          <dt>
            <label for="">合约周期：</label>
            <span>{{ item.start_cycle_time }}-{{ item.end_cycle_time }}</span>
          </dt>
          <dt class="wy-flex">
            <label for="">合约进度：</label>
            <ProgressBar :item="item" />
          </dt>
        </dl>

        <!-- 底部状态和按钮 -->
        <div class="home-contract-bottom">
          <div>
            <i></i>
            <span>正常</span>
          </div>

          <button>完成合约</button>
          <button>中止合约</button>
        </div>
      </div>

      <van-loading v-if="state.loading">加载中...</van-loading>
      <div
        class="wy-no-data"
        v-if="!state.loading && state.contractList.length == 0"
      >
        暂无数据
      </div>
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="scss">
// 解决下拉刷新高度不够
.van-pull-refresh {
  height: calc(100vh - 46px - 5rem);
  overflow: auto;
}

.wy-admin-page {
  background: #f6f6f6;
  height: 100vh;
  overflow: auto;

  .home-contract-list {
    background: #ffffff;
    border-radius: 0.53rem;
    margin: 0 0.59rem 0.53rem;
    padding: 0.88rem 0.48rem 0.64rem;

    .wy-flex {
      display: flex;
      align-items: center;
    }
    .contract-progress {
      flex: 1;
    }
    // 合约列表
    dl {
      dt {
        margin-bottom: 0.51rem;

        h3 {
          font-size: 0.91rem;
          font-weight: 400;
          color: #333333;
          line-height: 0.91rem;
          margin-bottom: 0.83rem;
        }
        label {
          font-size: 0.69rem;
          line-height: 0.69rem;
          font-weight: 300;
          color: #666666;
        }
        span {
          font-size: 0.69rem;
          line-height: 0.69rem;
          font-weight: 300;
          color: #333333;
        }
      }
    }

    // 合约状态和按钮样式
    .home-contract-bottom {
      
    }
  }
}
</style>
