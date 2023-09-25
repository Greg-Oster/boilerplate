<script lang="ts" setup>
import { useModal } from 'vue-final-modal'
import AddListItemModal from '~/components/modal/AddListItemModal.vue'
import { useListStore } from '~/store/list'
import {storeToRefs} from "pinia";
import ListApi from '~/services/api/list'
import { ListItemTest } from '~/types/list.todo'
import { useDebounceFn } from '@vueuse/core'

const listStore = useListStore()
await listStore.fetchList();
const { list } = storeToRefs(listStore)

const tasksTotal = computed(() => {
  return list.value.length
})

const tasksCompleted = computed(() => {
  if(list.value) {
    return list.value.reduce<number>((acc, item ) => {
      if (item.completed){
        acc++
      }
      return acc
    }, 0)
  } else {
    return null
  }

})

const addModal = useModal({
	component: AddListItemModal,
	attrs: {
		modalTitle: 'Создать задачу',
		btnText: 'Создать',
		async onConfirm (value: ListItemTest) {
      addModal.close()
			await ListApi.addListData(value)
      await listStore.fetchList();
		}
	}
})

function addListItem(){
  addModal.open()
}

function editListItem(item: ListItemTest){
  const editModal = useModal({
	  component: AddListItemModal,
	  attrs: {
      modalTitle: 'Редактировать задачу',
      editItem: item,
      btnText: 'Сохранить',
      async onConfirm (body: ListItemTest) {
        editModal.close()
        await ListApi.editListItem(body)
        await listStore.fetchList();
      }
	  }
  })

  editModal.open()
}

async function handleDelete(id: string){
  await listStore.deleteListItem(id);
  await listStore.fetchList();
}

let clickedItemsId = new Set<string | undefined >([]);
async function handleToggle(id: string) {
  const togglingItem: ListItemTest | undefined = list.value.find(obj => {
    return obj.id === id
  })

  if (togglingItem) {

    if (clickedItemsId.has(togglingItem.id)) {
      clickedItemsId.delete(togglingItem.id)
    } else {
      clickedItemsId.add(togglingItem.id)
    }

    togglingItem.completed = !togglingItem.completed
  }

  debouncedItemUpdate(clickedItemsId)
}

const debouncedItemUpdate = useDebounceFn(async function(clickedItemsId){
  if (clickedItemsId.size){
    for (const id of clickedItemsId) {
      const updatedListItem = list.value.find(obj => {
        return obj.id === id
      })

      if (updatedListItem) {
        // calls per second limit :(
        await ListApi.editListItem(updatedListItem)
      }
    }
  }
  clickedItemsId.clear();
}, 700)
</script>

<template>
  <div class="list-wrapper">
    <ui-button
        append-icon="add"
        class="list-wrapper__button"
        @click="addListItem"
    >
      Создать
    </ui-button>
    <div class="list-wrapper__info">
      <ui-counter
        class="list-wrapper__info-total"
        text="Всего задач"
        :total="tasksTotal"
      />
      <ui-counter
        class="list-wrapper__info-completed"
        text="Выполнено"
        :total="tasksTotal"
        :count="tasksCompleted"
      />
    </div>
    <div class="list-wrapper__list" v-if="list.length">
      <nuxt-link
        v-for="(item, index) in list"
        :key="item.id"
        :to="item.id"
      >
        <list-item
          :item="item"
          @delete="handleDelete"
          @edit="editListItem"
          @toggleStatus="handleToggle"
        />
      </nuxt-link>
    </div>
    <div class="list-wrapper__no-item" v-else>
      <ui-svg
        class="list-wrapper__no-item-image"
        name="edit"
      />
      <p class="list-wrapper__no-item-text"><strong>У Вас еще нет созданных задач</strong><br>Создавайте задачи и организуйте свои дела</p>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.list-wrapper {

  &__button {
    width: 100%;
    margin-bottom: 66px;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &__info-total {
    color: $blue;
  }

  &__info-completed {
    color: $purple-dark;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 30px;
  }

  &__no-item {
    border-top: 1px solid $gray-400;
    display: flex;
    gap: 16px;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: 64px;
  }

  &__no-item-image {
    width: 56px;
    height: 56px;
    fill: $gray-300;
    color: $gray-300;
  }

  &__no-item-text {
    color: $gray-300;
    font-size: 16px;
    font-weight: normal;
  }
}
</style>
