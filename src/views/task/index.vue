<script setup lang="ts">
import { reactive, provide } from "vue";
import { taskStore } from "@/store/task"
import FooterTabbar from "@/components/FooterTabbar.vue";
import TaskList from "@/components/list/TaskList.vue";
import Banner from "./components/Banner.vue";
import CitySwitch from "./components/CitySwitch.vue";
import PositionType from "./components/PositionType.vue";
import Screen from "./components/Screen.vue";


const store = taskStore();
const state = reactive({
  // 切换城市弹窗
  citySwitchBool: false,
  PositionTypeBool: true,
})

// 关闭选择城市弹窗
const closeCitySwitch = (name) => {
  if (name) {
    store.setCityValue(name);
  }

  state.citySwitchBool = false;
}


// 向子组件传递方法
provide('popup', {
  closeCitySwitch,
})


const taskList = reactive([{ id: 1 }, { id: 2 }]);
</script>

<template>
  <div class="task-page">
    <!-- 头部搜索框城市等 -->
    <div class="task-top">
      <div class="task-top-city" @click="state.citySwitchBool = true">
        <i></i>
        <strong>{{ store.cityValue }}</strong>
        <span></span>
      </div>
      <!-- 输入框 -->
      <input type="text" readonly placeholder="请输入想要搜索的内容" />
      <route-link
        to="/message/systemList"
        class="task-icon-message"
      ></route-link>
    </div>
    <Banner></Banner>

    <!-- 任务列表 -->

    <div class="task-title">
      <h3>最新任务</h3>
      <div class="task-position-pop">职位类型<span></span></div>
      <div class="task-screen-pop">筛选<span></span></div>
    </div>

    <TaskList :taskList="taskList"></TaskList>

    <!-- 切换城市左侧弹窗 -->
    <van-popup
      v-model:show="state.citySwitchBool"
      position="left"
      duration="0.3"
      :style="{ width: '100%', height: '100%' }"
    >
    <CitySwitch></CitySwitch>
  </van-popup>

  <!-- 职位类型弹窗 -->
  <van-popup
      v-model:show="state.PositionTypeBool"
      position="left"
      duration="0.3"
      :style="{ width: '100%', height: '100%' }"
    >
    <PositionType></PositionType>
  </van-popup>
  </div>

  <FooterTabbar></FooterTabbar>
</template>

<style scoped lang="scss">
.task-page {
  background-color: #f9f9f9;
  padding: 0 0.59rem 3rem;
  min-height: calc(100vh - 3rem);

  .task-top {
    display: flex;
    align-items: center;
    padding: 0.5rem 0 0.91rem;

    .task-top-city {
      display: flex;
      align-items: center;

      i {
        width: 1.04rem;
        height: 1.01rem;
        background: url("@/assets/img/icon/icon-place.png") no-repeat;
        background-size: 100%;
      }
      strong {
        font-size: 0.8rem;
        font-weight: 500;
        color: #333333;
        margin-left: 0.1rem;
      }
      span {
        margin: 0 0.6rem 0 0.2rem;
        display: inline-block;
        border-left: 0.18rem solid transparent;
        border-right: 0.18rem solid transparent;
        border-top: 0.36rem solid #333333;
      }
    }

    input {
      flex: 1;
      height: 1.71rem;
      background: #ffffff url("@/assets/img/icon/icon-search.png") 0.35rem
        0.3rem no-repeat;
      background-size: 9%;
      border: 0.03px solid #ededed;
      border-radius: 0.85rem;
      font-size: 0.69rem;
      font-weight: 300;
      color: #999999;
      padding-left: 1.7rem;
    }

    .task-icon-message {
      width: 1.31rem;
      height: 1.28rem;
      background: url("@/assets/img/icon/icon-remind.png") no-repeat;
      background-size: 100%;
      margin-left: 0.27rem;
    }
  }

  .task-title {
    display: flex;
    align-items: center;
    margin-bottom: 0.67rem;
    margin-top: 1.44rem;

    h3 {
      flex: 1;
      font-size: 0.96rem;
      line-height: 0.96rem;
      font-weight: bold;
      color: #333333;
    }

    .task-position-pop,
    .task-screen-pop {
      font-size: 0.75rem;
      line-height: 0.75rem;
      font-weight: 300;
      color: #666666;
      margin-left: 0.56rem;
      span {
        display: inline-block;
        border-left: 0.18rem solid transparent;
        border-right: 0.18rem solid transparent;
        border-top: 0.36rem solid #333333;
        margin: 0 0 0.09rem 0.25rem;
      }
    }
  }
}
</style>
