import { Expose, Transform, Type } from 'class-transformer'
import { toString } from 'lodash-es'

export class Route {
	@Expose()
	@Transform(({ value }) => toString(value))
		name = ''
}

export class Breadcrumbs {
	@Expose()
	@Transform(({ value }) => toString(value))
		label = ''

	@Expose()
	@Type(() => Route)
		route: Route
}