<script setup lang="ts">
  import{ ref,reactive } from 'vue'
  import { useRoute, useRouter } from 'vue-router';
  import { getCode } from '@/api/constract';
  import { showToast } from 'vant';
import { login } from '@/api/user';
import { userStore } from '@/store/user';

const store = userStore();
const router = useRouter();

  const state = reactive({
    checked: true,
    // 登录账号
    accounts: '',
    // 验证码
    code: '',
    codeText: '获取验证码',
    //验证码事件
    time: 60,
    //验证码定时器s
    interTimeCode: null
  })

  // 获取验证码
  const getCodeChange = async () => {
    if (state.interTimeCode) return;
    const res = await getCode({
      accounts: state.accounts
    });

    if (res) {
      // 倒计时验证码
      state.interTimeCode = setInterval(() => {
        state.time--;
        if (state.time <= 0) {
          clearInterval(state.interTimeCode);
          state.time = 60;
          state.codeText = '获取验证码';
        } else {
          state.codeText = `${state.time}s后重试`;
        }
      },1000)

      //手机接收码采用接口返回
      state.code = res.code;
    }

  }

  //登录
  const loginSubmit = async() => {
    if (!state.code) {
      showToast('请输入验证码');
      return;
    }
    if (!state.checked) {
      showToast('请勾选我已同意');
      return;
    }

    const res = await login({
      accounts: state.accounts,
      code: state.code
    })

    console.log('res', res)
    if (res.errCode === 200) {
      // 登录成功后数据存入store
      showToast('登录成功');
      store.setUserInfo(res.data);

      
      if (res.data.role === 2) {
        //企业端
        router.push('/talent');
      } else {
        //人才端
        router.push('/task');
      }
    } else {
      showToast(res.msg);
    }
  }

  // 返回按钮
  const onClickLeft = () => history.back();
</script>

<template>
  <van-icon class="icon-left" name="arrow-left" @click="onClickLeft"/>

  <!-- 登录表单 -->
  <div class="login-form">
    <h3>验证码登录</h3>

    <div class="login-form-item">
      <i class="icon-phone"></i>
      <input type="text" placeholder="请输入手机号" v-model="state.accounts"/>
    </div>
    <div class="login-form-item">
      <i class="icon-code"></i>
      <input type="text" placeholder="请输入验证码" v-model="state.code"/>
      <span @click="getCodeChange">{{state.codeText}}</span>
    </div>
    <van-button type="primary" block @click="loginSubmit">登录</van-button>

    <div class="login-form-label">
      <van-checkbox v-model="state.checked">我已阅读</van-checkbox>
      <router-link to="/login/serviceAgree">《IT企业服务协议》</router-link>和
      <router-link to="/login/privacyPolicy">《隐私政策》</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon-left {
  font-size: 0.8rem;
  margin: 0.67rem 0 0 0.67rem;
}

.login-form {
  padding: 0 1.07rem;

  h3 {
    margin-top: 1.5rem;
    line-height: 1.39rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #333333;
    margin-top: 2.35rem;
    margin-bottom: 4rem;
    padding-left: 0.3rem;
  }

  .login-form-item {
    display: flex;
    font-size: 0.75rem;
    font-weight: 300;
    color: #9fa7ad;
    margin: 0 0.18rem 2rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e7e7e7;
    align-items: center;

    .icon-phone {
      background: url("@/assets/img/icon/icon-phone.png") no-repeat;
      background-size: 100%;
      width: 1.01rem;
      height: 1.01rem;
    }

    .icon-code {
      background: url("@/assets/img/icon/icon-code.png") no-repeat;
      background-size: 100%;
      width: 1.01rem;
      height: 1.01rem;
    }

    input {
      flex: 1;
      margin-left: 0.48rem;
    }

    span {
      font-size: 0.75rem;
      font-weight: 300;
      color: #fe9527;
      border-left: 1px solid #fe9527;
      line-height: 0.75rem;
      padding-left: 0.56rem;
    }
  }

  .login-form-label{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 1.5rem;
    left: 0;
    width: 100%;
  }
}
</style>
