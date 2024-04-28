<script setup lang="ts">
import { ref } from "vue";
import { myStore } from "@/store/my"
import img1 from "@/assets/img/my/icon-personnel.png";
import bg1 from "@/assets/img/my/personnel-bg.png";
import img2 from "@/assets/img/my/icon-controller.png";
import bg2 from "@/assets/img/my/controller-bg.png";
import img3 from "@/assets/img/my/icon-enterprise.png";
import bg3 from "@/assets/img/my/enterprise-bg.png";

const store = myStore()
if (Object.keys(store.userInfo).length === 0) store.getUserInfo()


const switchList = [
  {
    id: 1,
    name: "IT企业人才",
    img: img1,
    bg: bg1,
    role: store.userInfo.it_enterprise !== 1
  },
  {
    id: 2,
    name: "管理端",
    img: img2,
    bg: bg2,
    role: store.userInfo.manage !== 1
  },
  {
    id: 3,
    name: "企业端",
    img: img3,
    bg: bg3,
    role: store.userInfo.enterprise !== 1
  },
];


</script>

<template>
  <div class="switch-item" v-for="item in switchList" :key="item.id">
    <div class="item-cont">
      <img :src="item.img" alt="" />
      <div>
        <h5>{{ item.name }}</h5>
        <p v-show="item.role">未申请</p>
      </div>
    </div>
    <img class="item-back" :src="item.bg" alt="" />
    <strong v-if="store.userInfo.role === item.id">当前身份</strong>
  </div>
</template>

<style scoped lang="scss">
.switch-item {
  width: 100%;
  height: 4.28rem;
  background: #ffffff;
  border-radius: 0.27rem;
  margin-bottom: 0.8rem;
  display: flex;
  position: relative;
  strong {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 3.44rem;
    height: 0.9rem;
    background: linear-gradient(90deg, #fea829, #fe8f27);
    border-radius: 0rem 0.3rem 0rem 0.3rem;
    font-size: 0.64rem;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
  }

  .item-cont {
    display: flex;
    align-items: center;
    img {
      width: 3.2rem;
      height: 3.2rem;
      margin-right: 0.69rem;
      margin-left: 0.48rem;
    }
    h5 {
      font-size: 0.96rem;
      line-height: 0.96rem;
      font-weight: 500;
      color: #000000;
    }
    p {
      color: #999999;
      font-size: 0.8rem;
      margin-top: 0.72rem;
    }
  }

  .item-back {
    position: absolute;
    right: 0.24rem;
    bottom: 0.13rem;
    width: 2.51rem;
    height: 2.77rem;
  }
}
</style>