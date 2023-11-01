<template>
  <BaseInput
    v-if="modelValue"
    v-model="newName"
    autofocus
    :placeholder="placeholder"
    @keyup.enter="updateName"
    @focusout="closeEdit"
    @keyup.esc="closeEdit"
  >
  </BaseInput>
  <div v-else>{{ fullName }}</div>
</template>

<script setup lang="ts">
  import BaseInput from '@/components/common/BaseInput.vue';
  import { computed, ref, watch } from 'vue';

  const props = defineProps<{
    modelValue: boolean;
    placeholder: string;
    name: string;
    extension?: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', v: boolean): void;
    (e: 'update', v: string): void;
  }>();

  const newName = ref<string>(props.name);

  const fullName = computed(() =>
    props.extension ? `${props.name}.${props.extension}` : props.name
  );

  watch(
    () => props.modelValue,
    isEdit => {
      if (isEdit) {
        newName.value = props.name;
      }
    }
  );

  const updateName = () => {
    if (newName.value) {
      emit('update', newName.value);

      closeEdit();
    }
  };

  const closeEdit = () => {
    newName.value = '';

    emit('update:modelValue', false);
  };
</script>
