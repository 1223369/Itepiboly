<script setup lang="ts">
import { reactive, provide } from "vue";
import { contractDetail } from "@/api/constract";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { userStore } from "@/store/user";
import ProgressBar from "@/components/ProgressBar.vue";
import ProgressEvalution from "./components/ProgressEvalution.vue";

const store = userStore();
const router = useRouter();
// 将路由携带的任务id赋值
const contractId = router.currentRoute.value.params.id;
const state = reactive({
  // 职位类型默认值
  item: [],
  num: 0, // 当前评估阶段
  loading: false,
  evaluationVisible: false, // 评估弹窗状态
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

// TODO: 评估每个阶段
const evaluation = (num: number) => {
  state.num = num;
  state.evaluationVisible = true;
};

// 关闭评估弹窗
const closeEvaluation = (bool: any) => {
  if (bool) {
    getContractDetail();
  }
  state.evaluationVisible = false;
};

const leftBack = () => history.back();

// 向子组件传递方法
provide("popup", {
  closeEvaluation,
});

// 执行函数
getContractDetail();
</script>

<template>
  <van-nav-bar title="合约进度" left-arrow @click-left="leftBack" />
  <van-loading v-if="state.loading">加载中...</van-loading>
  <div v-if="!state.loading">
    <h3>{{ state.item.contract_name }}</h3>
    <div class="progress-bar">
      <ProgressBar :item="state.item"></ProgressBar>
      <div class="progress-bar-text">
        <span>第一阶段</span>
        <span>第二阶段</span>
        <span>第三阶段</span>
        <span>第四阶段</span>
      </div>
    </div>
    <dl>
      <dt>
        <h4>
          第一阶段开发进度评估
          <span v-if="state.item.contract_I_state == -1 && store.role != 3"
            >暂无评估</span
          >
          <span
            class="active"
            v-if="state.item.contract_I_state == -1 && store.role == 3"
            @click="evaluation(1)"
            >去评估</span
          >
        </h4>
        <p v-if="state.item.contract_I_stage">
          {{ state.item.contract_I_stage }}
        </p>
      </dt>
      <dt>
        <h4>
          第二阶段开发进度评估
          <span v-if="state.item.contract_II_state == -1 && store.role != 3"
            >暂无评估</span
          >
          <span
            class="active"
            v-if="state.item.contract_II_state == -1 && store.role == 3"
            @click="evaluation(2)"
            >去评估</span
          >
        </h4>
        <p v-if="state.item.contract_II_stage">
          {{ state.item.contract_II_stage }}
        </p>
      </dt>
      <dt>
        <h4>
          第三阶段开发进度评估
          <span v-if="state.item.contract_III_state == -1 && store.role != 3"
            >暂无评估</span
          >
          <span
            class="active"
            v-if="state.item.contract_III_state == -1 && store.role == 3"
            @click="evaluation(3)"
            >去评估</span
          >
        </h4>
        <p v-if="state.item.contract_III_stage">
          {{ state.item.contract_III_stage }}
        </p>
      </dt>
      <dt>
        <h4>
          第四阶段开发进度评估
          <span v-if="state.item.contract_IIII_state == -1 && store.role != 3"
            >暂无评估</span
          >
          <span
            class="active"
            v-if="state.item.contract_IIII_state == -1 && store.role == 3"
            @click="evaluation(4)"
            >去评估</span
          >
        </h4>
        <p v-if="state.item.contract_IIII_stage">
          {{ state.item.contract_IIII_stage }}
        </p>
      </dt>
    </dl>
  </div>

  <!--进度评估弹窗-->
  <van-popup
    v-model:show="state.evaluationVisible"
    position="top"
    duration="0"
    :style="{ width: '100%', height: '100%' }"
  >
    <ProgressEvalution :num="state.num" :id="contractId"></ProgressEvalution>
  </van-popup>
</template>

<style scoped lang="scss">
h3 {
  font-size: 0.8rem;
  line-height: 0.8rem;
  font-weight: 500;
  color: #333333;
  padding: 1.2rem 0.69rem 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.progress-bar {
  margin: 0 0.64rem 1.17rem;

  .progress-bar-text {
    display: flex;

    span {
      flex: 1;
      text-align: right;
      margin: 0 1px;
      padding-top: 0.45rem;
    }
  }
}

dl {
  margin: 0 0.64rem;

  dt {
    border: 1px solid #ededed;
    border-radius: 0.27rem;
    margin-bottom: 0.59rem;
    padding: 0.75rem 0.69rem;

    h4 {
      display: flex;
      font-size: 0.75rem;
      line-height: 0.75rem;
      font-weight: 300;
      color: #666666;

      span {
        flex: 1;
        text-align: right;
        font-size: 0.64rem;
        font-weight: 500;
        color: #acacac;
      }

      span.active {
        color: #ff9415;
      }
    }
    p {
      font-size: 0.64rem;
      font-weight: 400;
      color: #333333;
      line-height: 0.8rem;
      margin-top: 0.77rem;
    }
  }
}
</style>
