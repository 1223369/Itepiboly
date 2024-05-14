<script setup lang="ts">
import { reactive } from "vue";
const props = defineProps({
  tabs: {
    type: Array,
  },
});
const state = reactive({
  type: props.tabs[0].type,
});

// 向父组件传递
const emit = defineEmits(["tabsCall"]);
const setTabList = (type) => {
  state.type = type;
  emit("tabsCall", type);
};
</script>
<template>
  <div class="contract-tab">
    <span
      v-for="(item, index) in tabs"
      :class="Number(state.type) === item.type ? 'active' : ''"
      :key="index"
      @click="setTabList(item.type)"
      >{{ item.text }}<i></i
    ></span>
  </div>
</template>
<style scoped lang="scss">
.contract-tab {
  display: flex;
  background: #ffffff;
  margin-bottom: 0.77rem;
  span {
    font-size: 0.75rem;
    line-height: 0.75rem;
    font-weight: 400;
    color: #666666;
    flex: 1;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    padding: 0.59rem 0;
    text-align: center;
    position: relative;
  }
  span.active {
    color: #ff9415;
    i {
      width: 1.63rem;
      height: 0.05rem;
      background: #ff9415;
      position: absolute;
      bottom: 0px;
      left: 50%;
      margin-left: -0.815rem;
    }
  }
}
</style>
