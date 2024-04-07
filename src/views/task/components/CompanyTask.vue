<script setup lang="ts">
//接收父组件传过来的参数
const props = defineProps({
  taskList: {
    type: Object,
    default: () => [],
  },
});
</script>

<template>
  <div class="company-task">
    <h3>其他任务 <i></i></h3>
    <dl>
      <dt v-for="(item, index) in taskList" :key="index">
        <h4>{{ item.task_name }}<span>{{item.task_budget}}元</span></h4>
        <p>{{item.city}} | {{item.task_cycle}}天 | {{item.service_mode}}</p>
      </dt>
    </dl>
  </div>
</template>

<style scoped lang="scss">
h3{
    font-size: 0.96rem;
    line-height: 0.96rem;
    font-weight: 500;
    color: #333333;
    padding-left: 0.64rem;
    margin-bottom: 0.4rem;
    position: relative;

  i{
    width: 1.87rem;
    height: 0.64rem;
    background: linear-gradient(90deg, #FE8F27, #ffffff);
    opacity: 0.46;
    border-radius: 0.32rem;
    position: absolute;
    left: 0.5rem;
    top: 0.4rem;
    z-index: -1;
  }
}

dl {
  dt{
    padding: 1.4rem 0.64rem;
    border-bottom: 1px solid #f0f0f0;
  }

  h4 {
    font-size: 0.85rem;
    line-height: 0.85rem;
    font-weight: 400;
    color: #333333;
    margin-bottom: 0.48rem;
    display: flex;

    span{
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 400;
    color: #F1983C;
    flex: 1;
    text-align: right; 
    } 
  }
  p{
    font-size: 0.69rem;
    line-height: 0.69rem;
    font-weight: 100;
    color: #333333;
  }
}
</style>
