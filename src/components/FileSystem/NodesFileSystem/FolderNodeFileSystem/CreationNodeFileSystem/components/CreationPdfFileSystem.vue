<template>
  <div class="creation-file">
    <BaseIconWrapper class="node-icon">
      <PdfIcon />
    </BaseIconWrapper>

    <CreationInputFileSystem
      v-model="inputValue"
      placeholder="Введите название файла..."
      @create="createFolder"
      @end="endCreateFolder"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import BaseIconWrapper from '@/components/common/BaseIconWrapper.vue';

  import PdfIcon from '@/assets/icons/PdfIcon.vue';
  import CreationInputFileSystem from '@/components/FileSystem/NodesFileSystem/FolderNodeFileSystem/CreationNodeFileSystem/components/CreationInputFileSystem.vue';
  import type { IUpdatePdfFileSystem } from '@/stores/fileSystemStore/models/nodeData';

  const emit = defineEmits<{
    (e: 'create', v: IUpdatePdfFileSystem): void;
    (e: 'end'): void;
  }>();

  const inputValue = ref('');

  const createFolder = () => {
    if (inputValue.value) {
      emit('create', {
        type: 'pdf',
        name: inputValue.value,
        value: 'some pdf data',
      });
    }
  };

  const endCreateFolder = () => {
    emit('end');
  };
</script>

<style scoped>
  .creation-file {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 0;
  }

  .node-icon :deep(path) {
    fill: #e3e5e8;
    stroke: #e3e5e8;
  }
</style>
