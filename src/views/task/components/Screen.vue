<script setup lang="ts">
import { inject, reactive } from "vue";
import { screenList } from "@/api/task";
import { taskStore } from "@/store/task";
import { showToast } from "vant";

const store = taskStore();
// 获取父组件传递的方法
const { closeScreen } = inject("popup");

const state = reactive({
  // 职位类型默认值
  mode: '',
  cycle: ''
});

// 获取筛选数据
const getScreenList = async () => {
  const res = await screenList();
  if (res) {
    store.setScreenList(res.data);
  } else {
    showToast(res?.msg);
  }
};
if (!store.screenList.serviceMode) getScreenList();

// 服务方式点击事件
const modeChange = (name: string) => {
  state.mode = name;
}
// 服务周期点击事件
const cycleChange = (name: string) => {
  state.cycle = name;
}

// 清除筛选
const clearScreen = () => {
  state.mode = '';
  state.cycle = '';
}

const leftBack = () => closeScreen();
</script>

<template>
  <van-nav-bar title="筛选" left-arrow @click-left="leftBack">
    <template #left>
      <van-icon name="cross" size="18" />
    </template>
  </van-nav-bar>

  <!-- 职位类型 -->
  <div class="task-screen">
    <h3>服务方式</h3>
    <div class="screen-item">
      <span :class="{active: state.mode === item}" v-for="(item, index) in store.screenList.serviceMode" :key="index" @click="modeChange(item)">{{ item }}</span>
    </div>
    <h3>任务周期</h3>
    <div class="screen-item">
      <span :class="{active: state.cycle === item}" v-for="(item, index) in store.screenList.taskCycle" :key="index" @click="cycleChange(item)">{{ item }}</span>
    </div>
    <div class="screen-footer">
      <button class="screen-clear" @click="clearScreen">清除</button>
      <van-button type="primary" block @click="closeScreen(state)">确定</van-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-screen {
  padding: 0 0.6rem;

  h3 {
    font-size: 0.96rem;
    line-height: 0.96rem;
    font-weight: 500;
    color: #333333;
    margin: 0.8rem 0;
  }

  span {
    width: 5.76rem;
    height: 1.6rem;
    line-height: 1.6rem;
    background: #f5f6f8;
    border: 1px solid #f5f6f8;
    border-radius: 0.16rem;
    font-size: 0.75rem;
    font-weight: 400;
    color: #666666;
    text-align: center;
    display: inline-block;
    margin: 0 0.59rem 0.51rem 0;
  }

  span.active {
    color: #ff8a00;
    border: 1px solid #fe8f27;
    background: #ffffff;
  }

  span:nth-child(3n) {
    margin-right: 0;
  }

  .screen-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffffff;
    box-shadow: 0rem 0rem 1rem 0rem rgba(208, 208, 208, 0.39);
    padding: 0.83rem 0.64rem;
    display: flex;
    width: calc(100vw - 1.40rem);

    .screen-clear {
      width: 5.33rem;
      height: 2.35rem;
      background: #f5f6f8;
      border-radius: 0.27rem;
      border: 0;
      font-size: 0.8rem;
      font-weight: bold;
      color: #666565;
      margin-right: 0.64rem;
    }
  }
}
</style>
