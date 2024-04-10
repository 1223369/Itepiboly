<script setup lang="ts">
import { reactive } from "vue";
import { contractDetail,contractOperation } from "@/api/constract";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import ProgressBar from "@/components/ProgressBar.vue";
const router = useRouter();
// 将路由携带的任务id赋值
const contractId = router.currentRoute.value.params.id;
const state = reactive({
  // 职位类型默认值
  item: [],
  loading: false,
});

// 获取任务详情
const getContractDetail = async () => {
  state.loading = true;
  const res = await contractDetail({
    id: contractId,
  });
  if (res) {
    state.item = res.records[0];
  } else {
    showToast(res.msg);
  }
  state.loading = false;
};

// 确认/拒绝签约
const putContractOperation = async (type: number) => {
  const res = await contractOperation({
    "is_contract_type": type, 
    "contract_id": contractId 
  });
  if (res.errcode === 200) leftBack();

  showToast(res.meg);
}

// 拒绝签约
const refuseChange = () => {
  putContractOperation(5)
}

// 确认签约
const confirmChange = () => {
  putContractOperation(3)
}

// 跳转到合约进度页面
const gotoProgress = () => {
  router.push("/contract/progress/" + state.item.contract_id);
};

const leftBack = () => history.back();

// 执行函数
getContractDetail();
</script>

<template>
  <van-nav-bar title="合约详情" left-arrow @click-left="leftBack" />
  <van-loading v-if="state.loading">加载中...</van-loading>
  <dl v-if="!state.loading">
    <!-- 任务发起人详情 -->
    <dd>
      <img :src="state.item.create_it_head" />
      <div>
        <h5>{{ state.item.company_name || "广州驻场无忧技术有限公司" }}</h5>
        <p>{{ state.item.create_user_name }}</p>
      </div>
    </dd>
    <dt>
      <label>合约状态</label>
      <span>{{ state.item.is_contract_type_text || "-" }}</span>
    </dt>
    <dt>
      <label>合约名称</label>
      <span>{{ state.item.contract_nam || "-" }}</span>
    </dt>
    <dt>
      <label>合约类型</label>
      <span>{{ state.item.contract_type || "-" }}</span>
    </dt>
    <dt>
      <label>合约薪资</label>
      <span>{{ state.item.task_salary || "-" }}</span>
    </dt>
    <dt>
      <label>合约周期</label>
      <span
        >{{ state.item.start_cycle_time }}-{{ state.item.end_cycle_time }}</span
      >
    </dt>
    <dt>
      <label>签约时间</label>
      <span>{{ state.item.signing_time || "-" }}</span>
    </dt>
    <dt>
      <label>结薪方式</label>
      <span>{{ state.item.check_out || "-" }}</span>
    </dt>
    <dt>
      <label>合约备注</label>
      <span>{{ state.item.task_ask || "-" }}</span>
    </dt>
    <dt>
      <label>合约结算</label>
      <span>{{ state.item.settle_salary || "-" }}</span>
    </dt>
    <dt>
      <label>合约进度</label>
      <span></span>
    </dt>
    <dt>
      <ProgressBar :item="state.item"></ProgressBar>
    </dt>
  </dl>

  <!-- 底部操作按钮 -->
  <div class="contract-btn" v-if="!state.loading">
    <button class="refuse-btn" v-if="state.item.is_contract_type === 2" v-debounce="refuseChange">
      拒绝签约
    </button>
    <button class="confirm-btn" v-if="state.item.is_contract_type === 2" v-debounce="confirmChange">
      确认签约
    </button>
    <button
      class="confirm-btn"
      @click="gotoProgress"
      v-if="
        state.item.is_contract_type != 1 && state.item.is_contract_type != 2
      "
    >
      合约进度
    </button>
  </div>

</template>

<style scoped lang="scss">
dl {
  font-size: 0.69rem;
  color: #666666;

  dd {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    padding: 0.85rem 0.93rem;
    margin-bottom: 1rem;

    img {
      width: 2.67rem;
      height: 2.67rem;
      border-radius: 50%;
      margin-right: 0.75rem;
    }

    h5 {
      font-size: 0.96rem;
      line-height: 0.96rem;
      font-weight: 300;
      color: #333333;
      margin-bottom: 0.48rem;
    }

    p {
      color: #333333;
      line-height: 0.69rem;
    }
  }

  dt {
    display: flex;
    margin-bottom: 1rem;
    padding: 0 0.72rem 0 0.56rem;

    label {
      flex: 1;
    }

    span {
      text-align: right;
      color: #000000;
    }
  }
}

.contract-btn {
  position: fixed;
  bottom: 0.64rem;
  left: 0;
  width: 100%;
  display: flex;

  button {
    height: 2.35rem;
    line-height: 2.23rem;
    border: 1px solid #ff9415;
    border-radius: 0.27rem;
    flex: 1;
    font-size: 0.8rem;
    text-align: center;
    margin-right: 0.64rem;
  }
  button.refuse-btn {
    color: #ff9415;
    background: #ffffff;
  }
  button.confirm-btn {
    color: #ffffff;
    background: #ff9415;
  }

  button:first-child {
    margin-left: 0.64rem;
  }
}
</style>
