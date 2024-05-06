<script setup lang="ts">
import { reactive, provide } from "vue";
import { screenList, addTask } from "@/api/task";
import { showToast } from "vant";
import { myStore } from "@/store/my";
import PositionType from "@/views/task/components/PositionType.vue";
import TaskDemand from "./components/taskDemand.vue";

const store = myStore();

// 日期选择器展示方式
const columnsType = ["year", "month"];

const state = reactive({
  positionTypeBool: false, // 职位类型弹窗
  taskDemandBool: false, // 任务要求弹窗
  taskCycleBool: false, // 任务周期弹窗
  serviceModeBool: false, // 服务方式弹窗
  taskCycleList: [], // 任务周期列表
  serviceModeList: [], // 服务方式列表
  showCity: false, // 城市选择弹窗
  loading: false,
  taskName: "", // 任务名称
  positionName: "", // 职位名称
  taskBudget: "", // 任务预算
  taskCycle: "", // 任务周期
  serviceMode: "", // 服务方式
  taskDemand: "", // 任务要求
  taskType: false, // 任务类型，是否紧急
});

// 获取筛选数据
const getScreenList = async () => {
  let res = await screenList();
  console.log("res", res);
  let cycle = [] as any;
  let type = [] as any;
  for (let i = 0; i < res.data.taskCycle.length; i++) {
    cycle.push({
      name: res.data.taskCycle[i],
    });
  }
  for (let j = 0; j < res.data.serviceMode.length; j++) {
    type.push({
      name: res.data.serviceMode[j],
    });
  }
  state.taskCycleList = cycle;
  state.serviceModeList = type;
};

// 关闭职位类型弹窗
const closePositionType = (name: string) => {
  state.positionName = name;
  state.positionTypeBool = false;
};

// 关闭任务要求弹窗
const closeDemand = (value: string) => {
  if (value) {
    state.taskDemand = value;
    state.taskDemandBool = false;
  }
};

// TODO: 选择任务周期
const taskCycleSelect = (value: any) => {
  state.taskCycle = value.name;
  state.taskCycleBool = false;
};

// TODO: 选择服务方式
const serviceModeSelect = (value: any) => {
  state.serviceMode = value.name;
  state.serviceModeBool = false;
};

// TODO: 新增任务
const setTaskModify = async () => {
  if (!state.taskName) {
    showToast("请填写任务名称");
    return;
  }
  if (!state.positionName) {
    showToast("请选择职位类型");
    return;
  }
  if (!state.taskBudget) {
    showToast("请输入任务预算");
    return;
  }
  if (!state.taskCycle) {
    showToast("请选择任务周期");
    return;
  }
  if (!state.serviceMode) {
    showToast("请选择服务方式");
    return;
  }
  if (!state.taskDemand) {
    showToast("请选择任务要求");
    return;
  }
  state.loading = true;
  const res = await addTask({
    "task_name": state.taskName,
    "position_name": state.positionName,
    "task_budget": state.taskBudget,
    "task_cycle": parseFloat(state.taskCycle),
    "service_mode": state.serviceMode,
    "task_ask": state.taskDemand,
    "is_emergency": state.taskType ? 1 : 0,
  });
  if (res) {
    showToast("新增任务成功");
    leftBack();
  } else {
    showToast("添加失败");
  }
  showToast(res.msg);
  state.loading = false;
};

const leftBack = () => history.back();

// 向子组件传递方法
provide("popup", {
  closePositionType,
  closeDemand,
});

// 函数调用
getScreenList();
</script>

<template>
  <van-nav-bar title="新建任务" left-arrow @click-left="leftBack" />

  <div class="user-page">
    <van-form @submit="setTaskModify">
      <div class="user-item">
        <h5>任务名称</h5>
        <van-field
          v-model="state.taskName"
          label=""
          placeholder="请输入任务名称"
        />
      </div>

      <div class="user-item">
        <h5>职位类型</h5>
        <van-field
          v-model="state.positionName"
          readonly
          is-link
          @click="state.positionTypeBool = true"
          placeholder="请选择职位类型"
        />
      </div>

      <div class="user-item">
        <h5>任务预算</h5>
        <van-field
          class="budget"
          v-model="state.taskBudget"
          type="number"
          label=""
          placeholder="请输入任务预算"
        />
      </div>

      <div class="user-item">
        <h5>任务周期</h5>
        <van-field
          v-model="state.taskCycle"
          readonly
          right-icon="arrow"
          @click="state.taskCycleBool = true"
          placeholder="请选择任务周期"
        />
        <van-action-sheet
          v-model:show="state.taskCycleBool"
          :actions="state.taskCycleList"
          cancel-text="取消"
          @select="taskCycleSelect"
        >
        </van-action-sheet>
      </div>

      <div class="user-item">
        <h5>服务方式</h5>
        <van-field
          v-model="state.serviceMode"
          readonly
          right-icon="arrow"
          @click="state.serviceModeBool = true"
          placeholder="请选择服务方式"
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
        <h5>任务要求</h5>
        <van-field
          v-model="state.taskDemand"
          label=""
          placeholder="请填写任务要求"
          readonly
          right-icon="arrow"
          @click="state.taskDemandBool = true"
        />
      </div>

      <div class="user-item">
        <h5>任务类型</h5>
        <div class="task-switch">
          <van-field
            disabled
            label=""
            placeholder="是否紧急"
            readonly
            @click="state.showCity = true"
          />
          <van-switch v-model="state.taskType" />
        </div>
      </div>
      <button class="wy-confirm-btn" native-type="submit">完成</button>
    </van-form>

    <!--职位类型弹窗-->
    <van-popup
      v-model:show="state.positionTypeBool"
      position="top"
      duration="0"
      :style="{ width: '100%', height: '100%' }"
    >
      <PositionType></PositionType>
    </van-popup>

    <!--任务要求弹窗-->
    <van-popup
      v-model:show="state.taskDemandBool"
      position="top"
      duration="0"
      :style="{ width: '100%', height: '100%' }"
    >
      <TaskDemand></TaskDemand>
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
