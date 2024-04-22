<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

// 跳转页面
const gotoPage = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="my-common">
    <div class="my-item" @click="gotoPage('/login/privacyPolicy')">
      <img src="@/assets/img/my/icon-privacy.png" alt="" />
      <label for="">隐私政策</label>
      <span><van-icon name="arrow"></van-icon></span>
    </div>
    <div class="my-item" @click="gotoPage('/login/serviceAgree')">
      <img src="@/assets/img/my/icon-agreement.png" alt="" />
      <label for="">服务协议</label>
      <span><van-icon name="arrow"></van-icon></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.my-common {
  background: #ffffff;
  border-radius: 0.27rem;
  margin-bottom: 0.59rem;

  .my-item {
    height: 2.67rem;
    background: #ffffff;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    padding: 0 0.4rem 0 0rem;
    margin-left: 0.69rem;
    font-size: 0.69rem;
    color: #464646;

    img {
      width: 1.12rem;
      height: 1.12rem;
      margin-right: 0.85rem;
    }
    label {
      flex: 1;
    }
    span {
      display: flex;
      align-items: center;
      text-align: right;

      img {
        width: 1.28rem;
        height: 1.28rem;
        border-radius: 50%;
        margin-right: 0.32rem;
      }
    }
  }
  .my-item:last-child {
    border-bottom: 0;
  }
}
</style>
