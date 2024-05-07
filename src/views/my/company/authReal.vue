<script setup lang="ts">
import { ref } from "vue";
import { companyCertification } from "@/api/my";
import { showToast } from "vant";
import UplodeImage from "../components/UploadImage.vue";

const state = ref({
  company_name: "", // 企业名称
  organization_code: "", // 组织机构代码
  contacts: "", // 企业法人
  phone: "", // 电话号码
  permit: "", // 营业执照
});

// TODO: 保存实名认证信息
const submit = async () => {
  if (!state.value.company_name) {
    showToast("请输入企业名称");
    return;
  }
  if (!state.value.organization_code) {
    showToast("请输入机构代码");
    return;
  }
  if (!state.value.contacts) {
    showToast("请输企业法人");
    return;
  }
  if (!state.value.phone) {
    showToast("请输入联系电话");
    return;
  }
  if (!state.value.permit) {
    showToast("请上传营业执照");
    return;
  }

  const res = await companyCertification({
    company_name: state.value.company_name,
    organization_code: state.value.organization_code,
    contacts: state.value.contacts,
    phone: state.value.phone,
    permit: state.value.permit,
  });
  if (res) {
    showToast(res.msg);
    closeChange();
  } else {
    showToast(res.msg);
  }
};

// 上传身份证正面照片
const uploadJust = (file: File) => {
  state.value.permit = file as any;
};

// 返回上一页
const closeChange = () => history.back();
</script>

<template>
  <van-nav-bar title="企业认证" left-arrow @click-left="closeChange" />
  <h3>请如实填写信息，平台承诺保障客户的信息安全</h3>
  <van-field
    v-model="state.company_name"
    label="企业名称"
    placeholder="请输入企业名称"
  />
  <van-field
    v-model="state.organization_code"
    label="机构代码"
    placeholder="请输入统一社会信用码/工商执照注册号"
  />
  <van-field
    v-model="state.contacts"
    label="企业法人"
    placeholder="请输入企业法人"
  />
  <van-field
    v-model="state.phone"
    label="联系电话"
    placeholder="请输入联系电话"
  />

  <!-- TODO: 上传身份证照片 -->
  <div class="auth-pic">
    <UplodeImage @uploadChange="uploadJust"></UplodeImage>
  </div>
  <p>上传企业营业执照</p>
  <button class="wy-submit" @click="submit">提交企业认证</button>
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
  width: 21.7rem;
  height: 8.62rem;
  background: #fffcf8;
  border: 0.03px solid #fe9127;
  border-radius: 0.27rem;
  display: flex;
  justify-content: space-around;
  margin-top: 1.09rem;
  align-items: center;
  margin: 1rem auto 0;

  div {
    display: flex;
  }
}

p {
  font-size: 0.8rem;
  font-weight: 300;
  color: #666666;
  margin-top: 1.6rem;
  text-align: center;
}
</style>
