<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { useDevice, onMounted } from '#imports'
import { ListItemTest } from '~/types/list.todo'
import { DateTime } from 'luxon'
import { required, helpers, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { convertIsoDateToFormat } from '~/helpers/utils'

const props = withDefaults(defineProps<{
	modalTitle: string,
	editItem?: ListItemTest,
	btnText: string,
}>(), {
	modalTitle: '',
	editItem: undefined,
	btnText: '',
})

const emit = defineEmits<{(e: 'update:modelValue', modelValue: boolean): void, (e: 'confirm', value: ListItemTest): void }>()

const { isDesktop } = useDevice()


const isValidForm = computed(() => {
	return !v$.value.$errors.length
})

const formData: ListItemTest = reactive({
	title: '',
	description: '',
	date_start: String(DateTime.now().toISO()),
	date_end: '',
	completed: false,
	id: '',
});

onMounted(() => {
	if (props.editItem){
		formData.title = props.editItem.title
		formData.description = props.editItem.description
		formData.date_start = props.editItem.date_start
		formData.date_end = props.editItem.date_end
		formData.completed = props.editItem.completed
		formData.id = props.editItem.id
	}
})

const testDate = (value: string) => {
	const convertedDate = convertIsoDateToFormat(value, 'dd.MM.yyyy')
	return /(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[1,2])\.(19|20)\d{2}/.test(convertedDate)
}

const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage('Это обязательное поле', required),
    },
    description: {
      required: helpers.withMessage('Это обязательное поле', required),
      minLength: helpers.withMessage('3 символа минимум', minLength(3)),
    },
	date_end: {
      required: helpers.withMessage('Это обязательное поле', required),
      date_correct: helpers.withMessage('Дата должны быть введена в верном формате', testDate),
    },
  };
});

const v$ = useVuelidate(rules, formData);

function handleConfirm(){
	v$.value.$validate();
	if (!v$.value.$error) {
		emit('confirm', formData)
	}
}

</script>

<template>
	<vue-final-modal
		overlay-transition="vfm-fade"
		:content-transition="isDesktop ? 'vfm-fade' : 'vfm-slide-down'"
		click-to-close
		esc-to-close
		:swipe-to-close="isDesktop ? 'none' : 'down'"
		lock-scroll
		content-class="modal-add-item"
		@update:model-value="val => emit('update:modelValue', val)"
	>
		<div class="modal-add-item__container">
			<div
				class="modal-add-item__close-container"
				@click="emit('update:modelValue', false)"
			>
				<ui-svg
					name="cross"
					class="modal-add-item__close"
				/>
			</div>

			<div class="modal-add-item__title">
				<h2>{{ props.modalTitle }}</h2>
			</div>

			<div class="modal-add-item__input">
				<ui-input
					v-model="formData.title"
					id="title"
					@input="v$.title.$touch"
					:error="v$.title.$errors"
					showErrorText
					required
					placeholder="Заголовок"
				/>
			</div>
			<div class="modal-add-item__input">
				<ui-input
					v-model="formData.description"
					@input="v$.description.$touch"
					:error="v$.description.$errors"
					showErrorText
					required
					placeholder="Текст"
				/>
			</div>
			<div class="modal-add-item__input">
				<ui-datepicker
					v-model="formData.date_end"
					@change="v$.date_end.$touch"
					:error="v$.date_end.$errors"
					required
					placeholder="Введите дату"
				/>
			</div>
			<ui-button
				size="large"
				:disabled="!isValidForm"
				class="modal-add-item__btn"
				@click="handleConfirm"
				:append-icon="editItem ? 'edit': 'add'"
			>
				{{ props.btnText }}
			</ui-button>
		</div>
	</vue-final-modal>
</template>

<style lang="scss">

.modal-add-item {
	@include absolute-center();
	background-color: $gray-400;
	border-radius: 8px;
	width: 457px;

	@include breakpoint(pad down) {
		width: 100%;
		bottom: 0;
		left: 0;
		top: auto;
    	transform: translate(0%, 0%);
    }

	&__container {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 20px;
	}

	&__close-container {
		cursor: pointer;
		position: absolute;
		top: 20px;
		right: 20px;
		width: 23px;
		height: 23px;
		border-radius: 4px;
		background-color: $accentRed;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__close {
		width: 13px;
		height: 13px;
	}

	&__title {
		color: $white;
		margin-bottom: 10px;
	}

	&__input {
		padding:0 4px;
	}

	&__btn {
		margin:0 4px;
	}
}
</style>
