<script setup lang="ts">
import { messageStore } from "@/store/message";
import { chatMessageContent, chatMessageContentAdd } from "@/api/message";
import { useRouter } from "vue-router";
import { reactive, provide } from "vue";
import { showToast } from "vant";
import { onBeforeUnmount } from "vue";
import TalkWords from "./components/TalkWords.vue";
import TalkEmoji from "./components/TalkEmoji.vue";

const router = useRouter();
const store = messageStore();
// 将路由携带的任务id赋值
const taskId = router.currentRoute.value.params.taskId;
const receiveId = router.currentRoute.value.params.userId;
const state = reactive({
  list: "", // 消息列表
  loading: false, // 加载中
  value: "", // 输入框的值
  taskName: "", // 任务名称
  createSetInterval: null, // 轮询定时器
  worksVisible: false, // 常用语列表是否显示
  emojiVisible: false, // emoji列表是否显示
});

store.getSystemMessageList();

// 请求对话数据
const getChatMessageContent = async () => {
  state.loading = true;
  const res = await chatMessageContent({
    receive_id: receiveId,
    things_id: taskId,
    things_type: 0,
  });
  if (res) {
    state.list = res.data;
    state.taskName = (res.data[0] && res.data[0].task_name) || "任务";
  } else {
    showToast(res.msg);
  }
};

// 轮询
const createInterval = () => {
  stopSetInterval();
  state.createSetInterval = setInterval(() => {
    getChatMessageContent();
  }, 5000);
};

// 停止轮询
const stopSetInterval = () => {
  if (state.createSetInterval) {
    clearInterval(state.createSetInterval);
    state.createSetInterval = null;
  }
};

// 点击常用语
const worksClick = () => {
  state.emojiVisible = false;
  state.worksVisible = !state.worksVisible;
};

// 向输入框中插入常用语
const worksChange = (value: string) => {
  state.value = value;
  state.worksVisible = false;
};

const emojiClick = () => {
  state.worksVisible = false;
  state.emojiVisible = !state.emojiVisible;
};

// 向输入框中插入emoji
const emojiChange = (value: string) => {
  state.value = state.value + value;
};

// 发送消息
const sendSubmit = async () => {
  state.loading = true;
  const res = await chatMessageContentAdd({
    receive_id: receiveId,
    things_id: taskId,
    content: state.value,
    things_type: 0,
  });
  if (res) {
    getChatMessageContent
    state.value = "";
    state.worksVisible = false;
    state.emojiVisible = false;
  }
  showToast(res.msg)
};

// 父子组件通信
provide("popup", {
  worksChange,
  emojiChange,
});

// 方法调用
getChatMessageContent();
createInterval();

// 生命周期
// 页面注销前
onBeforeUnmount(() => {
  // 停止轮询
  stopSetInterval();
});

const leftBack = () => history.back();
</script>

<template>
  <van-nav-bar fixed :title="state.taskName" left-arrow @click-left="leftBack" />

  <!-- 对话内容 -->
  <div class="talk-page">
    <dl>
      <dt
        v-for="(item, index) in state.list"
        :key="index"
        :class="item.receive_id == receiveId ? 'active' : ''"
      >
        <h5>{{ item.create_time }}</h5>
        <div>
          <img
            v-if="item.receive_id == receiveId"
            :src="item.senderPhoto"
            alt=""
          />
          <img v-else :src="item.receivePhoto" alt="" />
          <p>{{ item.text }}</p>
        </div>
      </dt>
    </dl>
  </div>

  <!-- 对话输入框 -->
  <div class="talk-bottom">
    <div class="talk-input">
      <span @click="worksClick">常用语</span>
      <input v-model="state.value" type="text" />
      <van-icon name="smile-o" @click="emojiClick" />
      <span @click="sendSubmit">发送</span>
    </div>
    <!-- 常用语列表 -->
    <TalkWords v-if="state.worksVisible"></TalkWords>
    <!-- 表情列表 -->
    <TalkEmoji v-if="state.emojiVisible"></TalkEmoji>
  </div>
</template>

<style scoped lang="scss">
.talk-page {
  width: 99%;
  background: #f3f3f3;
  margin-top: 2.8rem;
  padding-bottom: 1rem;

  dl {
    padding: 0.96rem 0.64rem;
    dt {
      overflow: hidden;

      h5 {
        font-size: 0.64rem;
        line-height: 0.64rem;
        font-weight: 300;
        color: #999999;
        text-align: center;
        margin-bottom: 0.69rem;
      }

      div {
        display: flex;

        img {
          width: 2.14rem;
          height: 2.14rem;
          border-radius: 50%;
          margin-right: 0.64rem;
        }

        p {
          width: 12.53rem;
          background: #ffffff;
          border: 1px solid #efefef;
          border-radius: 0.11rem;
          padding: 0.4rem 0.69rem;
          margin-bottom: 1.47rem;
        }
      }
    }

    dt.active {
      div {
        display: block;
        img {
          float: right;
          margin-right: 0;
          margin-left: 0.64rem;
        }

        p {
          float: right;
          font-size: 0.75rem;
          font-weight: 300;
          color: #ffffff;
          border: 1px solid #ff9415;
          background: #ff9415;
          border-radius: 0.13rem;
          position: relative;
        }
      }
    }
  }
}

.talk-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: #ffffff;
  text-align: center;
  z-index: 1;
  border-top: 1px solid #eeeeee;

  .talk-input {
    display: flex;
    align-items: center;
    height: 2.6rem;

    span {
      width: 2.61rem;
      height: 1.33rem;
      line-height: 1.33rem;
      background: #ff9415;
      border-radius: 0.13rem;
      font-size: 0.64rem;
      font-weight: 100;
      text-align: center;
      color: #ffffff;
      margin-left: 0.59rem;
    }

    span:last-child {
      margin: 0 0.59rem 0 0;
    }

    input {
      flex: 1;
      height: 1.8rem;
      background: #fbfbfb;
      border: 1px solid #efefef;
      border-radius: 0.13rem;
      padding: 0 0.5rem;
      margin: 0 0.4rem 0 0.5rem;
    }

    i {
      font-size: 1.36rem;
      margin-right: 0.4rem;
    }
  }
}
</style>
