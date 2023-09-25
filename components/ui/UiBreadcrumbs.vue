<script setup lang="ts">
import { ClassUtils } from '~/typings/class'
import { Breadcrumbs } from '~/types/page'

withDefaults(defineProps<{
	breadcrumbs: ClassUtils.Plain<Breadcrumbs>[]
}>(), {
	breadcrumbs () {
		return []
	}
})
</script>

<template>
	<nav class="ui-breadcrumbs">
		<ul class="list ui-breadcrumbs__list">
			<li
				v-for="(item, key) in breadcrumbs"
				:key="`breadcrumb-item-${key}`"
				class="ui-breadcrumbs__list-item"
			>
				<span
					v-if="key === breadcrumbs.length-1"
					class="ui-breadcrumbs__list-item-link"
				>
					{{ item.label }}
				</span>
				<nuxt-link
					v-else
					:to="item.route.name"
					class="ui-breadcrumbs__list-item-link"
				>
					{{ item.label }}
				</nuxt-link>
				<span v-if="key < breadcrumbs.length - 1" class="ui-breadcrumbs__list-item-separate">
					/
				</span>
			</li>
		</ul>
	</nav>
</template>

<style lang="scss" scoped>
.ui-breadcrumbs {
	display: flex;

	&__list {
		display: flex;
		align-items: center;

		&-item {
			display: flex;
			align-items: center;

			&-link {
				display: inline-block;
				color: $gray-300;
				font-weight: 400;
				font-size: 14px;
				font-family: 'Inter';
				text-decoration: none;
			}

			&-separate {
				@include in-center;
				width: 14px;
				height: 11px;
				color: $gray-300;
			}
		}
	}
}
</style>
