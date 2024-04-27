<script setup lang="ts">
import useClipboard from 'vue-clipboard3'
import { showToast } from 'vant'

const props = defineProps({
  item: {
    type: Object,
  }
})

// 接收父组件方法
const emit = defineEmits(['back'])

// 复制功能
const { toClipboard } = useClipboard()
const shareLink = () => {
  toClipboard(props.item.manage_name)
  showToast('复制成功')
}

</script>

<template>
  <div class="manager-popup">
    <div class="manager-top">
      <img :src="props.item.manage_it_head" alt="" />
      <p>客户经理</p>
    </div>

    <!-- 联系方式 -->
    <dl>
      <dd>
        <label for="">电话：</label>
        <span>{{ props.item.manage_name }}</span>
        <strong @click="shareLink">复制</strong>
      </dd>
      <dd>
        <label for="">微信：</label>
        <span>{{ props.item.manage_name }}</span>
        <strong @click="shareLink">复制</strong>
      </dd>
    </dl>

    <button @click="emit('back')">返回</button>
  </div>
</template>

<style scoped lang="scss">
.manager-popup {
  width: 13.07rem;
  height: 15.42rem;
  background: url(@/assets/img/my/manager-back.png) no-repeat;
  background-size: 100%;
  text-align: center;

  .manager-top {
    img {
      width: 2.16rem;
      height: 2.16rem;
      border-radius: 50%;
      margin: 1.55rem 0 0.67rem;
    }

    p {
      font-size: 0.8rem;
      line-height: 0.8rem;
      font-weight: 400;
      color: #ffffff;
      margin-bottom: 2.96rem;
    }
  }

  dl {
    font-size: 0.8rem;
    padding: 0 1.33rem 0 1.6rem;
    dd {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.04rem;
      label {
        color: #999999;
      }
      span {
        color: #333333;
      }
      strong {
        color: #ff9415;
      }
    }
  }

  button {
    width: 10.21rem;
    height: 1.92rem;
    border: 1px solid #ff6f00;
    border-radius: 0.16rem;
    font-size: 0.85rem;
    line-height: 1.92rem;
    text-align: center;
    background: #ffffff;
    font-weight: 400;
    color: #ff6f00;
  }
}
</style>
