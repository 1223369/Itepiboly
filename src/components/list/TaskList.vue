<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

//接收父组件传过来的参数
const props = defineProps({
  taskList: {
    type: Array<any>,
    default: () => []
  }
});

//跳转对应页面
const gotoDetail = (id: number) => {
  router.push('/task/detail/'+id);
};
</script>

<template>
  <div class="task-item" v-for="(item, index) in taskList" :key="index" @click="gotoDetail((item as any).task_id)">
    <!-- 任务标题及任务紧急程度 -->
    <div class="task-item-top">
      <h3>{{ item.task_name }}</h3>
      <span v-if="item.is_emergency == 1">紧急</span>
    </div>

    <!-- 任务描述 -->
    <dl>
      <dt>
        <h5>任务预算</h5>
        <strong>￥{{item.task_budget}}</strong>
      </dt>
      <dt>
        <h5>任务周期</h5>
        <strong>{{item.task_budget}}天</strong>
      </dt>
      <dt>
        <h5>服务方式</h5>
        <strong>{{item.service_mode}}</strong>
      </dt>
    </dl>

    <!-- 任务要求 -->
    <p>任务要求：{{item.task_ask}}</p>

    <!-- 任务发起公司和地址 -->
    <div class="task-item-buttom">
      <label for="">{{item.company_name}}</label>
      <span>
        <van-icon name="location-o" />
        {{item.city}}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-item {
  background: #ffffff;
  border-radius: 0.53rem;
  margin: 0 0 0.53rem;
  padding: 0.88rem 0.48rem 0.75rem;
  position: relative;
  font-size: 0.69rem;
  font-weight: 100;
  color: #666666;


  .task-item-top {
    display: flex;

    h3 {
      font-size: 0.91rem;
      line-height: 0.91rem;
      font-weight: 400;
      color: #333333;
      margin-bottom: 1.01rem;
    }
    span {
      position: absolute;
      right: 0;
      width: 2.29rem;
      height: 1.08rem;
      line-height: 1.08rem;
      background: linear-gradient(90deg, #fea829, #fe8f27);
      border-radius: 0.53rem 0 0 0.53rem;
      text-align: center;
      font-size: 0.59rem;
      color: #ffffff;
    }
  }

  dl {
    display: flex;
    margin-bottom: 0.8rem;

    dt {
      margin-right: 1.44rem;

      h5 {
        font-size: 0.69rem;
        line-height: 0.69rem;
        margin-bottom: 0.53rem;
        font-weight: 100;
        color: #999999;
      }

      strong {
        font-size: 0.64rem;
        line-height: 0.64rem;
        display: block;
        font-weight: 500;
        color: #333333;
      }
    }
  }

  p {
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
  }

  .task-item-buttom {
    display: flex;
    border-top: 1px solid #f5f5f5;
    margin-top: 0.72rem;
    padding-top: 0.72rem;
    line-height: 0.69rem;

    label {
      flex: 1;
    }

    span {
      text-align:right;
    }

    i {
      font-size: 0.8rem;
      font-weight: 600;
      margin-right: 0.1rem;
    }
  }
}
</style>
