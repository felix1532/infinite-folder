<template>
  <div
    v-click-outside="handleClickOutside"
    class="dropdown"
  >
    <div
      class="dropdown-activator"
      @click="prevent ? constVoid : toggleDropdown()"
    >
      <slot
        name="trigger"
        :toggleDropdown="toggleDropdown"
      ></slot>
    </div>
    <Transition>
      <div
        v-show="dropdownOpen"
        class="dropdown-content"
        @click="closeOnClick ? toggleDropdown(false) : constVoid"
      >
        <slot
          name="content"
          :toggle="toggleDropdown"
        ></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { constVoid } from '@/utils/function';

  const props = withDefaults(
    defineProps<{
      modelValue?: boolean;
      closeOnClickOutside?: boolean;
      closeOnClick?: boolean;
      prevent?: boolean;
    }>(),
    {
      modelValue: false,
      closeOnClickOutside: true,
      closeOnClick: false,
      prevent: false,
    }
  );

  const emit = defineEmits<{
    (e: 'clickOutside'): void;
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const dropdownOpen = ref<boolean>(props.modelValue);

  const toggleDropdown = (value = !dropdownOpen.value) => {
    dropdownOpen.value = value;
    emit('update:modelValue', value);
  };

  const handleClickOutside = () => {
    if (props.closeOnClickOutside) {
      if (dropdownOpen.value) {
        emit('clickOutside');
      }
      toggleDropdown(false);
    }
  };

  watch(
    () => props.modelValue,
    () => {
      if (props.modelValue !== dropdownOpen.value) {
        dropdownOpen.value = props.modelValue;
      }
    }
  );
</script>

<style scoped>
  .dropdown {
    position: relative;
    height: auto;
    background: transparent;
    width: fit-content;
  }

  .dropdown-content {
    position: absolute;
    background: #434445;
    border-radius: 8px;
    top: 0;
    left: calc(100% + 4px);
    z-index: 100;
  }

  .v-enter-active {
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }

  .v-leave-active {
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }

  .v-enter-to,
  .v-leave-from {
    opacity: 1;
    overflow: hidden;
  }

  .v-enter-from,
  .v-leave-to {
    overflow: hidden;
    opacity: 0;
  }
</style>
