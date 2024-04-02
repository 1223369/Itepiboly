<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

//接收父组件传过来的参数
const props = defineProps({
  messageList: {
    type: Array,
    default: () => [],
  },
});

//跳转对应页面
const gotoDetail = (id: number) => {
  router.push("/message/talk" + id);
};
</script>

<template>
  <dl v-for="(item, index) in messageList" :key="index" @click="gotoDetail((item as any).id)">
    <!-- 头像姓名 -->
    <dd>
      <img src="@/assets/img/icon/icon-message.png" alt="公司" /></img>
      <span></span>
    </dd>

    <!-- 消息内容 -->
    <dt>
      <h3>广州爱沦科技有限公司
        <span>6分钟前</span>
      </h3>
      <p>现在过来快快快老板陈烜等着你</p>
    </dt>
  </dl>
</template>

<style scoped lang="scss">
dl {
  font-size: 0.64rem;
  color: #666666;
  padding: 0.9rem 0;
  margin: 0 0.67rem;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;

  dd {
    position: relative;
    ;
    margin-right: 0.56rem;

    img {
      width: 2.61rem;
      height: 2.61rem;
      border-radius: 50%;
    }

    span {
      position: absolute;
      top: 0;
      right: 0;
      width: 0.32rem;
      height: 0.32rem;
      background: #FF0000;
      border-radius: 50%;
    }
  }

  dt {
    flex: 1;
    h3 {
      font-size: 0.8rem;
      line-height: 0.8rem;
      font-weight: 500;
      color: #333333;
      margin-bottom: 0.43rem;

      span {  
        float: right;
        color: #999999;
        font-size: 0.64rem;
        font-weight: 100;
      }
    }

    p {
      font-size: 0.69rem;
      line-height: 0.69rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
