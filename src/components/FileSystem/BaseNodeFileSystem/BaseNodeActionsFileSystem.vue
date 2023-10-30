<template>
  <div class="node-actions">
    <BaseDropdown>
      <template #content="{ toggle }">
        <BaseInput
          v-model="nodeName"
          placeholder="Введите имя папки или файла..."
          class="node-input"
        >
          <template #append-icon>
            <div class="node-input-icons-container">
              <BaseIconWrapper
                class="node-mark-icon"
                @click="addNode(toggle)"
              >
                <MarkIcon />
              </BaseIconWrapper>

              <BaseIconWrapper
                class="node-close-icon"
                @click="toggle(false)"
              >
                <CloseIcon />
              </BaseIconWrapper>
            </div>
          </template>
        </BaseInput>
      </template>

      <template #trigger>
        <BaseIconWrapper class="node-icon">
          <PlusIcon />
        </BaseIconWrapper>
      </template>
    </BaseDropdown>

    <BaseIconWrapper
      class="node-icon"
      @click="deleteNode"
    >
      <BinIcon />
    </BaseIconWrapper>
  </div>
</template>

<script setup lang="ts">
  import BaseIconWrapper from '@/components/common/BaseIconWrapper.vue';
  import PlusIcon from '@/assets/icons/PlusIcon.vue';
  import BinIcon from '@/assets/icons/BinIcon.vue';
  import BaseDropdown from '@/components/common/BaseDropdown.vue';
  import BaseInput from '@/components/common/BaseInput.vue';
  import MarkIcon from '@/assets/icons/MarkIcon.vue';
  import CloseIcon from '@/assets/icons/CloseIcon.vue';
  import { ref } from 'vue';

  const emit = defineEmits<{
    (e: 'add', value: string): void;
    (e: 'delete'): void;
  }>();

  const nodeName = ref<string>('');

  const addNode = (toggleDropdown: (value?: boolean) => void) => {
    emit('add', nodeName.value);

    toggleDropdown(false);
  };

  const deleteNode = () => {
    emit('delete');
  };
</script>

<style scoped>
  .node-actions {
    display: flex;
    gap: 8px;
  }

  .node-input {
    width: 230px;
  }

  .node-input-icons-container {
    width: 100%;
    display: flex;
    gap: 4px;
    justify-content: end;
  }

  .node-icon :deep(path) {
    stroke: white;
  }

  .node-mark-icon :deep(path) {
    stroke: mediumspringgreen;
    fill: mediumspringgreen;
  }

  .node-close-icon :deep(path) {
    stroke-width: 2px;
    stroke: red;
    fill: red;
  }
</style>
