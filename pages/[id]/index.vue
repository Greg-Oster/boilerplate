<script lang="ts" setup>
import { useListItemStore } from '~/store/listItemDetail';
import {storeToRefs} from "pinia";
import ListItem from '~/components/list/ListItem.vue';
import UiBreadcrumbs from '~/components/ui/UiBreadcrumbs.vue';
import { Breadcrumbs } from '~/types/page'

const route = useRoute()
const listItemStore = useListItemStore()
await listItemStore.fetchListItem(route.params.id as string);
const { listItem } = storeToRefs(listItemStore)

useHead({
  title: listItem?.value?.title,
  meta: [
    { name: 'description', content: listItem?.value?.description }
  ],
})

const breadcrumbs:Breadcrumbs[] = [
  {label: 'Главная', route: { name: '/' }},
  {label: listItem.value ? listItem.value.title : '', route: listItem.value ? { name: listItem.value.id } : { name: '/' } }
]
</script>

<template>
  <div class="detail-page">
    <ui-breadcrumbs :breadcrumbs="breadcrumbs"/>
    <div class="detail-page__todo-item" v-if="listItem && listItem.id">
      <list-item
        :item="listItem"
        type="detail"
      />
    </div>
    <div class="todo-item" v-else>
      <h2>Такой задачи не существует</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 31px;

  &__todo-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>