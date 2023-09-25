import { Expose, Type, Transform } from 'class-transformer'
import { DateTime } from 'luxon'
import { toString } from 'lodash-es'
export class ListItemTest {
    @Expose()
    @Type(() => String)
    @Transform(({ value }) => toString(value))
    id = ''

    @Expose()
    @Type(() => Boolean)
    @Transform(({ value }) => Boolean(value))
    completed = false

    @Expose()
    @Type(() => String)
    @Transform(({ value }) => toString(value))
    title = ''

    @Expose()
    @Type(() => String)
    @Transform(({ value }) => toString(value))
    description = ''

    @Expose()
    @Transform(({ value }) => {
        const isValidISO = DateTime.fromISO(value).isValid
        return isValidISO ? toString(value) : ''
    })
    date_start = ''

    @Expose()
    @Transform(({ value }) => {
        const isValidISO = DateTime.fromISO(value).isValid
        return isValidISO ? toString(value) : ''
    })
    date_end = ''
}

