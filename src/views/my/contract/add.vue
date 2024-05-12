<script setup lang="ts">
import { reactive, provide } from "vue";
import { contractAdd } from "@/api/constract";
import { showToast } from "vant";
import TalentList from "./components/TalentList.vue";
import ContractDemand from "./components/ContractDemand.vue";


const time = new Date();


const state = reactive({
  talentBool: false, // 人才弹窗
  contractDemandBool: false, // 任务要求弹窗
  serviceModeBool: false, // 服务方式弹窗
  showStartTime: false, // 开始时间弹窗
  showEndTime: false, // 结束时间弹窗
  serviceModeList: [
    {
      name: "按月结算",
    },
    {
      name: "按任务结算",
    },
  ], // 服务方式列表
  loading: false, // 加载状态
  taskName: "", // 任务名称
  talentName: "", // 人才名称
  talentId: "", // 人才ID
  taskBudget: "", // 任务预算
  startTime: "", // 开始时间
  endTime: "", // 结束时间
  serviceMode: "", // 服务方式
  contractDemand: "", // 任务要求
  minDate: new Date(time.getFullYear() - 1, time.getMonth(), time.getDate()),// 合约开始最小日期
  maxDate: new Date(time.getFullYear() + 3, time.getMonth(), time.getDate()), // 合约解释最大日期
});
// 解决ios日期选择显示NaN

// 合约开始时间
const startTimeConfirm = (value: any) => {
  let date = new Date(value.selectedValues);
  state.startTime =
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  state.showStartTime = false;
};

// 合约结束时间
const endTimeConfirm = (value: any) => {
  let date = new Date(value.selectedValues);
  state.endTime =
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  state.showEndTime = false;
};

// 关闭人才选择弹窗
const closeTalent = (item: any) => {
  state.talentName = item.user_name;
  state.talentId = item.id;
  state.talentBool = false;
};

// 关闭任务要求弹窗
const closeDemand = (value: string) => {
  if (value) {
    state.contractDemand = value;
  } else {
    state.contractDemand = ''
  }
  state.contractDemandBool = false;
};

// TODO: 结薪方式选择
const serviceModeSelect = (value: any) => {
  state.serviceMode = value.name;
  state.serviceModeBool = false;
};

// TODO: 新增合约
const setTaskModify = async () => {
  if (!state.taskName) {
    showToast("请填写合约名称");
    return;
  }
  if (!state.talentName) {
    showToast("请选择企业人才");
    return;
  }
  if (!state.taskBudget) {
    showToast("请输入合约预算");
    return;
  }
  if (!state.startTime) {
    showToast("请选择合约开始时间");
    return;
  }
  if (!state.endTime) {
    showToast("请选择合约结束时间");
    return;
  }
  if (!state.serviceMode) {
    showToast("请选择结薪方式");
    return;
  }
  if (!state.contractDemand) {
    showToast("请选择合约要求");
    return;
  }
  state.loading = true;
  const res = await contractAdd({
    contract_type: "技术服务",
    contract_name: state.taskName,
    task_salary: state.taskBudget,
    start_cycle_time: state.startTime,
    end_cycle_time: state.endTime,
    check_out: state.serviceMode,
    task_ask: state.contractDemand,
    user_id: state.talentId,
  });
  if (res) {
    showToast("新增任务成功");
    leftBack();
  } else {
    showToast("添加失败");
  }
  state.loading = false;
};

const leftBack = () => history.back();

// 向子组件传递方法
provide("popup", {
  closeTalent,
  closeDemand,
});

// 函数调用
</script>

