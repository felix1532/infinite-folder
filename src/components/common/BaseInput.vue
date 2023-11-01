<template>
  <div class="input-container">
    <input
      ref="inputRef"
      class="input-field"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    />
    <slot name="append-icon"></slot>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  const props = withDefaults(
    defineProps<{
      modelValue: string;
      placeholder: string;
      autofocus?: boolean;
    }>(),
    {
      autofocus: false,
    }
  );

  const inputRef = ref<HTMLInputElement>();

  onMounted(() => {
    if (inputRef.value && props.autofocus) {
      inputRef.value?.focus();
    }
  });

  const emits = defineEmits<(e: 'update:modelValue', value: string) => void>();
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;

    emits('update:modelValue', target.value);
  };
</script>

<style scoped>
  .input-container {
    padding: 6px;
    background-color: #434445;
    border-radius: 8px;
  }

  .input-field {
    width: 100%;
    background-color: transparent;
    color: white;
    font-size: 18px;
    font-family:
      Trebuchet MS,
      sans-serif;
  }

  .input-field::placeholder {
    color: white;
    font-size: 16px;
    font-family:
      Trebuchet MS,
      sans-serif;
  }
</style>
