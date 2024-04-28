<script setup lang="ts">
import { ref } from "vue";
import { uploadImage, addFeedback } from "@/api/my";
import { showToast } from "vant";

const state = ref({
  value: "", // 反馈内容
  fileList: [], // 图片上传列表
  phone: "", // 手机号
});

// 删除上传文件
const deleteFile = (file: file) => {
  let key = 0;
  for (let i = 0; i < state.value.fileList.length; i++) {
    if (state.value.fileList[i].url === file.url) {
      key = i;
      break;
    }
  }
  state.value.fileList.splice(key, 1);
};

// 上传文件
const afterRead = async (file: file) => {
  file.status = "uploading";
  file.message = "上传中...";
  let param = new FormData();
  param.append("user", "test");
  param.append("file", file.file);
  const res = await uploadImage(param);
  file.url = res.imageUrl;
  file.status = "done";
  file.message = "上传成功";
};

// 提交表单
const submit = async (value: any) => {
  if (!state.value.value) {
    showToast("请填写反馈内容");
    return;
  }
  if (!state.value.fileList.length) {
    showToast("请上传相关图片");
    return;
  }
  if (!/^1[0-9]{10}$/.test(state.value.phone)) {
    showToast("请填写正确的手机号");
    return;
  }
  let arr = [];
  for (let i = 0; i < state.value.fileList.length; i++) {
    arr.push(state.value.fileList[i].url);
  }
  const res = await addFeedback({
    "content": state.value.value,
    "phone": state.value.phone,
    "screenshot": String(arr),
    "type": 1,
  });
  if (res) {
    showToast("您的反馈已收到，我们会尽快处理");
    state.value.value = "";
    state.value.fileList = [];
    state.value.phone = "";
  }
};

// 返回上一页
const leftBack = () => history.back();
</script>

<template>
  <van-nav-bar fixed title="意见反馈" left-arrow @click-left="leftBack" />
  <div class="feedback-container">
    <van-form @submit="submit">
      <!-- 反馈内容 -->
      <van-field
        v-model="state.value"
        type="textarea"
        autosize
        rows="8"
        placeholder="请简单描述您的问题"
        maxlength="500"
      />
      <!-- 图片上传 -->
      <van-uploader
        class="upload-pic"
        v-model="state.fileList"
        accept=".jpg,.png"
        :after-read="afterRead"
        :before-delete="deleteFile"
        upload-text="图片上传"
        max-count="5"
      />
      <!-- 手机号 -->
      <van-field
        v-model="state.phone"
        type="number"
        maxlength="13"
        placeholder="请输入您的联系方式"
      />
      <button class="wy-submit" @click="submit">提交</button>
    </van-form>
  </div>
</template>

<style scoped lang="scss">
.feedback-container {
  height: calc(100vh - 48px);
  padding-top: 46px;

  .upload-pic {
    margin: 1.49rem 0.8rem 2.27rem;
  }
}
</style>
