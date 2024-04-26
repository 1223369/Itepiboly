<script setup lang="ts">
import { ref, inject, provide } from "vue";
import PositionType from "../../../task/components/PositionType.vue";
import ServiceTypePopup from "./ServiceTypePopup.vue";
import { myStore } from "@/store/my";
import { editEdu } from "@/api/my";
import { showToast } from "vant";

const store = myStore();
const state = ref({
  showEducation: false, // 是否显示学历选择弹窗
  schoolName: "", // 学校名称
  education: "", // 学历
  major: "", // 专业
  startTime: "", // 就读时间
  endTime: "", // 结束时间
  showStartTime: false, // 是否显示开始时间选择弹窗
  showEndTime: false, // 是否显示结束时间选择弹窗
  minDate: new Date(1990, 1, 1),
  maxDate: new Date(),
});

// 回填数据
if (Object.keys(store.resumeInfo).length !== 0) {
  state.value.schoolName = store.resumeInfo.school_name;
  state.value.education = store.resumeInfo.highest_education;
  state.value.major = store.resumeInfo.major;
  state.value.startTime = store.resumeInfo.teach_start_time;
  state.value.endTime = store.resumeInfo.teach_end_time;
}

// 选择学历
const educationSelect = (value: any) => {
  state.value.education = value.name;
};

const startTimeConfirm = (value: any) => {
  let date = new Date(value.selectedValues);
  state.value.startTime =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  state.value.showStartTime = false;
};
const endTimeConfirm = (value: any) => {
  let date = new Date(value.selectedValues);
  state.value.endTime =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  state.value.showEndTime = false;
};

// TODO: 提交
const submit = async () => {
  if (!state.value.schoolName) {
    showToast("请填写学校名称");
    return;
  }
  if (!state.value.education) {
    showToast("请填写学历");
    return;
  }
  if (!state.value.major) {
    showToast("请填写专业");
    return;
  }
  if (!state.value.startTime && !state.value.endTime) {
    showToast("请选择就读或者结束时间");
    return;
  }

  const res = await editEdu({
    "uuid": store.resumeInfo.id,
    "school_name": state.value.schoolName,
    "highest_education": state.value.education,
    "major": state.value.major,
    "teach_start_time": state.value.startTime,
    "teach_end_time": state.value.endTime,
  });
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
  <van-nav-bar title="教育经历" left-arrow @click-left="closeChange" />
  <div class="position-list">
    <!-- 学校名称 -->
    <div class="user-item">
      <h5>学校名称</h5>
      <van-field
        v-model="state.schoolName"
        label=""
        placeholder="请选填写您的学校名称"
      />
    </div>

    <!-- 学历 -->
    <div class="user-item">
      <h5>学历</h5>
      <van-field
        v-model="state.education"
        label=""
        placeholder="请选择您的学历"
        readonly
        is-link
        @click="state.showEducation = true"
      />
      <van-action-sheet
        v-model:show="state.showEducation"
        :actions="store.highestEducation"
        cancel-text="取消"
        close-on-click-action
        @cancel="state.showEducation = false"
        @select="educationSelect"
      />
    </div>

    <!-- 专业 -->
    <div class="user-item">
      <h5>专业</h5>
      <van-field
        v-model="state.major"
        label=""
        placeholder="请选填写您的专业"
      />
    </div>

    <!-- 就读时间 -->
    <div class="user-item">
      <h5>就读时间</h5>
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
    <button class="wy-submit" @click="submit">保存</button>
  </div>
</template>

<style scoped lang="scss">
.position-list {
  margin: 1.52rem 0.67rem 0;
}
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
</style>
