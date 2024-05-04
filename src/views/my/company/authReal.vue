<script setup lang="ts">
import { ref } from "vue";
import { addAuthReal } from "@/api/my";
import { showToast } from "vant";
import UplodeImage from '../components/UploadImage.vue'


const state = ref({
  name: "", // 姓名
  number: "", // 证件号码
  idCardJust: "", // 身份证正面照片
  idCardBack: "", // 身份证背面照片
});

// TODO: 保存实名认证信息
const submit = async () => {
  if (!state.value.name) {
    showToast("请输入您的真实姓名");
    return;
  }
  if (!state.value.number) {
    showToast("请输入您的证件号码");
    return;
  }
  if (!state.value.idCardJust && !state.value.idCardBack) {
    showToast("请上传您的证件照片");
    return;
  }


  const res = await addAuthReal({
    user_name: state.value.name,
    cert_no: state.value.number,
    idCard_just: state.value.idCardJust,
    idCard_back: state.value.idCardBack,
  });
  if (res) {
    showToast(res.msg);
    closeChange()
  } else {
    showToast(res.msg);
  }
}

// 上传身份证正面照片
const uploadJust = (file: File) => {
  state.value.idCardJust = (file as any);
}
// 上传身份证背面照片
const uploadBack = (file: File) => {
  state.value.idCardBack = (file as any);
}

// 返回上一页
const closeChange = () => history.back();

</script>

<template>
  <van-nav-bar title="实名认证" left-arrow @click-left="closeChange" />
  <h3>请如实填写信息，平台承诺保障客户的信息安全</h3>
  <van-field
    v-model="state.name"
    label="姓名"
    placeholder="请输入您的真实姓名"
  />
  <van-field
    v-model="state.number"
    label="证件号码"
    placeholder="请输入您的证件号码"
  />

  <!-- TODO: 上传身份证照片 -->
  <div class="auth-pic">
    <UplodeImage text="上传身份证正面照" @uploadChange="uploadJust"></UplodeImage>
    <UplodeImage text="上传身份证反面照" @uploadChange="uploadBack"></UplodeImage>
  </div>

  <button class="wy-submit" @click="submit">提交实名认证</button>
</template>

<style scoped lang="scss">
h3 {
  width: 100%;
  height: 2.14rem;
  line-height: 2.14rem;
  background: #fff2e3;
  font-size: 0.75rem;
  text-align: center;
  font-weight: 100;
  color: #ff9415;
}
.auth-pic {
  display: flex;
  justify-content: space-around;
  margin-top: 1.09rem;
}
</style>
