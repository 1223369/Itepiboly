<script setup lang="ts">
import { reactive } from "vue";
import { showToast } from "vant";
import TalentList from "@/components/list/TalentList.vue";
import { hotSearch } from "@/api/task";
import { getTalent } from "@/api/talent";
import { talentStore } from "@/store/talent";
import { onBeforeRouteLeave } from "vue-router";
import { onActivated } from "vue";
import { nextTick } from "process";

const store = talentStore();
const his = localStorage.getItem("searchTalent");
const state = reactive({
  // 输入框搜索值
  value: "",
  loading: false,
  // 人才列表
  list: [],
  // 搜索历史
  searchTalent: his ? his.split(",") : [],
  // 当前页数
  pageNum: 1,
  // 每页数据
  pageSize: 10,
  // 任务列表是否加载完成
  finished: false,
  // 是否触发搜索
  searchFlag: false,
});

// 获取热门搜索
const getHotSearch = async () => {
  const res = await hotSearch({
    type: 0,
  });

  if (res) {
    store.setHotSearchList(res.data);
  } else {
    showToast(res.msg);
  }
};

// 获取搜索结果
const getTaskAllList = async () => {
  state.loading = true;

  if (state.pageNum === 1) state.list = [];

  const res = await getTalent({
    position_name: state.value,
    pageNum: state.pageNum,
    pageSize: state.pageSize,
  });
  if (res) {
    state.list = state.list.concat(res.records);
    state.loading = false;

    if (state.list.length >= res.total) {
      state.finished = true;
    } else {
      state.finished = false;
    }
  } else {
    showToast(res?.msg);
    state.loading = false;
  }
};

// 点击搜索事件
const onSearch = (value: string) => {
  if (!value) return;
  // 历史记录重复处理
  if (!state.searchTalent.includes(value)) {
    state.searchTalent.push(value);
    localStorage.setItem("searchTalent", state.searchTalent as any);
  }
  state.searchFlag = true;
  getTaskAllList();
};

// 点击搜索历史事件
const gotoSearch = (item: string) => {
  state.pageNum = 1;
  state.value = item;
  onSearch(item);
};

// 取消搜素事件
const onCancel = () => {
  state.value = "";
  state.searchFlag = false;
};

// 清空历史记录
const clearHistory = () => {
  state.searchTalent = [];
  localStorage.removeItem("searchTalent");
};

// 当任务列表滚动到底部时，加载更多数据
const onLoad = () => {
  state.pageNum++;
  getTaskAllList();
};

// 下拉刷新
const onRefresh = () => {
  state.pageNum = 1;
  getTaskAllList();
};

// 保持页面状态
onActivated(() => {
  // 保持上次浏览位置
  nextTick(() => {
    // 页面刷新后恢复滚动条位置
    window.scrollTo({
      top: store.searchScroll,
      behavior: "smooth",
    });
  });
});

//记录滚动位置
onBeforeRouteLeave((to, from, next) => {
  let searchScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    store.setSearchScrolll(searchScroll);
  next();
});

const leftBack = () => history.back();

// 执行函数
if (store.hotSearchList.length === 0) getHotSearch();
</script>

<template>
  <div :class="state.searchFlag ? 'search-page' : ''">
    <van-nav-bar title="搜索" left-arrow @click-left="leftBack" />

    <div class="search-cont">
      <van-search
        v-model="state.value"
        show-action
        placeholder="请输入搜索的职位"
        @search="onSearch"
        @cancel="onCancel"
      />

      <!-- 搜索历史 -->
      <div class="search-item" v-show="!state.searchFlag">
        <h3>搜索历史<van-icon name="delete-o" @click="clearHistory" /></h3>

        <dl>
          <dt
            v-for="(item, index) in state.searchTalent"
            :key="index"  
            @click="gotoSearch(item)"
          >
            {{ item }}
          </dt>
        </dl>

        <h3>热门搜索</h3>
        <dl>
          <dt
            v-for="item in store.hotSearchList"
            :key="item.id"
            @click="gotoSearch(item.title)"
          >
            {{ item.title }}
          </dt>
        </dl>
      </div>
      <div class="search-list" v-show="state.searchFlag">
        <!-- 任务列表 -->
        <van-pull-refresh
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
            <TalentList :talentList="state.list"></TalentList>

            <!-- 暂无数据显示 -->
            <div
              class="wy-no-data"
              v-show="!state.loading && state.list.length === 0"
            >
              暂无数据
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-page {
  background: #f9f9f9;
  height: 100%;
  min-height: 100vh;

  .van-nav-bar {
    background: none;
  }
}
:deep(.van-search__content) {
  background: #f2f2f2;
  border-radius: 0.85rem;
}
:deep(.van-search__action) {
  font-size: 0.85rem;
  font-weight: 400;
  color: #666666;
  padding-right: 0px;
}
:deep(.van-search--show-action) {
  padding-left: 0px;
  background: none;
}
.search-cont {
  padding: 0 0.64rem;

  h3 {
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 500;
    color: #000000;
    margin: 0.85rem 0 0.85rem;
    display: flex;

    i {
      flex: 1;
      text-align: right;
      font-size: 0.9rem;
    }
  }

  dl{
    min-height: 1rem;
    dt {
    background: #f5f5f5;
    border-radius: 0.16rem;
    padding: 0.45rem;
    font-size: 0.64rem;
    line-height: 0.64rem;
    font-weight: 400;
    color: #333333;
    margin-right: 0.51rem;
    margin-bottom: 0.53rem;
    display: inline-block;
  }
  } 
}
</style>
