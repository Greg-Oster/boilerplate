<script lang="ts" setup>
useHead({
  title: 'ToDo list',
  meta: [
    { name: 'description', content: 'quiz' }
  ],
})

</script>

<template>
  <div class="container">
    <list-wrapper class="todo-list"/>
  </div>
</template>



<style lang="scss" scoped>
.container {
  .todo-list {
    margin-top: -26px;
  }
}
</style>
