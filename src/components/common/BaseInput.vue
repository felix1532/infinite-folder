<template>
  <div>
    <input
      class="input-field"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    />
    <slot name="append-icon"></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ modelValue: string; placeholder: string }>();

  const emits = defineEmits<(e: 'update:modelValue', value: string) => void>();
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;

    emits('update:modelValue', target.value);
  };
</script>

<style scoped>
  .input-field {
    background: transparent;
    width: 100%;
    padding: 6px;
    color: white;
  }

  .input-field::placeholder {
    color: white;
    font-size: 14px;
    font-family:
      Trebuchet MS,
      sans-serif;
  }
</style>
