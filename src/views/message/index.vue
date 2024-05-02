<script setup lang="ts">
import FooterTabbar from "@/components/FooterTabbar.vue";
import MessageList from "@/components/list/MessageList.vue";
import { messageStore } from "@/store/message";
import { userStore } from "@/store/user";

const store = messageStore();
const uStore = userStore();
store.getSystemMessageList();
store.getChatMessageList();
</script>

<template>
  <div class="chat-message-list">
    <MessageList
      :messageList="store.systemMessageList"
      type="system"
    ></MessageList>
    <MessageList :messageList="store.chatMessageList" :type="uStore.role == '1' ? 'talk' : 'talent'"></MessageList>
  </div>

  <FooterTabbar></FooterTabbar>
</template>

<style scoped lang="scss">
.chat-message-list {
  padding-bottom: 3rem
}
</style>
