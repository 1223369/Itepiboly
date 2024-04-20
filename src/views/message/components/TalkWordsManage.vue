<script setup lang="ts">
import { reactive, inject, provide } from "vue";
import { chatMessageWordsList, chatMessageWordsDelete } from "@/api/message";
import { showToast } from "vant";
import TalkWordsAdd from "./TalkWordsAdd.vue";

const state = reactive({
  // 常用语列表
  list: [],
  loading: false,
  editId: 0, // 编辑的常用语id
  editText: "", // 编辑的常用语内容
  title: "", // 弹窗标题
  addBool: false, // 常用语添加弹窗
});

// 获取父组件方法
const { closeWorksManage } = inject("popup");

// 获取列表
const getChatMessageWordsList = async () => {
  state.loading = true;
  const res = await chatMessageWordsList({});

  if (res) {
    state.list = res.data;
  } else {
    showToast(res.msg);
  }
  state.loading = false;
};

// 编辑常用语
const editChange = (id: number, text: string) => {
  state.editId = id;
  state.editText = text;
  state.title = "修改常用语";
  state.addBool = true;
};

// 添加常用语
const addChange = () => {
  state.editId = 0;
  state.editText = "";
  state.title = "添加常用语";
  state.addBool = true;
};

// 删除常用语
const submitDelect = async (id: number) => {
  state.loading = true
  const res = await chatMessageWordsDelete({
    id: id,
  });
  if (res) {
    getChatMessageWordsList();
  }
  showToast(res.msg);
  state.loading = false;
};

// 关闭弹窗
const closeWorksAdd = () => {
  state.editText = "";
  state.addBool = false;
  getChatMessageWordsList();
};

// 向子组件通信
provide("popup", {
  closeWorksAdd,
});

// 调用函数
getChatMessageWordsList();
</script>

<template>
  <van-nav-bar title="管理常用语" left-arrow @click-left="closeWorksManage" />

  <div class="manage-list">
    <van-swipe-cell v-for="item in state.list" :key="item.id">
      <div class="item">
        <p>{{ item.text }}</p>
        <div>
          <img src="@/assets/img/icon/icon-edit.png" />
          <span @click="editChange(item.id, item.text)">编辑</span>
        </div>
      </div>
      <template #right>
        <img @click="submitDelect(item.id)" src="@/assets/img/icon/icon-delete.png" class="delete" />
      </template>
    </van-swipe-cell>
  </div>

  <button @click="addChange()" class="add">添加常用语</button>

  <!--常用语添加弹窗-->
  <van-popup
    v-model:show="state.addBool"
    position="top"
    duration="0"
    :style="{ width: '100%', height: '100%' }"
  >
    <TalkWordsAdd
      :title="state.title"
      :id="state.editId"
      :text="state.editText"
    ></TalkWordsAdd>
  </van-popup>
</template>

<style scoped lang="scss">
:deep(.van-swipe-cell__right) {
  display: flex;
  align-items: center;
}
.item {
  margin: 0 0.72rem;
  border-bottom: 1px solid #eeeeee;

  p {
    font-size: 0.75rem;
    font-weight: 300;
    color: #030303;
    line-height: 1.12rem;
    padding: 1rem 0.2rem 0.4rem;
    text-align: left;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 0.77rem;

    span {
      font-size: 0.75rem;
      line-height: 0.75rem;
      font-weight: 300;
      color: #030303;
      text-align: right;
    }

    img {
      width: 0.91rem;
      height: 0.91rem;
    }
  }
}

.delete {
  width: 1.87rem;
  height: 1.87rem;
  margin-right: 0.64rem;
}

.add {
  height: 2.35rem;
  background: linear-gradient(90deg, #ffa400, #ff8900);
  border-radius: 0.27rem;
  line-height: 2.35em;
  position: fixed;
  border: none;
  bottom: 0.64rem;
  margin: 0 0.64rem;
  font-size: 0.8rem;
  font-weight: 400;
  color: #ffffff;
  width: calc(100vw - 1.28rem);
  left: 0;
}
</style>
