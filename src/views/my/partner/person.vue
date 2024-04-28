<script setup lang="ts">
import { ref } from "vue";
import { addPartnerPerson } from "@/api/my";
import { showToast } from "vant";

const state = ref({
  showSex: false,
  it_name: "",
  sex: "",
  address: "",
  age: "",
  phone: "",
  introduce: "",
  work_data: "",
});

const sexList = [
  {
    name: "男",
  },
  {
    name: "女",
  },
];

// 选择性别
const setSelect = (value: any) => {
  state.value.sex = value.name;
};

// 提交表单
const submit = async () => {
  if (
    !state.value.it_name ||
    !state.value.sex ||
    !state.value.phone ||
    !state.value.age ||
    !state.value.address ||
    !state.value.work_data ||
    !state.value.introduce ||
    !state.value.work_data
  ) {
    showToast("请填写完整信息");
    return;
  }

  const res = await addPartnerPerson(state.value);
  if (res) {
    showToast("您的申请已收到，我们会尽快为您审核");
    state.value.it_name = "";
    state.value.sex = "";
    state.value.work_data = "";
    state.value.introduce = "";
    state.value.age = "";
    state.value.phone = "";
    state.value.address = "";
  } else {
    showToast(res.msg);
  }
};
</script>

<template>
  <div class="person-top">
    <h3>IT企业人才</h3>
    <h4>一站式驻场/远程灵活用工</h4>
  </div>
  <!-- 优势 -->
  <div class="person-adv">
    <h5>我们的优势</h5>
    <p>可尝试创业项目并享受创业扶持</p>
    <p>可带团队10-20人为你赚钱</p>
  </div>
  <!-- 表单 -->
  <div class="person-form">
    <h5>应聘登记表</h5>
    <van-form @submit="submit" class="form">
      <van-field
        v-model="state.it_name"
        label="姓名:"
        placeholder="请输入您的姓名"
      />
      <van-field
        v-model="state.sex"
        @click="state.showSex = true"
        readonly
        label="性别:"
        placeholder="请选择您的性别"
      />
      <van-action-sheet
        v-model:show="state.showSex"
        :actions="sexList"
        cancel-text="取消"
        close-on-click-action
        @select="setSelect"
      />
      <van-field
        v-model="state.phone"
        label="电话:"
        type="number"
        placeholder="请输入您的电话"
      />
      <van-field
        v-model="state.age"
        label="年龄:"
        type="number"
        placeholder="请输入您的年龄"
      />
      <van-field
        v-model="state.address"
        label="住址:"
        placeholder="请输入您的住址"
      />
      <van-field
        v-model="state.work_data"
        label="经历:"
        type="number"
        placeholder="请输入您的工作年限"
      />
      <van-field
        v-model="state.introduce"
        label="介绍:"
        type="textarea"
        rows="8"
        placeholder="请输入您的介绍"
      />
      <p>
        注：必须填写真实信息，发现填写造假，一律取消应
        聘资格。如果您的简历符合要求，我们会尽快与您取 得联系，谢谢！
      </p>
      <button native-type="submit">提交申请</button>
    </van-form>
  </div>
</template>

<style scoped lang="scss">
:deep(.van-field__label) {
  width: 2rem;
}
:deep(.van-cell:last-child) {
  flex-flow: column;
}
.person-top {
  background: url(@/assets/img/my/partner/person-bg1.jpg) no-repeat;
  background-size: cover;
  height: 20.43rem;

  h3 {
    font-size: 1.92rem;
    line-height: 1.92rem;
    font-weight: 800;
    color: #ffffff;
    padding: 4.13rem 0 1.07rem;
    text-align: center;
  }
  h4 {
    font-size: 1.28rem;
    line-height: 1.28rem;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
  }
}
.person-adv {
  background: url(@/assets/img/my/partner/person-bg2.jpg) no-repeat;
  background-size: cover;
  height: 12.72rem;
  text-align: center;

  p {
    width: 13.84rem;
    height: 2.05rem;
    line-height: 2.05rem;
    background: #fff5e8;
    border-radius: 1.03rem;
    font-size: 0.8rem;
    font-weight: 400;
    color: #f03c17;
    margin: 0 auto 0.61rem;
  }
}
.person-form {
  background: url(@/assets/img/my/partner/person-bg3.jpg) no-repeat;
  background-size: cover;
  height: 42.83rem;
  text-align: center;

  .form {
    margin: 0 2.88rem 0 2.75rem;
    p {
      font-size: 0.64rem;
      font-weight: 100;
      color: #999999;
      line-height: 0.96rem;
      margin-bottom: 2.16rem;
      margin-top: 1.2rem;
    }
    button {
      width: 13.8rem;
      height: 2.1rem;
      background: #ff8e00;
      border-radius: 0.2rem;
      font-size: 0.8rem;
      line-height: 2.1rem;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      border: none;
    }
  }
}

.person-adv,
.person-form {
  h5 {
    width: 9.11rem;
    height: 1.89rem;
    line-height: 1.89rem;
    background: linear-gradient(0deg, #fe8b11 0%, #ffbb27 99%);
    border-radius: 0.93rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: #ffffff;
    display: inline-block;
    margin: 1.97rem 0 1.23rem;
  }
}
</style>
