<template>
  <div
    v-click-outside="handleClickOutside"
    class="dropdown"
  >
    <div
      class="dropdown-activator"
      @click="toggleDropdown()"
    >
      <slot name="trigger"></slot>
    </div>
    <Transition>
      <div
        v-show="dropdownOpen"
        class="dropdown-content"
        @click="closeOnClick ? toggleDropdown(false) : () => void 0"
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
  import { ref } from 'vue';

  const props = withDefaults(
    defineProps<{
      closeOnClickOutside?: boolean;
      closeOnClick?: boolean;
    }>(),
    {
      closeOnClickOutside: true,
      closeOnClick: false,
    }
  );

  const emit = defineEmits<{
    (e: 'clickOutside'): void;
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const dropdownOpen = ref<boolean>(false);

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
    padding: 10px;
    border-radius: 8px;
    top: calc(100% + 4px);
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
