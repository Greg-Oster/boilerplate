import { instanceToPlain, plainToInstance } from 'class-transformer'
import { definePiniaStore, ref } from '#imports'
import { ListItemTest } from '~/types/list.todo'
import ListApi from '~/services/api/list'

export const useListStore = definePiniaStore('todo-list', () => {
	const list = ref<ListItemTest[]>([new ListItemTest()])

	const fetchList = async () => {
		const data: ListItemTest[] = await ListApi.getListData()
			.then((response) => {
				if (Array.isArray(response)) {
					return response.map((item) => {
						return instanceToPlain(plainToInstance(ListItemTest, item, {
							exposeDefaultValues: true
						}))
					}) as ListItemTest[]
				} else { return [] }
			})
			.catch(() => {
				return instanceToPlain(plainToInstance(ListItemTest, [], { exposeDefaultValues: true })) as ListItemTest[]
			})

		list.value = data
	}

	const deleteListItem = async (id: string) => {
		await ListApi.deleteListItem(id)
			.then((response) => {
				// console.log(response)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const editListItem = async (item: ListItemTest) => {
		await ListApi.editListItem(item)
			.then((response) => {
				// console.log(response)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return {
		list,
		fetchList,
		deleteListItem,
		editListItem,
	}
})
