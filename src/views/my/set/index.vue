<script setup lang="ts">
import { useRouter } from "vue-router";
import { userStore } from "@/store/user";
import { myStore } from "@/store/my"
import setItem from "../components/setItem.vue";
import { showToast } from "vant";

const router = useRouter();
const store = userStore();
const my = myStore();

// 退出登录
const logout = () => {
  store.logout();
  my.logout();
  router.push("/login");
  showToast({
    message: "退出登录成功"
  });
};
// 返回上一页
const leftBack = () => history.back();
</script>

<template>
  <div class="set-page">
    <van-nav-bar title="我的设置" left-arrow @click-left="leftBack" />
    <setItem></setItem>
    <button class="set-btn" @click="logout">退出登录</button>
  </div>
</template>

<style scoped lang="scss">
.set-page {
  height: 100vh;
  background: #f9f9f9;

  .set-btn {
    height: 2.35rem;
    line-height: 2.35rem;
    background: linear-gradient(90deg, #ffa400, #ff8900);
    border-radius: 0.27rem;
    font-size: 0.8rem;
    color: #ffffff;
    border: 0;
    text-align: center;
    width: calc(100vw - 1.28rem);
    margin: 0 0.64rem;
  }
}
</style>
