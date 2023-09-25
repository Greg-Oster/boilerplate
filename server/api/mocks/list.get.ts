import { defineEventHandler } from 'h3'
import { DateTime } from 'luxon'

export default defineEventHandler(() => {
	const test = Array(5).fill({
		id: '1',
		completed: false,
		date_start: DateTime.now().plus({ day: 2 }).toISO(),
		date_end: DateTime.now().plus({ day: 5 }).toISO(),
		title: 'Заголовок с сервака',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta ex optio quas?',
	})

	return test
})
