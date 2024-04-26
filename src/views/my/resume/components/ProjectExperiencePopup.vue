<script setup lang="ts">
import { ref, inject, provide, watch } from "vue";
import PositionType from "../../../task/components/PositionType.vue";
import { addProjectExper, editProjectExper } from "@/api/my";
import { showToast } from "vant";

// 接收子组件参数
const props = defineProps({
  item: {
    type: Object,
  },
});

const state = ref({
  showPositionType: false, // 是否显示职位类型弹窗
  positionValue: "", // 职位类型
  projectName: "", // 项目名称
  startTime: "", // 开始项目时间
  endTime: "", // 结束项目时间
  projectDuty: "", // 项目描述
  showStartTime: false, // 开始项目时间弹窗
  showEndTime: false, // 结束项目时间弹窗
  minDate: new Date(1980, 0, 1), // 最小日期
  maxDate: new Date(), // 最大日期
});

// 回填数据
const setInfo = () => {
  state.value.projectName = props.item.project_name;
  state.value.projectDuty = props.item.project_duty;
  state.value.startTime = props.item.project_start_time;
  state.value.endTime = props.item.project_end_time;
};

// 监听数据变化
watch(
  () => props.item,
  (newVal, oldVal) => {
    setInfo();
  }
);
setInfo();

// 确认开始工作时间
const startTimeConfirm = (value: any) => {
  let date = new Date(value.selectedValues);
  state.value.startTime =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  state.value.showStartTime = false;
};

// 确认结束工作时间
const endTimeConfirm = (value: any) => {
  let date = new Date(value.selectedValues);
  state.value.endTime =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  state.value.showEndTime = false;
};

// TODO: 提交
const submit = async () => {
  if (!state.value.projectName) {
    showToast("请填写项目名称");
    return;
  }
  if (!state.value.startTime && !state.value.endTime) {
    showToast("请选择项目时间");
    return;
  }
  if (!state.value.projectDuty) {
    showToast("请填写项目描述");
    return;
  }

  let res: any;
  if (props.item.project_id) {
    // 修改工作经历
    res = await editProjectExper({
      "id": props.item.project_id,
      "project_duty": state.value.projectDuty,
      "project_name": state.value.projectName,
      "project_end_time": state.value.endTime,
      "project_start_time": state.value.startTime,
    });
  } else {
    // 添加工作经历
    res = await addProjectExper({
      "uuid": props.item.uuid,
      "project_duty": state.value.projectDuty,
      "project_name": state.value.projectName,
      "project_end_time": state.value.endTime,
      "project_start_time": state.value.startTime,
    });
  }

  if (res) {
    closeChange();
    showToast("保存成功");
  } else {
    showToast("保存失败");
  }
};

// 注入父组件的方法
const { closeChange } = inject("popup");

</script>

<template>
  <van-nav-bar title="项目经历" left-arrow @click-left="closeChange" />
  <div class="position-list">
    <!-- 项目名称 -->
    <div class="user-item">
      <h5>项目名称</h5>
      <van-field
        v-model="state.projectName"
        label=""
        placeholder="请填写您的项目名称"
      />
    </div>

    <!-- 项目时间 -->
    <div class="user-item">
      <h5>项目时间</h5>
      <div class="work-time-list">
        <van-field
          v-model="state.startTime"
          readonly
          label=""
          placeholder="开始时间"
          @click="state.showStartTime = true"
        />
        <span></span>
        <van-field
          v-model="state.endTime"
          readonly
          label=""
          placeholder="结束时间"
          @click="state.showEndTime = true"
        />
      </div>
      <!-- 开始工作时间弹窗 -->
      <van-action-sheet v-model:show="state.showStartTime">
        <van-date-picker
          type="date"
          title="选择年月"
          :min-date="state.minDate"
          :max-date="state.maxDate"
          @confirm="startTimeConfirm"
          @cancel="state.showStartTime = false"
        />
      </van-action-sheet>
      <!-- 结束工作时间弹窗 -->
      <van-action-sheet v-model:show="state.showEndTime">
        <van-date-picker
          type="date"
          title="选择年月"
          :min-date="state.minDate"
          :max-date="state.maxDate"
          @confirm="endTimeConfirm"
          @cancel="state.showEndTime = false"
        />
      </van-action-sheet>
    </div>

    <!-- 项目职责 -->
    <div class="user-item">
      <h5>项目职责</h5>
      <van-field
        v-model="state.projectDuty"
        type="textarea"
        rows="10"
        autosize
        placeholder="请填写您的项目职责"
      />
    </div>

    <button class="wy-submit" @click="submit">完成</button>
  </div>
</template>

<style scoped lang="scss">
.position-list {
  margin: 1.52rem 0.67rem 0;

  .work-time-list {
    display: flex;
    align-items: center;
    span {
      width: 0.83rem;
      height: 0.05rem;
      margin-right: 2.4rem;
      background: #333333;
    }
    .van-cell {
      width: 6rem;
    }
  }
}
</style>
