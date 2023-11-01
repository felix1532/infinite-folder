<template>
  <BaseInput
    v-click-outside="endCreateFolder"
    :modelValue="modelValue"
    autofocus
    :placeholder="placeholder"
    class="creation-file-input"
    @keyup.enter="createFolder"
    @keyup.esc="endCreateFolder"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
  </BaseInput>
</template>

<script setup lang="ts">
  import BaseInput from '@/components/common/BaseInput.vue';

  defineProps<{ placeholder: string; modelValue: string }>();

  const emit = defineEmits<{
    (e: 'create'): void;
    (e: 'end'): void;
    (e: 'update:modelValue'): void;
  }>();

  const createFolder = () => {
    emit('create');
  };

  const endCreateFolder = () => {
    emit('end');
  };
</script>

<style scoped>
  .creation-file-input {
    display: flex;
    align-items: center;
  }
</style>
