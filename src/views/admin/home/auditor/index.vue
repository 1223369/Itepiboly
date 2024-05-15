<script setup lang="ts">
import { reactive } from "vue";
import { adminContractList, adminContractConfirm } from "@/api/admin";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import Tabs from "@/components/Tabs.vue";
import ProgressBar from "@/components/ProgressBar.vue";

const tabs = [
  {
    type: 0,
    text: "任务审核",
  },
  {
    type: 1,
    text: "个人认证",
  },
  {
    type: 2,
    text: "企业认证",
  },
];
const router = useRouter();

const state = reactive({
  type: 0, // tab类型
  // 合同列表
  contractList: [],
  loading: false,
  bool: false, // 是否展示弹窗
  selectType: 0, // 合约状态：4合约完成 5合约终止
  selectId: 0, // 选择的合约id
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

// 跳转详情页
const gotoDetail = (id: number) => {
  router.push("/contract/details/" + id);
};

// 处理任务紧急程度文字
const contractStateText = (num: number) => {
  return num === 1 ? "正常" : num === 2 ? "风险" : "问题严重";
};

// 处理任务紧急程度数据
const contractState = (item: any) => {
  let str = "正常";
  switch (true) {
    case item.contract_IIII_state > 0:
      return contractStateText(item.contract_IIII_state);
      break;

    case item.contract_III_state > 0:
      return contractStateText(item.contract_IIII_state);
      break;

    case item.contract_II_state > 0:
      return contractStateText(item.contract_IIII_state);
      break;

    case item.contract_I_state > 0:
      return contractStateText(item.contract_IIII_state);
      break;

    default:
      return str;
      break;
  }
};

// 完成合约按钮事件
const completeContract = (item: any) => {
  state.selectType = 4;
  state.selectId = item.contract_id;
  state.bool = true;
};
// 中止合约按钮事件
const overContract = (item: any) => {
  state.selectType = 5;
  state.selectId = item.contract_id;
  state.bool = true;
};

// 弹窗确认事件
const contractConfirm = async () => {
  const res = await adminContractConfirm({
    is_contract_type: state.selectType, // 4合约完成 5合约终止
    contract_id: state.selectId,
  });

  if (res) {
    getContractList();
  }

  state.bool = false;
};

// 返回上一级路由
const leftBack = () => history.back();

// 方法调用
getContractList();
</script>

<template>
  <div class="wy-admin-page">
    <van-nav-bar title="审核管理" left-arrow @click-left="leftBack" />
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
            <span>{{ item.task_salary }}/个</span>
          </dt>
          <dt>
            <label for="">合约周期：</label>
            <span
              >{{ item.start_cycle_time.replaceAll("-", ".") }}-{{
                item.end_cycle_time.replaceAll("-", ".")
              }}</span
            >
          </dt>
          <dt class="wy-flex">
            <label for="">合约进度：</label>
            <ProgressBar :item="item" />
          </dt>
        </dl>

        <!-- 底部状态和按钮 -->
        <div class="home-contract-bottom">
          <!-- 合约状态 -->
          <div
            :class="
              contractState(item) === '风险'
                ? 'origin'
                : contractState(item) === '问题严重'
                ? 'red'
                : ''
            "
          >
            <i></i>
            <span>{{ contractState(item) }}</span>
          </div>

          <button
            v-if="item.is_contract_type === 3"
            @click="completeContract(item)"
          >
            完成合约
          </button>
          <button
            v-if="item.is_contract_type === 3"
            @click="overContract(item)"
          >
            中止合约
          </button>
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

    <van-popup
      v-model:show="state.bool"
      closeable
      round
      :style="{ width: ' 13.07rem', height: '9.75rem' }"
    >
      <div class="admin-contract-popup">
        <h5>温馨提示</h5>
        <p v-if="state.selectType === 4">
          当前合约进度已正常完成， <br />完成合约进行后续薪资发放。
        </p>
        <p v-if="state.selectType === 5">
          当前合约进度存在异常， <br />经双方沟通决定终止合约。
        </p>
        <button @click="contractConfirm()">确定</button>
      </div>
    </van-popup>
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
      border-top: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.6rem 0 0 0.2rem;

      div {
        width: 8rem;

        i {
          width: 0.37rem;
          height: 0.37rem;
          background: #50d400;
          border-radius: 50%;
          display: inline-block;
        }

        span {
          font-size: 0.64rem;
          line-height: 0.64rem;
          font-weight: 400;
          color: #50d400;
          margin-left: 0.32rem;
        }
      }

      div.origin {
        i {
          background: #fe9215;
        }

        span {
          color: #fe9215;
        }
      }

      div.red {
        i {
          background: #ff0000;
        }

        span {
          color: #ff0000;
        }
      }

      button {
        width: 4rem;
        height: 1.39rem;
        background: #fe9215;
        border-radius: 0.16rem;
        font-size: 0.69rem;
        line-height: 1.39rem;
        text-align: center;
        font-weight: 100;
        color: #ffffff;
        border: none;
      }
    }
  }

  .admin-contract-popup {
    padding: 1.4rem 1rem;

    h5 {
      font-size: 0.85rem;
      line-height: 0.85rem;
      margin-bottom: 0.8rem;
      font-weight: 400;
      color: #333333;
      text-align: center;
    }
    p {
      font-size: 0.8rem;
      font-weight: 400;
      color: #333333;
      line-height: 1.28rem;
      text-align: center;
      margin-bottom: 0.76rem;
    }
    button {
      width: 10.99rem;
      height: 1.92rem;
      background: #fe9215;
      border: 0px solid #ff6f00;
      border-radius: 0.16rem;
      font-size: 0.85rem;
      line-height: 1.92rem;
      text-align: center;
      font-weight: 400;
      color: #ffffff;
      border: none;
    }
  }
}
</style>
