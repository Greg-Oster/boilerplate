import { DateTime } from 'luxon'

export const convertIsoDateToFormat = (date: string, format: string) => {
	return DateTime.fromISO(date).toFormat(format)
}