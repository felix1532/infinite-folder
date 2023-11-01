<template>
  <div class="creation-file">
    <BaseIconWrapper class="node-icon">
      <ClosedFolderIcon />
    </BaseIconWrapper>

    <CreationInputFileSystem
      v-model="inputValue"
      placeholder="Введите название папки..."
      @create="createFolder"
      @end="endCreateFolder"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import BaseIconWrapper from '@/components/common/BaseIconWrapper.vue';

  import ClosedFolderIcon from '@/assets/icons/ClosedFolderIcon.vue';
  import CreationInputFileSystem from '@/components/FileSystem/NodesFileSystem/FolderNodeFileSystem/CreationNodeFileSystem/components/CreationInputFileSystem.vue';
  import type { IUpdateFolderFileSystem } from '@/stores/fileSystemStore/models/nodeData';

  const emit = defineEmits<{
    (e: 'create', v: IUpdateFolderFileSystem): void;
    (e: 'end'): void;
  }>();

  const inputValue = ref('');

  const createFolder = () => {
    if (inputValue.value) {
      emit('create', { name: inputValue.value, type: 'folder', isShow: false });
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
