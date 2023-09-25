<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useVModel } from '@vueuse/core'
import { ErrorObject } from '@vuelidate/core';

const emit = defineEmits(['blur', 'focus', 'change', 'update:modelValue', 'clear'])

const props = withDefaults(defineProps<{
	modelValue?: string,
	required?: boolean,
	placeholder?: string,
	error?: ErrorObject[],
}>(), {
	modelValue: '',
	required: false,
	placeholder: '',
	error: () => [],
})

const model = useVModel(props, 'modelValue', emit)
const handleDate = (modelData: Date) => {
	model.value = modelData.toISOString();
}

const format = (date: Date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
}

</script>

<template>
	<VueDatePicker
		class="ui-datepicker"
		:class="{'ui-datepicker--error': error.length}"
		input-class-name="ui-datepicker__input"
		menu-class-name="ui-datepicker__calendar"
		calendar-cell-class-name="ui-datepicker__cell"
		v-model="model"
		@update:model-value="handleDate"
		:clearable="false"
		auto-apply
		:placeholder="placeholder"
		required
		:hide-navigation="['month', 'year']"
		disable-year-select
		:min-date="new Date()"
		ignore-time-validation
		:enable-time-picker="false"
		locale="ru"
		dark
		:format="format"
		month-name-format="long"
	/>
	<div class="ui-datepicker__errors-wrapper" v-if="props.error.length">
		<span
			class="ui-datepicker__error"
			v-for="item in props.error"
		>
			{{ item.$message }}
		</span>
	</div>
</template>

<style lang="scss" scoped>
.ui-datepicker {
	@include wrapperWithError();
}
</style>

<style lang="scss">
.ui-datepicker {
	background-color: $gray-500;
	border: none;
	border-radius: 8px;

	&--error {
		.ui-datepicker__input {
			border: 1px solid $accentRed !important;
		}
	}

	&__input {
		background-color: $gray-500;
		padding-inline-start: 16px;
		border-radius: 8px;
    	border: none;
		border: 1px solid $gray-700;

		&.dp__input_focus {
			border: 1px solid $purple-dark;
		}

		&::placeholder {
			color: $gray-300;
		}

		&:hover {
			border-color: $purple-dark;
		}
	}

	&__calendar {
		background-color: $grey;

		.dp__arrow_top, .dp__arrow_bottom {
			background-color: $grey;
		}
	}

	&__cell {
		border-radius: 50%;

		&.dp__active_date {
			background: $purple;
		}
	}

	.dp__icon {
		inset-inline-start: calc(100% - 40px);
		fill: $gray-300;
	}
}

</style>
