<template>
  <div
    v-if="resolveComponentByType"
    class="creation-file-system-container"
  >
    <component
      :is="resolveComponentByType"
      v-bind="bindComponentAttrs"
    />
  </div>
</template>

<script setup lang="ts" generic="T extends IUpdateFileSystem">
  import CreationFolderFileSystem from '@/components/FileSystem/NodesFileSystem/FolderNodeFileSystem/CreationNodeFileSystem/components/CreationFolderFileSystem.vue';
  import CreationPdfFileSystem from '@/components/FileSystem/NodesFileSystem/FolderNodeFileSystem/CreationNodeFileSystem/components/CreationPdfFileSystem.vue';
  import { computed } from 'vue';
  import type { IUpdateFileSystem } from '@/stores/fileSystemStore/models/nodeData';

  const props = defineProps<{ type: T['type'] }>();

  const emit = defineEmits<{
    (e: 'create', v: T): void;
    (e: 'end'): void;
  }>();

  const create = (data: T) => {
    emit('create', data);
  };

  const end = () => {
    emit('end');
  };

  const bindComponentAttrs = {
    onCreate: create,
    onEnd: end,
  };

  const resolveComponentByType = computed(() => {
    switch (props.type) {
      case 'folder':
        return CreationFolderFileSystem;
      case 'pdf':
        return CreationPdfFileSystem;
      default:
        return null;
    }
  });
</script>

<style scoped>
  .creation-file-system-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    cursor: pointer;
  }
</style>
