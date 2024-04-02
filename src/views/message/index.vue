<script setup lang="ts">
import {reactive} from "vue";
import FooterTabbar from "@/components/FooterTabbar.vue";
import MessageList from "@/components/list/MessageList.vue";

const messageList = reactive([
  {id :1},
  {id:2}
]);

</script>

<template>
  <MessageList :messageList="messageList"></MessageList>
  <FooterTabbar></FooterTabbar>
</template>



<style scoped lang="less">

</style>