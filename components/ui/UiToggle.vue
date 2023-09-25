<script lang="ts" setup>
import { useVModel } from '#imports'

const props = withDefaults(defineProps<{
	modelValue: boolean
	inputId: string
}>(), {
	modelValue: false,
	inputId: ''
})
const emit = defineEmits(['update:modelValue', 'click', 'change'])
const model = useVModel(props, 'modelValue', emit)

function handleClick(event: Event){
	emit('click', event)
}
</script>

<template>
	<div>
		<input
			v-model="model"
			type="checkbox"
			class="visually-hidden"
			:id="inputId"
		/>
		<label
			:for="inputId"
			class="ui-checkbox"
			:class="{'ui-checkbox--checked': model}"
			@click="handleClick"
		>
			<span class="ui-checkbox__circle">
				<ui-svg
					v-if="model"
					name="check"
					class="ui-checkbox__icon"
				/>
			</span>
		</label>
	</div>
  </template>

<style lang="scss" scoped>
.ui-checkbox {
	display: block;
	width: 24px;
	height: 24px;
	padding: 2px;
	cursor: pointer;

	&--checked &__circle{
		border: 2px solid $purple-dark;
		background-color: $purple-dark;
	}

	&__circle {
		display: flex;
		width: 18px;
		height: 18px;
		justify-content: center;
		align-items: center;
		border: 2px solid $blue;
		border-radius: 50%;
	}

	&__icon {
		width: 10px;
		height: 10px;
	}
}
</style>
