<script lang="ts" setup>
import { convertIsoDateToFormat } from '~/helpers/utils'

const props = withDefaults(defineProps<{
	date_start: string,
  date_end: string
}>(), {
	date_start:'',
  date_end: ''
})

</script>

<template>
  <div class="list-item-date">
    <div class="list-item-date__item">
      <span class="list-item-date__text">Дата создания: </span>
      <span class="list-item-date__date">{{ convertIsoDateToFormat(date_start, 'dd.MM.yyyy') }}</span>
    </div>
    <div class="list-item-date__item">
      <span class="list-item-date__text">Дата окончания: </span>
      <span class="list-item-date__date">{{ convertIsoDateToFormat(date_end, 'dd.MM.yyyy') }}</span>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.list-item-date {
  display: flex;
  flex-direction: column;
  width: max-content;

  &__item {
    display: flex;
    justify-content: space-between;
    gap: 6px;
    font-size: 10px;
  }

  &__text {
    color: $gray-300;
  }

  &__date {
    color: $blue;
  }
}
</style>
