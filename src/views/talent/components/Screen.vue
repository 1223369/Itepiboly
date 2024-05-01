<script setup lang="ts">
import { inject, reactive } from "vue";
import { getScreenl } from "@/api/talent";
import { talentStore } from "@/store/talent";
import { showToast } from "vant";

const store = talentStore();
// 获取父组件传递的方法
const { closeScreen } = inject("popup");

const state = reactive({
  highest: '', // 最高学历
  salary: '', // 薪资待遇
  experience: '', // 经验要求
});

// 获取筛选数据
const getScreenList = async () => {
  const res = await getScreenl();
  if (res) {
    store.setScreen(res.data);
  } else {
    showToast(res.msg);
  }
};

// 最高学历点击事件
const highestChange = (name: string) => {
  state.highest = name;
}
// 薪资待遇点击事件
const salaryChange = (name: string) => {
  state.salary = name;
}
// 经验要求点击事件
const experienceChange = (name: string) => {
  state.experience = name;
}

// 清除筛选
const clearScreen = () => {
  state.highest = '';
  state.salary = ''; 
  state.experience = '';
}

const leftBack = () => closeScreen(); 


// 函数调用
if (!store.highestList.length) getScreenList();
</script>

<template>
  <van-nav-bar title="筛选" left-arrow @click-left="leftBack">
    <template #left>
      <van-icon name="cross" size="18" />
    </template>
  </van-nav-bar>

  <!-- 职位类型 -->
  <div class="task-screen">
    <h3>学历要求</h3>
    <div class="screen-item">
      <span :class="{active: state.highest === item}" v-for="(item, index) in store.highestList" :key="index" @click="highestChange(item)">{{ item.value }}</span>
    </div>
    <h3>薪资待遇</h3>
    <div class="screen-item">
      <span :class="{active: state.salary === item}" v-for="(item, index) in store.salaryList" :key="index" @click="salaryChange(item)">{{ item }}</span>
    </div>
    <h3>经验要求</h3>
    <div class="screen-item">
      <span :class="{active: state.experience === item}" v-for="(item, index) in store.experienceList" :key="index" @click="experienceChange(item)">{{ item.value }}</span>
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
      width: 20%;
      height: 2.35rem;
      background: #f5f6f8;
      border-radius: 0.27rem;
      border: 0;
      font-size: 0.8rem;
      font-weight: bold;
      color: #666565;
      margin: 0.2rem 1rem 0 0;
    }
  }
}
</style>
