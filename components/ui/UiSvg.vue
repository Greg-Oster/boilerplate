<script lang="ts" setup>

const props = withDefaults(defineProps<{
  prefix?: string,
  name?: string,
}>(), {
  prefix: 'icon',
  name: '',
})

const symbolId = () => `#${props.prefix}-${props.name}`
</script>

<template>
  <svg aria-hidden="true">
    <use :href="symbolId()"/>
  </svg>
</template>
