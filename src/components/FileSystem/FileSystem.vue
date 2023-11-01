<template>
  <div
    v-if="data.size"
    class="file-system-nodes-container"
  >
    <div
      v-for="node of data.values()"
      :key="node.id"
    >
      <div class="file-system-node">
        <component
          :is="resolveComponentByType(node.type)"
          v-bind="node"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { DeepReadonly } from 'vue';
  import FolderNodeFileSystem from '@/components/FileSystem/NodesFileSystem/FolderNodeFileSystem/FolderNodeFileSystem.vue';
  import PdfNodeFileSystem from '@/components/FileSystem/NodesFileSystem/PdfNodeFileSystem/PdfNodeFileSystem.vue';
  import type { TVirtualModelFileSystem } from '@/stores/fileSystemStore/models/nodeVirtualModel';
  import type { TItemFileSystemType } from '@/stores/fileSystemStore/models/nodeTypes';

  defineProps<{
    data: DeepReadonly<TVirtualModelFileSystem>;
  }>();

  const resolveComponentByType = (type: TItemFileSystemType) => {
    switch (type) {
      case 'folder':
        return FolderNodeFileSystem;
      case 'pdf':
        return PdfNodeFileSystem;
    }
  };
</script>

<style scoped>
  .file-system-nodes-container {
    display: flex;
    flex-direction: column;
  }

  .file-system-node {
    display: flex;
    flex-direction: column;
  }
</style>
