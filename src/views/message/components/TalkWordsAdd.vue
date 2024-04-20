<script setup lang="ts">
import { reactive, inject, watch } from "vue";
import { chatMessageWordsAdd, chatMessageWordsEdit } from "@/api/message";
import { showToast } from "vant";

// 接收父组件传值
const props = defineProps({
  title: {
    type: String,
  },
  id: {
    type: Number,
  },
  text: {
    type: String,
  },
});

// 监听父组件传的值变化
watch(props,(news) => {
  state.value = (news.text) as string
})

const state = reactive({
  // 合同列表
  list: [],
  loading: false,
  value: props.text || "", // 输入框内容
});

const { closeWorksAdd } = inject("popup");

// 获取列表
const submitAdd = async () => {
  if (!state.value) {
    showToast("请输入常用语");
    return;
  }
  state.loading = true;
  let res;
  if (props.id) {
    res = await chatMessageWordsEdit({
      id: props.id,
      text: state.value,
    });
  } else {
    res = await chatMessageWordsAdd({
      text: state.value,
    });
  }

  if (res) {
    state.value = "";
    closeWorksAdd();
  } else {
    showToast(res.msg);
  }
  state.loading = false;
};
</script>

<template>
  <van-nav-bar :title="props.title" left-arrow @click-left="closeWorksAdd">
    <template #right>
      <span @click="submitAdd">完成</span>
    </template>
  </van-nav-bar>

  <van-field
    v-model="state.value"
    rows="10"
    autosize
    label=""
    type="textarea"
    maxlength="200"
    placeholder="请输入您的常用回复请不要填写qq、微信等联系方式或 广告信息，否则系统将封禁您的账号。"
    show-word-limit
  />
</template>

<style scoped lang="scss">
// 穿透样式
:deep(.van-field__word-num) {
  color: #ff9415;
}
:deep(.van-field__word-limit) {
  color: #999999;
}
</style>
