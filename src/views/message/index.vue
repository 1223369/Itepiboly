<script setup lang="ts">
import FooterTabbar from "@/components/FooterTabbar.vue";
import MessageList from "@/components/list/MessageList.vue";
import { messageStore } from "@/store/message";

const store = messageStore();
store.getSystemMessageList();
store.getChatMessageList();

</script>

<template>
  <MessageList :messageList="store.systemMessageList" type="system"></MessageList>
  <MessageList :messageList="store.chatMessageList" type="talk"></MessageList>
  <FooterTabbar></FooterTabbar>
</template>



<style scoped lang="scss">

</style>