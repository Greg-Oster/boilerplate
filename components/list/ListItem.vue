<script lang="ts" setup>
import { ListItemTest } from '~/types/list.todo'

const props = withDefaults(defineProps<{
	item: ListItemTest,
  type?: 'list' | 'detail'
}>(), {
	item: () => new ListItemTest(),
  type: 'list'
})

const emit = defineEmits(['delete', 'edit', 'toggleStatus'])

function handleClick() {
  emit('toggleStatus', props.item.id)
}

const isList = computed(() => {
  return props.type === 'list'
})

const isDetail = computed(() => {
  return props.type === 'detail'
})
</script>

<template>
  <div
    class="list-item"
    :class="[
      {'list-item--checked': item.completed && !isDetail},
      {'list-item--detail': isDetail},
      {'list-item--list': isList}
    ]"
  >

    <div class="list-item__helpers" v-if="isList">
      <list-item-date
        class="list-item__list-date"
        :date_start="item.date_start"
        :date_end="item.date_end"
      />
      <div class="list-item__actions">
        <ui-svg
          name="delete" class="list-item__actions-icon"
          @click.stop.prevent="emit('delete', item.id)"
        />
        <ui-svg
          v-if="!item.completed"
          name="edit"
          class="list-item__actions-icon"
          @click.stop.prevent="emit('edit', item)"
          />
      </div>
    </div>

    <div class="list-item__body">
      <ui-toggle
        class="list-item__toggler"
        v-if="isList"
        v-model="props.item.completed"
        @click.stop.prevent="handleClick"
        :input-id="item.id + item.title"
      />

      <div class="list-item__body-content">
        <h2 class="list-item__title">{{ item.title }}</h2>
        <p class="list-item__description">{{ item.description }}</p>
      </div>
    </div>
  </div>

  <list-item-date
    v-if="isDetail"
    class="list-item__detail-date"
    :date_start="item.date_start"
    :date_end="item.date_end"
  />
</template>



<style lang="scss" scoped>
.list-item {
  position: relative;
  display: flex;
  padding: 16px;
  padding-bottom: 30px;
  background-color: $gray-500;
  border-radius: 8px;
  border: 1px solid $gray-400;
  color: $white;

    @include breakpoint(pad down) {
      flex-direction: column;
      padding-bottom: 16px;
    }

  &--detail {
    padding: 10px;
    max-width: max-content;

    .list-item__title {
      margin-bottom: 5px;
    }
  }

  &--list {
    .list-item__description {
      padding-right: 80px;
      @include breakpoint(pad down) {
        padding-right: 0;
      }
    }
  }

  &--checked {
    color: $gray-300;

    .list-item__description,
    .list-item__title {
      color: $gray-300;
      text-decoration: line-through;
    }
  }

  &__body {
    display: flex;
  }

  &__toggler {
    margin-right: 12px
  }

  &__title {
    margin-bottom: 10px;
  }

  &__helpers {
    position: absolute;
    right: 16px;
    top: 16px;
    display: flex;
    @include breakpoint(pad down) {
      position: relative;
      right: auto;
      top: auto;
      flex-direction: row-reverse;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }

  &__actions {
    margin-left: 13px;
    @include breakpoint(pad down) {
      margin-left: -5px;
    }

    &-icon {
      width: 24px;
      height: 24px;
      padding: 5px;
      color: $gray-300;
      fill: $gray-300;
      @include breakpoint(pad down) {
        width: 34px;
        height: 30px;
      }
    }
  }

  &__date-range {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
}
</style>
