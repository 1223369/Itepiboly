<script setup lang="ts">
import FooterTabbar from "@/components/FooterTabbar.vue";
import { myStore } from "@/store/my";
import { useRouter } from "vue-router";

const store = myStore();
const router = useRouter();
if (!store.userInfo.user_name) store.getUserInfo()

// 前往设置页
const gotoPage = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="my-page">
    <van-nav-bar title="我的">
      <template #right>
        <van-icon name="setting-o" @click="gotoPage('/my/set')" />
      </template>
    </van-nav-bar>

    <!-- 个人信息 -->
    <div class="my-info">
      <img v-if="store.userInfo.it_head" :src="store.userInfo.it_head" />
      <img v-else src="@/assets/img/icon/icon-message.png" />
      <div @click="gotoPage('/my/user')">
        <h3>{{ store.userInfo.user_name }}<span></span></h3>
        <p>{{store.userInfo.role===1?'IT企业人才':store.userInfo.role===3?'企业端':'管理端'}}</p>
      </div>
      <i @click="gotoPage('/my/account') "></i>
    </div>

    <!-- 我的收藏部分 -->
    <div class="my-type">
      <router-link to="/my/collect">
        <img src="@/assets/img/my/icon-my-collection.png" alt="" />
        <span>我的收藏</span>
      </router-link>
      <strong></strong>
      <router-link to="/my/resume">
        <img src="@/assets/img/my/icon-my-resume.png" alt="" />
        <span>我的简历</span>
      </router-link>
    </div>

    <!-- 我的合约部分 -->
    <div class="my-contract">
      <div class="my-title">
        <h3>我的合约</h3>
        <span @click="gotoPage('/my/contract/0')">查看全部合约<van-icon name="arrow" /></span>
      </div>
      <div class="my-contract-cur">
        <span @click="gotoPage('/my/contract/2')">
          <img src="@/assets/img/my/contract-be-signed.png" alt="" />
          <p>待签约</p>
        </span>
        <span @click="gotoPage('/my/contract/3')">
          <img src="@/assets/img/my/contract-in-performance.png" alt="" />
          <p>履约中</p>
        </span>
        <span @click="gotoPage('/my/contract/4')">
          <img src="@/assets/img/my/contract-completed.png" alt="" />
          <p>已完成</p>
        </span>
        <span @click="gotoPage('/my/contract/5')">
          <img src="@/assets/img/my/contract-canceled.png" alt="" />
          <p>已取消</p>
        </span>
      </div>
    </div>

    <!-- 常用功能部分 -->
    <div class="my-common">
      <div class="my-title">
        <h3>常用功能</h3>
      </div>
      <div class="my-item">
        <img src="@/assets/img/my/icon-real-name-auth.png" alt="" />
        <label for="">实名认证</label>
        <span><van-icon name="arrow"></van-icon></span>
      </div>
      <div class="my-item">
        <img src="@/assets/img/my/icon-account-manager.png" alt="" />
        <label for="">专属客户经理</label>
        <span
          ><img
            src="@/assets/img/icon/icon-message.png"
            alt="" />无忧经理<van-icon name="arrow"></van-icon
        ></span>
      </div>
    </div>
    <div class="my-common">
      <div class="my-item">
        <img src="@/assets/img/my/icon-feedback.png" alt="" />
        <label for="">意见反馈</label>
        <span><van-icon name="arrow"></van-icon></span>
      </div>
      <div class="my-item">
        <img src="@/assets/img/my/icon-about.png" alt="" />
        <label for="">关于我们</label>
        <span><van-icon name="arrow"></van-icon></span>
      </div>
    </div>
    <div class="my-common">
      
      <div class="my-item">
        <img src="@/assets/img/my/icon-switch-role.png" alt="" />
        <label for="">切换身份</label>
        <span>当前为{{store.userInfo.role===1?'IT企业人才':store.userInfo.role===3?'企业端':'管理端'}}身份<van-icon name="arrow"></van-icon></span>
      </div>
    </div>
  </div>
  <FooterTabbar></FooterTabbar>
</template>

<style scoped lang="scss">
:deep(.van-nav-bar) {
  background: none;

  .van-icon {
    font-size: 1.12rem;
    color: #ffffff;
  }
}
:deep(.van-nav-bar__title) {
  color: #ffffff;
  font-size: 0.96rem;
}

:deep(.van-hairline--bottom:after) {
  border: 0;
}

:deep(.van-nav-bar__right) {
  padding-right: 0;
}

.my-page {
  padding: 0 0.77rem 3rem;
  background: #fbfbfb url(@/assets/img/my/top-background.png) center -0.8rem no-repeat;
  background-size: contain;
  overflow: auto;

  // 个人信息部分
  .my-info {
    display: flex;
    align-items: center;
    margin: 0.8rem 0 0.93rem;
    position: relative;
    right: -0.77rem;

    img {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      margin-right: 0.85rem;
    }

    div {
      h3 {
        font-size: 0.96rem;
        line-height: 0.96rem;
        font-weight: 400;
        color: #ffffff;
        margin-bottom: 0.48rem;
      }
      span {
        width: 0.56rem;
        height: 0.56rem;
        margin-left: 0.59rem;
        display: inline-block;
        background: url(@/assets/img/my/icon-edit.png) no-repeat;
        background-size: 100%;
      }
      p {
        font-size: 0.69rem;
        line-height: 0.69rem;
        font-weight: 400;
        color: #ffffff;
      }
    }
    i {
      width: 4.91rem;
      height: 1.49rem;
      background: url(@/assets/img/my/icon-my-account.png) no-repeat;
      background-size: 100%;
      position: absolute;
      right: 0;
    }
  }

  // 我的收藏部分
  .my-type {
    display: flex;
    align-items: center;
    height: 3.31rem;
    background: #ffffff;
    box-shadow: 0rem 0rem 1rem 0rem rgba(49, 57, 73, 0.09);
    border-radius: 0.27rem;
    margin-bottom: 0.53rem;

    strong {
      width: 0.03rem;
      height: 1.95rem;
      background: #ededed;
      margin-left: 3.3rem;
    }

    a {
      display: flex;
      align-items: center;
      margin-left: 1.92rem;
      img {
        width: 2.24rem;
        height: 2.24rem;
        margin-right: 0.51rem;
      }
      span {
        font-size: 0.69rem;
        line-height: 0.69rem;
        font-weight: 400;
        color: #666666;
      }
    }
  }

  // 我的合约部分
  .my-contract {
    height: 7.9rem;
    background: #ffffff;
    border-radius: 0.27rem;
    margin-bottom: 0.59rem;

    h3 {
      font-size: 0.8rem;
      line-height: 0.8rem;
      font-weight: 400;
      color: #333333;
      flex: 1;
    }
    span {
      text-align: right;
      font-size: 0.64rem;
      color: #464646;
    }

    .my-contract-cur {
      height: 5.17rem;
      display: flex;
      align-items: center;
      vertical-align: center;

      span {
        flex: 1;
        text-align: center;
        font-size: 0.69rem;
        color: #464646;
      }
      img {
        width: 1.39rem;
        height: 1.39rem;
        display: block;
        margin: 0 auto 0.59rem;
      }
    }
  }

  .my-title {
    height: 2.69rem;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    padding: 0 0.8rem;
  }

  // 常用功能部分
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
}
</style>
