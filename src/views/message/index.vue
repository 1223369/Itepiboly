<script setup lang="ts">
import FooterTabbar from "@/components/FooterTabbar.vue";
import MessageList from "@/components/list/MessageList.vue";
import { messageStore } from "@/store/message";

const store = messageStore();
store.getSystemMessageList();
store.getChatMessageList();
</script>

<template>
  <div class="chat-message-list">
    <MessageList
      :messageList="store.systemMessageList"
      type="system"
    ></MessageList>
    <MessageList :messageList="store.chatMessageList" type="talk"></MessageList>
  </div>

  <FooterTabbar></FooterTabbar>
</template>

<style scoped lang="scss">
.chat-message-list {
  padding-bottom: 3rem
}
</style>
