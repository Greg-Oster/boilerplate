<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal'

</script>

<template>
  <div id="layout" class="layout">
    <header class="layout__header">
      <ui-svg name="logo" class="layout__header-logo" />
    </header>
    <main id="layout__main" class="layout__main-page">
      <slot />
    </main>
    <client-only>
			<ModalsContainer />
		</client-only>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  background-color: $semi-black;

  &__header {
    display: flex;
    justify-content: center;
    background-color: $gray-700;
    height: 200px;
  }

  &__header-logo {
    height: 48px;
    margin-top: 72px;
  }

  &__main-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 736px;
    margin: 0 auto;

    @include breakpoint(pad down) {
      width: 100%;
      padding: 0 20px;
    }
  }
}
</style>
