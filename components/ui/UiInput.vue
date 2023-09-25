<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { computed } from '#imports'
import { ErrorObject } from '@vuelidate/core';

const emit = defineEmits(['blur', 'focus', 'change', 'update:modelValue', 'clear'])

const props = withDefaults(defineProps<{
	type?: string,
	modelValue?: string,
	required?: boolean,
	placeholder?: string,
	label?: string,
	disabled?: boolean,
	error?: ErrorObject[],
	showErrorText?: boolean,
	bgColor?: 'default' | 'violet' | 'white' | 'transparent' | 'shadePink' | '',
	size?: 'big' | 'small',
	success?: boolean,
}>(), {
	type: 'text',
	modelValue: '',
	required: false,
	placeholder: '',
	label: '',
	disabled: false,
	error: () => [],
	showErrorText: false,
	bgColor: 'default',
	size: 'big',
	success: false,
})

const model = useVModel(props, 'modelValue', emit)

const inputClasses = computed(() => {
	const classes = {
		'ui-input__input': true,
		'ui-input__input--error': props.showErrorText && props.error.length,
		'ui-input__input--disabled': props.disabled,
		'ui-input__input--success': props.success,
	}

	return classes
})

</script>

<template>
	<label
		class="ui-input"
		:class="[`ui-input_type_${props.type}`]"
	>
		<span v-if="props.label" class="ui-input__label label">{{ props.label }}</span>
		<span
			class="ui-input__wrapper"
			:class="`ui-input__wrapper--size-${props.size}`"
		>
			<input
				v-model="model"
				:class="inputClasses"
				:type="props.type"
				:required="props.required"
				:placeholder="props.placeholder"
				:disabled="props.disabled"
				v-bind="$attrs"
			>
		</span>
	</label>
	<div class="ui-input__errors-wrapper" v-if="props.showErrorText && props.error.length">
		<span
			class="ui-input__error"
			v-for="item in props.error"
		>
			{{ item.$message }}
		</span>
	</div>
</template>

<style lang="scss" scoped>

.ui-input {
	@include wrapperWithError();

	&__wrapper {
		position: relative;

		&-add-text {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 20px;

			@include breakpoint(pad down) {
				right: 20px;
			}
		}
	}

	// &__error {
	// 	position: absolute;
	// 	top: 100%;
	// 	left: 0;
	// 	max-width: 100%;
	// }

	&__input {
		@include inputStyle;

		@each $classBtn, $bgColor in (default, $gray-500),
			(white, $white),
			(transparent, transparent),
			(shadePink, $gray-500) {
			&#{'--bg-'+$classBtn} {
				background-color: $bgColor;
			}
		}

		&--add-text {
			padding-right: 60px;

			@include breakpoint(pad down) {
				padding-right: 66px;
			}
		}

		&--padding-button {
			padding-right: 85px;

			@include breakpoint(pad down) {
				right: 85px;
			}
		}

		&--padding-clear {
			padding-right: 45px;

			@include breakpoint(pad down) {
				padding-right: 45px;
			}
		}

		&--padding {
			padding-right: 122px;

			@include breakpoint(pad down) {
				padding-right: 0;
			}
		}
	}
}
</style>
