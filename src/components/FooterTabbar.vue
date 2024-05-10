<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { userStore } from "@/store/user";

const route = useRoute();
const router = useRouter();
const store = userStore();

//跳转对应页面
const goToPage = (path: string) => {
  router.push(path);
};
</script>

<template>
  <dl>
    <dt
      v-if="store.role == '1'"
      class="icon-task-bar"
      :class="route.path === '/task' ? 'active' : ''"
      @click="goToPage('/task')"
    >
      <i></i>
      <p>任务</p>
    </dt>
    <dt
      v-if="store.role == '3'"
      class="icon-talent-bar"
      :class="route.path === '/talent' ? 'active' : ''"
      @click="goToPage('/talent')"
    >
      <i></i>
      <p>it人才</p>
    </dt>
    <dt
      class="icon-contract-bar"
      :class="route.path === '/contract' ? 'active' : ''"
      @click="goToPage('/contract')"
    >
      <i></i>
      <p>合约</p>
    </dt>
    <dt
      class="icon-message-bar"
      :class="route.path === '/message' ? 'active' : ''"
      @click="goToPage('/message')"
    >
      <i></i>
      <p>消息</p>
    </dt>
    <dt
      class="icon-my-bar"
      :class="route.path === '/my' ? 'active' : ''"
      @click="goToPage('/my')"
    >
      <i></i>
      <p>我的</p>
    </dt>
  </dl>
</template>

<style scoped lang="scss">
dl {
  display: flex;
  width: 100%;
  height: 3rem;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #dddddd;
  background-color: #ffffff;

  dt {
    flex: 1;
    padding: 0.69rem 0;
    justify-content: center;
    text-align: center;
    font-size: 0.59rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: #666666;

    i {
      width: 0.91rem;
      height: 0.91rem;
      display: block;
      margin: 0 auto;
    }
  }

  dt.active p {
    color: #ff9415;
  }
}

.icon-task-bar i {
  background: url("@/assets/img/icon/bar-task-link.png") no-repeat;
  background-size: 100%;
}
.icon-task-bar.active i {
  background: url("@/assets/img/icon/bar-task-active.png") no-repeat;
  background-size: 100%;
}
.icon-talent-bar i {
  background: url("@/assets/img/icon/bar-talent-link.png") no-repeat;
  background-size: 100%;
}
.icon-talent-bar.active i {
  background: url("@/assets/img/icon/bar-talent-active.png") no-repeat;
  background-size: 100%;
}
.icon-contract-bar i {
  background: url("@/assets/img/icon/bar-contract-link.png") no-repeat;
  background-size: 100%;
}
.icon-contract-bar.active i {
  background: url("@/assets/img/icon/bar-contract-active.png") no-repeat;
  background-size: 100%;
}
.icon-message-bar i {
  background: url("@/assets/img/icon/bar-message-link.png") no-repeat;
  background-size: 100%;
}
.icon-message-bar.active i {
  background: url("@/assets/img/icon/bar-message-active.png") no-repeat;
  background-size: 100%;
}
.icon-my-bar i {
  background: url("@/assets/img/icon/bar-my-link.png") no-repeat;
  background-size: 100%;
}
.icon-my-bar.active i {
  background: url("@/assets/img/icon/bar-my-active.png") no-repeat;
  background-size: 100%;
}
</style>
