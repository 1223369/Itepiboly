<template>
  <van-nav-bar
    title="服务协议"
    left-text=""
    left-arrow
    @click-left="onClickLeft"
    />
    <div class="text-agree" v-html="state.htmlText"></div>
    <div class="loding">
      <van-loading size="24px">加载中...</van-loading>
    </div>
</template>

<script setup lang="ts">

  import { getPolicy } from '@/api/user';
  import { showToast } from 'vant';
  import { reactive } from 'vue'

  const state = reactive({
    htmlText: ''
  })

  // TODO:获取html文本
  const getPolicyChange = async () => {
    
    const res = await getPolicy({
      id: 17
    })
    if (res) {
      state.htmlText = res.records[0].content
    }else {
      showToast(res.msg)
    }
  }
  getPolicyChange()

  const onClickLeft = () => history.back();

</script>

<style scoped lang="scss">
  .text-agree {
    padding: 0.5rem 0.7rem;
  }
</style>