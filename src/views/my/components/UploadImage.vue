<script setup lang="ts">
import { ref } from "vue";
import {uploadImage} from '@/api/my'

const state = ref({
  fileList: [], // 上传文件列表
});

// 接收父组件参数
const props = defineProps({
  text:{
    type: String,
  }
})
// 接收父组件方法
const emits = defineEmits(["uploadChange"])

// 上传文件
const afterRead = async(file: any) => {
  file.status = "uploading";
  file.message = "上传中...";
  let param = new FormData();
  param.append("user", "test");
  param.append("file", file.file);
  console.log('param', param)
  const res = await uploadImage(param);
  file.url = res.imageUrl;
  file.status = "done";
  file.message = "上传成功";
  state.fileList = [file];
  // 触发父组件方法
  emits("uploadChange", res.imageUrl);
};

// 删除上传列表
const deleteFile = () => {
  state.value.fileList = [];
};
</script>

<template>
  <div>
    <van-uploader
      v-model="state.fileList"
      accept=".jpg,.png"
      :after-read="afterRead"
      :before-delete="deleteFile"
      max-count="1"
    />
    <p>{{ props.text }}</p>
  </div>
</template>

<style scoped lang="scss">
  :deep(.van-uploader__upload) {
    background: url('@/assets/img/my/auth-real-pic.png') no-repeat;
    background-size: 100%;
    width: 7.6rem;
    height: 5.2rem;
    margin: 0;
  }

  :deep(.van-uploader__preview-image), :deep( .van-uploader__preview) {
    width: 7.6rem;
    height: 5.2rem;
  }

  :deep(.van-uploader__upload-icon) {
    display: none;
  }

  p {
    text-align: center;
    margin-top: 0.91rem;
  }
</style>
