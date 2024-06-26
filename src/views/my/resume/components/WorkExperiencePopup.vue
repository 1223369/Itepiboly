<script setup lang="ts">
import { ref, inject, provide,watch } from "vue";
import PositionType from "../../../task/components/PositionType.vue";
import { addWorkExper, editWorkExper } from "@/api/my";
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
  companyName: "", // 公司名称
  startTime: "", // 开始工作时间
  endTime: "", // 结束工作时间
  workDesc: "", // 工作描述
  showStartTime: false, // 开始工作时间弹窗
  showEndTime: false, // 结束工作时间弹窗
  minDate: new Date(1980, 0, 1), // 最小日期
  maxDate: new Date(), // 最大日期
});

// 回填数据
const setInfo = () => {
  state.value.positionValue = props.item.work_position;
  state.value.companyName = props.item.company_name;
  state.value.workDesc = props.item.company_describe;
  state.value.startTime = props.item.start_time;
  state.value.endTime = props.item.end_time;
}

// 监听数据变化
watch(() => props.item,(newVal, oldVal) => {
  setInfo()
})
setInfo()


// 关闭职位类型弹窗
const closePositionType = (name: string) => {
  if (name) state.value.positionValue = name;
  state.value.showPositionType = false;
};

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
  if (!state.value.positionValue) {
    showToast("请选择职务类型");
    return;
  }
  if (!state.value.companyName) {
    showToast("请填写公司名称");
    return;
  }
  if (!state.value.startTime && !state.value.endTime) {
    showToast("请选择工作时间");
    return;
  }
  if (!state.value.workDesc) {
    showToast("请填写工作描述");
    return;
  }

  let res: any;
  if (props.item.id) {
    // 修改工作经历
    res = await editWorkExper({
      "id": props.item.id,
      "company_describe": state.value.workDesc,
      "company_name": state.value.companyName,
      "end_time": state.value.endTime,
      "start_time": state.value.startTime,
      'work_position': state.value.positionValue,
    });
  } else {
    // 添加工作经历
    res = await addWorkExper({
      "uuid": props.item.uuid,
      "company_describe": state.value.workDesc,
      "company_name": state.value.companyName,
      "end_time": state.value.endTime,
      "start_time": state.value.startTime,
      "work_position": state.value.positionValue,
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
// 向子组件注入方法
provide("popup", {
  closePositionType,
});
</script>

<template>
  <van-nav-bar title="工作经历" left-arrow @click-left="closeChange" />
  <div class="position-list">
    <!-- 公司名称 -->
    <div class="user-item">
      <h5>公司名称</h5>
      <van-field
        v-model="state.companyName"
        label=""
        placeholder="请填写您的公司名称"
      />
    </div>

    <!-- 职位类型 -->
    <div class="user-item">
      <h5>职位类型</h5>
      <van-field
        v-model="state.positionValue"
        label=""
        placeholder="请选择您的职位类型"
        readonly
        is-link
        @click="state.showPositionType = true"
      />
    </div>

    <!-- 工作时间 -->
    <div class="user-item">
      <h5>工作时间</h5>
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

    <!-- 工作描述 -->
    <div class="user-item">
      <h5>工作描述</h5>
      <van-field
        v-model="state.workDesc"
        type="textarea"
        rows="10"
        autosize
        placeholder="请填写您的工作描述"
      />
    </div>

    <button class="wy-submit" @click="submit">完成</button>

    <!--职位类型弹窗-->
    <van-popup
      v-model:show="state.showPositionType"
      position="top"
      duration="0"
      :style="{ width: '100%', height: '100%' }"
    >
      <PositionType></PositionType>
    </van-popup>
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
