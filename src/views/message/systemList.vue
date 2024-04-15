<script setup lang="ts">
import { messageStore } from "@/store/message";

const store = messageStore();
store.getSystemMessageList();



const leftBack = () => history.back();
</script>

<template>
  <van-nav-bar title="系统消息" left-arrow @click-left="leftBack" />

  <dl>
    <dt v-for="item in store.systemMessageList" :key="item.id">
      <h3>{{ item.title }}
        <span>{{ item.specific_time }}</span>
      </h3>
      <p>{{ item.content }}</p>
      <router-link :to="'/message/systemDetails/'+item.id">点击查看 ></router-link>
    </dt>
  </dl>
</template>

<style scoped lang="scss">
dl {
  padding: 0.64rem;
  background: #f9f9f9;
  height: calc(100vh - 46px - 1.28rem);
  overflow: auto;
  dt {
    background: #FFFFFF;
    border-radius: 0.27rem;
    margin-bottom: 0.59rem;
    padding: 0.88rem 0.5rem;
    text-align: center;

    h3 {
      font-size: 0.8rem;
      line-height: 0.8rem;
      font-weight: 400;
      color: #333333;
      display: flex;
      align-items: center;
      span {
        flex: 1;
        text-align: right;
        font-size: 0.69rem;
        line-height: 0.69rem;
        font-weight: 400;
        color: #999999;
      }
    }

    p {
      font-size: 0.69rem;
      font-weight: 300;
      color: #666666;
      line-height: 1.23rem;
      text-align: left;
      border-top: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
      padding: 1.07rem 0;
      margin-top: 0.8rem;
      margin-bottom: 0.83rem;
    }

    a {
      font-size: 0.75rem;
      line-height: 0.75rem;
      font-weight: 300;
      color: #666666;
    }
  }
}
</style>
