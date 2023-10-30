import { defineStore } from 'pinia';
import { UIUniqid } from '@/utils/UIUniqid';
import { reactive } from 'vue';
import type {
  IFileSystem,
  TMapFileSystem,
} from '@/stores/fileSystemStore/model';

export const useFileSystemStore = defineStore('fileSystem', () => {
  const fileSystem = reactive<TMapFileSystem>(new Map());

  const createNodeFileSystem = (
    value: string,
    currentNode: TMapFileSystem = fileSystem
  ) => {
    const nodeKey = UIUniqid();

    const getCurrentNode = (functionName: string = 'unknown') => {
      const node = currentNode.get(nodeKey);

      if (!node) {
        console.error(`function:[${functionName}] - A non-existent node`);

        return null;
      }

      return node;
    };

    const deleteCurrentNode = () => {
      if (!currentNode.has(nodeKey)) {
        return void 0;
      }

      currentNode.delete(nodeKey);
    };

    const editCurrentNode = (value: string) => {
      const node = getCurrentNode('editNode');

      if (!node) {
        return void 0;
      }

      node.value = value;
    };

    const addChildNode = (value: string) => {
      const node = getCurrentNode('addNode');

      if (!node) {
        return void 0;
      }

      createNodeFileSystem(value, node.children);
    };

    const toggleShow = () => {
      const node = getCurrentNode('deleteNode');

      if (!node) {
        return void 0;
      }

      node.isShow = !node.isShow;
    };

    const children: IFileSystem['children'] = new Map();

    const node: IFileSystem = {
      id: nodeKey,
      isShow: false,
      value,
      children,

      deleteCurrentNode,
      editCurrentNode,
      addChildNode,
      toggleShow,
    };

    currentNode.set(nodeKey, node);
  };

  return { createNodeFileSystem, fileSystem };
});
