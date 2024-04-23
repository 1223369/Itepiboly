<script setup lang="ts"></script>

<template>
  <div class="content">
    <slot></slot>
    <p>最终解释权归IT企业服务平台所有</p>
  </div>
</template>

<style scoped lang="scss">
.content {
  padding: 0.77rem 0.67rem;
}
p {
  font-size: 0.53rem;
  color: #666666;
}
</style>
