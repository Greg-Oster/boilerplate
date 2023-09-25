import { ListItemTest } from '~/types/list.todo'
export default class ListApi {
    static getListData () {
        return $fetch(`https://650dd1c8a8b42265ec2cba92.mockapi.io/api/list`, {method: "get"})
    }

    static getListItem (id: string) {
        return $fetch(`https://650dd1c8a8b42265ec2cba92.mockapi.io/api/list/${id}`, {method: "get"})
    }

    static deleteListItem (id: string) {
        return $fetch(`https://650dd1c8a8b42265ec2cba92.mockapi.io/api/list/${id}`, {method: "delete"})
    }

    static addListData (body: ListItemTest) {
        return $fetch(`https://650dd1c8a8b42265ec2cba92.mockapi.io/api/list`, {method: "post", body})
    }

    static editListItem (item: ListItemTest) {
        return $fetch(`https://650dd1c8a8b42265ec2cba92.mockapi.io/api/list/${item.id}`, {method: "put", body: item})
    }
}
