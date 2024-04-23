<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});
console.log('list', props.list)
</script>

<template>
  <div class="item" v-for="(item, index) in list" :key="index">
    <div class="item-left">
      <h5>{{ item.contract_name?item.contract_name:'提现' }}</h5>
      <p>{{ item.create_date }}</p>
    </div>
    <div class="item-right">
      <h4>{{ item.price }}</h4>
      <p>余额：{{ item.balance }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  justify-content: space-between;
  padding: 1.04rem 0.8rem 0.93rem;
  border-bottom: 1px solid #eeeeee;

  .item-left {
    h5 {
      font-size: 0.75rem;
      line-height: 0.75rem;
      font-weight: bold;
      color: #333333;
    }

    h4 {
      font-size: 0.75rem;
      line-height: 0.75rem;
      font-weight: 500;
      color: #f4771f;
      text-align: right;
    }

    p {
      font-size: 0.64rem;
      line-height: 0.64rem;
      font-weight: 400;
      color: #808080;
      margin-top: 0.53rem;
    }
  }
}
</style>
