<script setup lang="ts">
import { reactive } from "vue";
import {} from "@/api/message";
import { showToast } from "vant";

const state = reactive({
  // 合同列表
  list: [],
  loading: false,
  // 页面是不是首次加载
  activeIndex: 0,
});

// 获取列表
const getContractList = async () => {
  state.loading = true;
  // const res = await contractList({});

  // if (res) {
  //   state.list = res.records;
  // } else {
  //   showToast(res.msg);
  // }
  state.loading = false;
  state.activeIndex++;
};

// 方法调用
getContractList();
</script>

<template>
  <div class="talk-word">
    <dl>
      <dt></dt>
    </dl>

    <div class="talk-word-btn">
      <p>
        <img src="@/assets/img/icon/icon-add.png" alt="" />
        添加
      </p>
      <i></i>
      <p>
        <img src="@/assets/img/icon/icon-file.png" alt="" />
        管理
      </p>
    </div>
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
