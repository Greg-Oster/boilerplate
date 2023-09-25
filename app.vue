<template>
  <nuxt-layout>
    <NuxtLoadingIndicator />
    <nuxt-page />
  </nuxt-layout>
</template>


<script lang="ts">
import 'virtual:svg-icons-register';
export default {}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.25s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(.1rem);
}
</style>
