<script lang="ts" setup>

const props = withDefaults(defineProps<{
	text?: string
	count?: number | null
	total: number
}>(), {
	text: '',
	count: null,
	total: 0,
})

const showFrom = computed(() => {
	return props.count != null && props.count >= 0 && props.total != 0
})
</script>

<template>
	<div class="ui-counter">
		<p class="ui-counter__text" v-if="text">{{ text }}</p>
		<div class="ui-counter__counter">
			<span class="ui-counter__counter-item" v-if="showFrom">{{ `${count} из ` }}</span>
			<span class="ui-counter__counter-item">{{ total }}</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>

.ui-counter {
	display: flex;
	gap: 8px;
	align-items: center;
	font-weight: bold;
	font-size: 14px;
	color: inherit;

	&__text {
		margin: 0;
		font-weight: 700;
		color: inherit;
	}

	&__counter {
		background-color: $gray-400;
		border-radius: 100px;
		padding: 2px 8px;
		color: $gray-200;
		font-weight: bold;
		font-size: 12px;
	}
}
</style>
