<script setup lang="ts">
import { KeepAlive } from "vue";
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
