<script lang="ts" setup>
const emit = defineEmits(['click'])

const props = withDefaults(defineProps<{
  appendIcon?: string,
  disabled?: boolean,
}>(), {
  appendIcon: '',
  disabled: false,
})

</script>

<template>
  <button
      class="ui-button"
      :disabled="disabled"
      @click="emit('click')"
  >
    <span :class="['ui-button__content']">
			<slot />
		</span>
    <ui-svg
        v-if="props.appendIcon"
        :name="props.appendIcon"
        :class="['ui-button__icon ui-button__icon--right']"
    />
  </button>
</template>

<style lang="scss" scoped>

.ui-button {
  @include btn();
  position: relative;
  font-weight: 400;
  background-color: $blue-dark;
  color: $white;

  &:disabled {
    pointer-events: none;
    background: $gray-300;
  }

  &__icon {
    min-width: 16px;
    width: 16px;
    height: 16px;
    margin-left: 8px;
    fill: $white;
    color: $white;
    transition: all .3s;

    @include breakpoint(pad down) {
      min-width: 20px;
      width: 20px;
      height: 20px;
    }

    &:disabled {
      pointer-events: none;
      background: $grey;
    }

    &__content {
      display: block;
    }

    &__wrapper {
      width: 100%;
    }
  }
}
</style>
