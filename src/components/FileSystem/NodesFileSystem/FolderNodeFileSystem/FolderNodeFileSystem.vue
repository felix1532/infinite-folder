<template>
  <div
    v-if="node"
    class="node-file-system-container"
  >
    <FolderContextMenuFileSystem
      :hideMenu="!isEditName"
      @folder="updateShowFolder(!node.isShow)"
      @createNode="toggleCreateNode"
      @editName="toggleEditFolderName"
      @delete="deleteFolder"
    >
      <BaseIconWrapper class="node-icon">
        <OpenedFolderIcon v-if="node.isShow" />
        <ClosedFolderIcon v-else />
      </BaseIconWrapper>

      <NodeNameFileSystem
        v-model="isEditName"
        :name="node.name"
        placeholder="Введите название папки..."
        @update="updateFolderName"
      />
    </FolderContextMenuFileSystem>

    <div v-show="node.isShow">
      <template v-if="children.size || typeCreationNode">
        <FileSystem :data="children" />

        <CreationNodeFileSystem
          v-if="typeCreationNode"
          :type="typeCreationNode"
          @create="createNode"
          @end="toggleCreateNode(null)"
        />
      </template>
      <div
        v-else
        class="node-file-empty"
      >
        Пусто
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import FileSystem from '@/components/FileSystem/FileSystem.vue';
  import CreationNodeFileSystem from '@/components/FileSystem/NodesFileSystem/FolderNodeFileSystem/CreationNodeFileSystem/CreationNodeFileSystem.vue';

  import NodeNameFileSystem from '@/components/FileSystem/NodesFileSystem/components/NodeNameFileSystem.vue';
  import ClosedFolderIcon from '@/assets/icons/ClosedFolderIcon.vue';
  import OpenedFolderIcon from '@/assets/icons/OpenedFolderIcon.vue';
  import BaseIconWrapper from '@/components/common/BaseIconWrapper.vue';
  import FolderContextMenuFileSystem from '@/components/FileSystem/NodesFileSystem/FolderNodeFileSystem/FolderContextMenuFileSystem.vue';
  import type { IFolderVirtualNodeFileSystem } from '@/stores/fileSystemStore/models/nodeVirtualModel';
  import type { TItemFileSystemType } from '@/stores/fileSystemStore/models/nodeTypes';
  import type { IUpdateFileSystem } from '@/stores/fileSystemStore/models/nodeData';

  const { deleteCurrentNode, getNodeData, editCurrentNode, addChildNode } =
    defineProps<IFolderVirtualNodeFileSystem>();

  const typeCreationNode = ref<TItemFileSystemType | null>(null);
  const isEditName = ref<boolean>(false);

  const node = computed(() => getNodeData());

  const toggleCreateNode = (type: TItemFileSystemType | null) => {
    typeCreationNode.value = type;

    if (type) {
      updateShowFolder(true);
    }
  };

  const createNode = (data: IUpdateFileSystem) => {
    addChildNode(data);

    toggleCreateNode(null);
  };

  const toggleEditFolderName = () => {
    isEditName.value = !isEditName.value;
  };

  const updateShowFolder = (value: boolean) => {
    editCurrentNode({
      isShow: value,
    });
  };

  const updateFolderName = (newName: string) => {
    editCurrentNode({
      name: newName,
    });
  };

  const deleteFolder = () => {
    deleteCurrentNode();
  };
</script>

<style scoped>
  .node-file-system-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }

  .node-file-empty {
    padding: 4px 0;
    margin-left: 32px;
  }

  .node-icon :deep(path) {
    fill: #e3e5e8;
    stroke: #e3e5e8;
  }
</style>
