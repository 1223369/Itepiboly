<script setup lang="ts">
  import { inject,ref } from 'vue'
  import { personAdvantage } from '@/api/my'
  import {myStore} from '@/store/my'
  import { showToast } from 'vant'

  const store = myStore()
  const state = ref({
    value: ''// 输入框内容
  })
  state.value.value = store.resumeInfo.advantage
  // 接收父组件方法
  const {closeChange} = inject('popup') as () => void

  // TODO: 保存简历
  const submit = async () => {
    if (!state.value) {
      showToast('请输入您的个人优势')
      return
    }

    const res = await personAdvantage({
      "advantage": state.value.value
    })
    if (res) {
      closeChange()
      showToast('保存成功')  
    } else {
      showToast(res.msg)
    }
  }

</script>

<template>
  <van-nav-bar title="个人优势" left-arrow @click-left="closeChange" />
  <van-field
    v-model="state.value"
    rows="12"
    autosize
    label=""
    type="textarea"
    maxlength="500"
    placeholder="请输入您的个人优势"
    show-word-limit
  />
  <button class="wy-submit" @click="submit">保存</button>
</template>

<style scoped lang="scss"></style>