<template>
  <van-nav-bar title="新建合约" left-arrow @click-left="leftBack" />

  <div class="user-page">
    <van-form @submit="setTaskModify">
      <div class="user-item">
        <h5>合约名称</h5>
        <van-field
          v-model="state.taskName"
          label=""
          placeholder="请输入合约名称"
        />
      </div>

      <div class="user-item">
        <h5>IT企业人才</h5>
        <van-field
          v-model="state.talentName"
          readonly
          is-link
          @click="state.talentBool = true"
          placeholder="请选择IT企业人才"
        />
      </div>

      <div class="user-item">
        <h5>合约薪资</h5>
        <van-field
          class="budget"
          v-model="state.taskBudget"
          type="number"
          label=""
          placeholder="请输入合约薪资"
        />
      </div>

      <div class="user-item">
        <h5>合约周期</h5>
        <div class="work-time-list">
          <van-field
            v-model="state.startTime"
            readonly
            label=""
            placeholder="请选择"
            @click="state.showStartTime = true"
          />
          <span></span>
          <van-field
            v-model="state.endTime"
            readonly
            label=""
            placeholder="请选择"
            @click="state.showEndTime = true"
          />
          <div class="van-field__right-icon">
            <i class="van-badge__wrapper van-icon van-icon-arrow"></i>
          </div>
        </div>
        <van-action-sheet v-model:show="state.showStartTime">
          <van-date-picker
            type="date"
            title="选择年月日"
            :min-date="state.minDate"
            :max-date="state.maxDate"
            @confirm="startTimeConfirm"
            @cancel="state.showStartTime = false"
            
          />
        </van-action-sheet>
        <van-action-sheet v-model:show="state.showEndTime">
          <van-date-picker
            type="date"
            title="选择年月日"
            :min-date="state.minDate"
            :max-date="state.maxDate"
            @confirm="endTimeConfirm"
            @cancel="state.showEndTime = false"
          />
        </van-action-sheet>
      </div>

      <div class="user-item">
        <h5>结薪方式</h5>
        <van-field
          v-model="state.serviceMode"
          readonly
          right-icon="arrow"
          @click="state.serviceModeBool = true"
          placeholder="请选择结薪方式"
        />
        <van-action-sheet
          v-model:show="state.serviceModeBool"
          :actions="state.serviceModeList"
          cancel-text="取消"
          @select="serviceModeSelect"
        >
        </van-action-sheet>
      </div>

      <div class="user-item">
        <h5>合约要求</h5>
        <van-field
          v-model="state.contractDemand"
          label=""
          placeholder="请填写合约要求"
          readonly
          right-icon="arrow"
          @click="state.contractDemandBool = true"
        />
      </div>

      <button class="wy-confirm-btn" native-type="submit">完成</button>
    </van-form>

    <!--人才选择弹窗-->
    <van-popup
      v-model:show="state.talentBool"
      position="top"
      duration="0"
      :style="{ width: '100%', height: '100%' }"
    >
      <TalentList></TalentList>
    </van-popup>

    <!--合约要求弹窗-->
    <van-popup
      v-model:show="state.contractDemandBool"
      position="top"
      duration="0"
      :style="{ width: '100%', height: '100%' }"
    >
      <ContractDemand></ContractDemand>
    </van-popup>
  </div>
</template>

<style scoped lang="scss">
:deep(.van-image__img) {
  border-radius: 50%;
}
:deep(.van-uploader__upload) {
  margin: 0;
  border-radius: 50%;
}

:deep(.van-switch) {
  position: absolute;
  top: 0.4rem;
  right: 0.6rem;
  transform: scale(0.8);
}
:deep(.van-switch--on) {
  background: linear-gradient(90deg, #fea829, #fe8f27);
}
.user-page {
  margin: 1.47rem 0.6rem;
  padding-bottom: 1rem;

  // 表单单项
  .user-item {
    .work-time-list {
      display: flex;
      align-items: center;
      span {
        width: 0.43rem;
        height: 0.05rem;
        margin-right: 2.4rem;
        background: #999999;
      }
      .van-cell {
        width: 6rem;
      }
      .van-field__right-icon {
        text-align: right;
        flex: 1;
        margin-right: 0.5rem;
      }
    }
  }

  // 任务预算
  .budget {
    position: relative;
  }
  .budget::before {
    position: absolute;
    right: 0.9rem;
    content: "元";
    font-size: 0.8rem;
    font-weight: 300;
    color: #333333;
  }

  // 任务类型部分
  .task-switch {
    position: relative;
  }

  .wy-confirm-btn {
    height: 2.35rem;
    line-height: 2.35rem;
    background: linear-gradient(90deg, #fea829, #fe8f27);
    border-radius: 0.27rem;
    width: calc(100vw - 1.2rem);
    border: 0;
    position: fixed;
    left: 0;
    bottom: 0;
    margin: 0 0.6rem 0.6rem;
    font-size: 0.8rem;
    color: #ffffff;
  }
}
</style>
