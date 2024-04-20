<script setup lang="ts">
import { reactive, inject, provide } from "vue";
import { chatMessageWordsList } from "@/api/message";
import { showToast } from "vant";
import TalkWordsAdd from "./TalkWordsAdd.vue";
import TalkWordsManage from "./TalkWordsManage.vue";

const state = reactive({
  // 常用语列表
  list: [],
  loading: false,
  addBool: false,
  manageBool: false,
});

const { worksChange } = inject("popup");

// 获取列表
const getChatMessageWordsList = async () => {
  state.loading = true;
  const res = await chatMessageWordsList({});

  if (res) {
    state.list = res.data;
  } else {
    showToast(res.msg);
  }
  state.loading = false;
};

// 关闭常用语添加弹窗
const closeWorksAdd = () => {
  state.addBool = false;
  getChatMessageWordsList();
};

// 关闭常用语管理弹窗
const closeWorksManage = () => {
  state.manageBool = false;
  getChatMessageWordsList();
};

// 父子组件通信
provide("popup", {
  closeWorksAdd,
  closeWorksManage,
});

// 方法调用
getChatMessageWordsList();
</script>

<template>
  <div class="talk-word">
    <dl>
      <dt v-for="(item, index) in state.list" :key="index"  @click="worksChange(item.text)">{{ item.text }}</dt>
    </dl>

    <div class="talk-word-btn">
      <p @click="state.addBool = true">
        <img src="@/assets/img/icon/icon-add.png" alt="" />
        添加
      </p>
      <i></i>
      <p @click="state.manageBool = true">
        <img src="@/assets/img/icon/icon-file.png" alt="" />
        管理
      </p>
    </div>

    <!--常用语添加弹窗-->
    <van-popup
      v-model:show="state.addBool"
      position="top"
      duration="0"
      :style="{ width: '100%', height: '100%' }"
    >
      <TalkWordsAdd title="添加常用语"></TalkWordsAdd>
    </van-popup>
    <!--常用语管理弹窗-->
    <van-popup
      v-model:show="state.manageBool"
      position="top"
      duration="0"
      :style="{ width: '100%', height: '100%' }"
    >
      <TalkWordsManage></TalkWordsManage>
    </van-popup>
  </div>
</template>

<style scoped lang="scss">
.talk-word {
  height: 12rem;

  dl {
    height: 8.7rem;
    margin: 0 0.85rem;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    overflow: auto;

    dt {
      font-size: 0.75rem;
      font-weight: 300;
      color: #030303;
      line-height: 1.12rem;
      padding: 1rem 0.21rem;
      border-bottom: 1px solid #eeeeee;
      text-align: left;
    }
    dt:last-child {
      border-bottom: 0;
    }
  }

  .talk-word-btn {
    display: flex;
    margin-top: 1rem;

    p {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 300;
      color: #030303;

      img {
        width: 0.91rem;
        height: 0.91rem;
        margin-right: 0.29rem;
      }
    }

    i {
      width: 0.03rem;
      height: 0.85rem;
      background: #efefef;
      display: inline-block;
    }
  }
}
</style>
