<script setup lang="ts">
import { inject } from "vue";

// 接收父组件方法
const { emojiChange } = inject("popup");

const list = ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','🫠','😉','😊','😇','😕','🫤','😟','🙁','☹','😮','😲','😯','😱','😭','😢','😥','😰','😨','😦','🥹','🥺','😳','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿']
</script>

<template>
 <div>
  <span v-for="(item, index) in list" :key="index" @click="emojiChange(item)">{{ item }}</span>
  </div>
</template>

<style scoped lang="scss">
div {
  height: calc(12rem - 0.64rem);
  margin-top: 0.64rem;
  overflow: auto;

  span {
    width: 14.28%;
    display: inline-block;
    text-align: center;
    margin-bottom: 0.32rem;
    font-size: 1.4rem;
  }
}
</style>
