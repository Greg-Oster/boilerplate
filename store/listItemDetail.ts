import { instanceToPlain, plainToInstance } from 'class-transformer'
import { definePiniaStore, ref } from '#imports'
import { ListItemTest } from '~/types/list.todo'
import ListApi from '~/services/api/list'

export const useListItemStore = definePiniaStore('todo-list-item', () => {
	const listItem = ref<ListItemTest | undefined>(undefined)

	const fetchListItem = async (id: string) => {
		const data: ListItemTest = await ListApi.getListItem(id)
			.then((response) => {
				return instanceToPlain(plainToInstance(ListItemTest, response, { exposeDefaultValues: true })) as ListItemTest
			})
			.catch(() => {
				return instanceToPlain(plainToInstance(ListItemTest, new ListItemTest(), { exposeDefaultValues: true })) as ListItemTest
			})

		listItem.value = data
	}

	return {
		listItem,
		fetchListItem
	}
})
