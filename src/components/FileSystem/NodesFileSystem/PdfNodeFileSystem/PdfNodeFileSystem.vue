<template>
  <div
    v-if="node"
    class="node-file-system-container"
  >
    <PdfContextMenuFileSystem
      :hideMenu="!isEditName"
      @editName="toggleEditPdfName"
      @delete="deleteFile"
    >
      <BaseIconWrapper class="node-icon">
        <PdfIcon />
      </BaseIconWrapper>

      <NodeNameFileSystem
        v-model="isEditName"
        :name="node.name"
        :extension="node.extension"
        placeholder="Введите название файла..."
        @update="updatePdfName"
      />
    </PdfContextMenuFileSystem>
  </div>
</template>

<script setup lang="ts">
  import BaseIconWrapper from '@/components/common/BaseIconWrapper.vue';

  import { computed, ref } from 'vue';
  import PdfIcon from '@/assets/icons/PdfIcon.vue';
  import NodeNameFileSystem from '@/components/FileSystem/NodesFileSystem/components/NodeNameFileSystem.vue';
  import PdfContextMenuFileSystem from '@/components/FileSystem/NodesFileSystem/PdfNodeFileSystem/PdfContextMenuFileSystem.vue';
  import type { IPdfVirtualNodeFileSystem } from '@/stores/fileSystemStore/models/nodeVirtualModel';

  const { getNodeData, editCurrentNode, deleteCurrentNode } =
    defineProps<IPdfVirtualNodeFileSystem>();

  const isEditName = ref<boolean>(false);

  const node = computed(() => getNodeData());

  const updatePdfName = (newName: string) => {
    editCurrentNode({ name: newName });
  };

  const deleteFile = () => {
    deleteCurrentNode();
  };

  const toggleEditPdfName = () => {
    isEditName.value = !isEditName.value;
  };
</script>

<style scoped>
  .node-file-system-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    cursor: pointer;
  }

  .node-icon :deep(path) {
    fill: #e3e5e8;
    stroke: #e3e5e8;
  }
</style>
