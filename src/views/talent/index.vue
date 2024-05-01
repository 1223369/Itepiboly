<script setup lang="ts">
import { reactive, provide, onActivated } from "vue";
import { taskStore } from "@/store/task";
import FooterTabbar from "@/components/FooterTabbar.vue";
import TalentList from "@/components/list/TalentList.vue";
import Banner from "../task/components/Banner.vue";
import CitySwitch from "../task/components/CitySwitch.vue";
import PositionType from "../task/components/PositionType.vue";
import Screen from "./components/Screen.vue";
import { getTalent } from "@/api/talent";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { nextTick } from "process";
import { showToast } from "vant";

const router = useRouter();
const store = taskStore();
const state = reactive({
  // 切换弹窗
  citySwitchBool: false,
  PositionTypeBool: false,
  screenBool: false,
  // 学历
  highest: "",
  // 薪资待遇
  salary: "",
  // 工作经验
  experience: "",
  // 人才类型
  talentList: [],
  // 当前页数
  pageNum: 1,
  // 每页数据
  pageSize: 10,
  // 职位类型
  positionValue: "",
  // 任务周期
  taskCycle: "",
  // 任务列表是否加载完成
  finished: false,
  // 任务列表是否正在加载
  loading: false,
  // 定时器
  timer: null,
});

// 保持页面状态
onActivated(() => {
  // 保持上次浏览位置
  nextTick(() => {
    // 页面刷新后恢复滚动条位置
    window.scrollTo({
      top: store.taskScroll,
      behavior: "smooth",
    });
  });
});

//记录滚动位置
onBeforeRouteLeave((to, from, next) => {
  console.log('222', 222)
  let taskScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  store.setTaskScroll(taskScroll);
  next();
});

// 关闭选择城市弹窗
const closeCitySwitch = (name: string) => {
  if (name) {
    store.setCityValue(name);
    onRefresh();
  }
  state.citySwitchBool = false;
};
// 关闭职位选择弹窗
const closePositionType = (name: string) => {
  if (name) {
    state.positionType = name;
    onRefresh();
  }
  state.PositionTypeBool = false;
};
// 关闭筛选弹窗
const closeScreen = (obj: string) => {
  if (obj) {
    state.highest = obj.highest;
    state.salary = obj.salary;
    state.experience = obj.experience;
    onRefresh();
  }

  state.screenBool = false;
};

// 获取人才列表数据
const getTalentList = async () => {
  state.loading = true;

  if (state.pageNum === 1) state.talentList = [];

  const res = await getTalent({
    "position_name": state.positionValue,
    "highest_education": state.highest,
    "service_price": state.salary,
    "job_experience": state.experience,
    "pageNum": state.pageNum,
    "pageSize": state.pageSize,
    "city": store.cityValue,
    "it_enterprise": 1,
  });
  if (res) {
    state.talentList = state.talentList.concat(res.records);
    state.loading = false;

    if (state.talentList.length >= res.total) {
      state.finished = true;
    } else {
      state.finished = false;
    }
  } else {
    showToast(res?.msg);
    state.loading = false;
  }
};

// 当任务列表滚动到底部时，加载更多数据
const onLoad = () => {
  state.pageNum++;
  getTalentList();
};

// 下拉刷新
const onRefresh = () => {
  state.pageNum = 1;
  getTalentList();
};

// 跳转搜索页面
const gotoSearch = () => {
  router.push("/talent/search");
};

// 向子组件传递方法
provide("popup", {
  closeCitySwitch,
  closePositionType,
  closeScreen,
});

// 调用函数
getTalentList();
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
      <input
        type="text"
        readonly
        placeholder="请输入想要搜索的内容"
        @click="gotoSearch"
      />
      <router-link
        to="/message/systemList"
        class="task-icon-message"
      ></router-link>
    </div>
    <Banner :type="3"></Banner>

    <!-- 筛选 -->
    <div class="task-title">
      <h3>IT人才<i></i></h3>
      <div class="task-position-pop" @click="state.PositionTypeBool = true">
        {{ state.positionType || "职位类型" }}<span></span>
      </div>
      <div class="task-screen-pop" @click="state.screenBool = true">
        筛选<span></span>
      </div>
    </div>

    <!-- 人才列表 -->
    <van-pull-refresh
      class="task-list"
      v-model="state.loading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <TalentList :talentList="state.talentList"></TalentList>

        <!-- 暂无数据显示 -->
        <div
          class="wy-no-data"
          v-if="!state.loading && state.talentList.length === 0"
        >
          暂无数据
        </div>
      </van-list>
    </van-pull-refresh>
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

    <!-- 职位类型弹窗 -->
    <van-popup
      v-model:show="state.screenBool"
      position="left"
      duration="0.3"
      :style="{ width: '100%', height: '100%' }"
    >
      <Screen></Screen>
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
      background-size: 6%;
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
      position: relative;

      i {
        width: 1.87rem;
        height: 0.64rem;
        background: linear-gradient(90deg, #fe8f27, #ffffff);
        opacity: 0.46;
        border-radius: 0.32rem;
        position: absolute;
        left: -0.1rem;
        top: 0.4rem;
        opacity: 0.4;
      }
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
