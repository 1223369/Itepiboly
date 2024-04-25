<script setup lang="ts">
import { ref, inject, provide } from "vue";
import PositionType from "../../../task/components/PositionType.vue";
import ServiceTypePopup from "./ServiceTypePopup.vue";
import { myStore } from '@/store/my';
import { jobIntention } from '@/api/my'
import { showToast } from "vant";

const store = myStore();
const state = ref({
  showPositionType: false, // 是否显示职位类型弹窗
  positionValue: "", // 职位类型值
  showServiceType: false, // 是否显示服务类型弹窗
  serviceValue: "", // 服务类型值
  showPriceType: false, // 是否显示服务价格弹窗
  priceValue: "", // 服务价格值
});

// 回填数据
if (Object.keys(store.resumeInfo).length !== 0)  {
  state.value.positionValue = store.resumeInfo.position_name;
  state.value.serviceValue = store.resumeInfo.service_mode;
  state.value.priceValue = store.resumeInfo.service_price;
}

// 关闭职位类型弹窗
const closePositionType = (name) => {
  if (name) state.value.positionValue = name;
  state.value.showPositionType = false;
};

// 关闭服务类型弹窗
const closeServiceType = (name) => {
  console.log("name", name);
  if (name) state.value.serviceValue = name;
  state.value.showServiceType = false;
};

// TODO: 选择服务价格
const priceSelect = (value) => {
  state.value.priceValue = value.name;
}

// TODO: 提交
const submit = async() => {
  if (!state.value.positionValue) {
    showToast("请选择职务类型")
    return;
  }
  if (!state.value.serviceValue) {
    showToast("请选择服务类型")
    return;
  }
  if (!state.value.priceValue) {
    showToast("请选择服务价格")
    return;
  }
  const res = await jobIntention({
    "position_name": state.value.positionValue,
    "service_mode": state.value.serviceValue,
    "service_price": state.value.priceValue
  })
  if (res) {
    closeChange();
    showToast("保存成功")
  } else {
    showToast("保存失败")
  }
};

// 注入父组件的方法
const { closeChange } = inject("popup");
// 向子组件注入方法
provide("popup", {
  closePositionType,
  closeServiceType,
});
</script>

<template>
  <van-nav-bar title="求职意愿" left-arrow @click-left="closeChange" />
  <div class="position-list">
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

    <!-- 服务类型 -->
    <div class="user-item">
      <h5>服务类型</h5>
      <van-field
        v-model="state.serviceValue"
        label=""
        placeholder="请选择您的服务类型"
        readonly
        is-link
        @click="state.showServiceType = true"
      />
    </div>

    <!-- 服务价格 -->
    <div class="user-item">
      <h5>服务价格</h5>
      <van-field
        v-model="state.priceValue"
        label=""
        placeholder="请选择您的服务价格"
        readonly
        is-link
        @click="state.showPriceType = true"
      />
      <van-action-sheet
        v-model:show="state.showPriceType"
        :actions="store.salaryScope"
        cancel-text="取消"
        close-on-click-action
        @cancel="state.showPriceType = false"
        @select="priceSelect"
      />
    </div>
    <button class="wy-submit" @click="submit">保存</button>

    <!--职位类型弹窗-->
    <van-popup
      v-model:show="state.showPositionType"
      position="top"
      duration="0"
      :style="{ width: '100%', height: '100%' }"
    >
      <PositionType></PositionType>
    </van-popup>

    <!--服务类型弹窗-->
    <van-popup
      v-model:show="state.showServiceType"
      position="top"
      duration="0"
      :style="{ width: '100%', height: '100%' }"
    >
      <ServiceTypePopup></ServiceTypePopup>
    </van-popup>
  </div>
</template>

<style scoped lang="scss">
.position-list {
  margin: 1.52rem 0.67rem 0;
}
</style>
