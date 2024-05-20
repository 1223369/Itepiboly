<script setup lang="ts">
import { KeepAlive, provide } from "vue";
// 引入echars
import * as echarts from 'echarts';
// 注册echarts
provide('echarts', echarts);
</script>

<template>
  <!-- <keep-alive :include="['task']">
    <router-view></router-view>
  </keep-alive> -->
  <!-- <router-view/> -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component
        v-if="$route.meta.keepAlive"
        :is="Component"
        :key="$route.name"
      ></component>
    </keep-alive>
    <component
      v-if="!$route.meta.keepAlive"
      :is="Component"
      :key="$route.name"
    ></component>
  </router-view>
</template>

<style scoped></style>
