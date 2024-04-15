import { defineStore } from "pinia";
import { systemList,chatMessageList } from "@/api/message";

export const messageStore = defineStore({
  id: "message",
  state: () => {
    return {
      systemMessageList: [],
      systemNewMessage: [],
      chatMessageList: [],
    };
  },

  actions: {
    // 获取系统消息列表
    async getSystemMessageList() {
      const res = await systemList({
        type: 0,
        is_informtype: 2
      });
       if (res) {
        this.systemMessageList = res.data
        if (this.systemMessageList[0]) this.systemNewMessage = [this.systemMessageList[0]]
       }
    },

    // 获取聊天消息列表
    async getChatMessageList() {
      const res = await chatMessageList();
       if (res) this.chatMessageList = res.data
    }
  },
});
