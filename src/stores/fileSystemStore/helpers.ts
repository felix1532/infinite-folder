import type {
  IFolderFileSystem,
  IPdfFileSystem,
  IUpdateFileSystem,
} from '@/stores/fileSystemStore/models/nodeData';
import type { TItemFileSystemType } from '@/stores/fileSystemStore/models/nodeTypes';
import { folderTypeFileSystem } from '@/stores/fileSystemStore/models/nodeTypes';
import type {
  IAppendFolderVirtualNodeFileSystem,
  IAppendNodeModelFileSystem,
  IVirtualNodeModelFileSystem,
  TVirtualModelFileSystem,
} from '@/stores/fileSystemStore/models/nodeVirtualModel';

const getEmptyPdfNode = (): IPdfFileSystem => {
  return {
    extension: 'pdf',
    type: 'pdf',
    name: '',
    value: 'some pdf data',
  };
};

const getEmptyFolderNode = (): IFolderFileSystem => {
  return {
    type: 'folder',
    isShow: false,
    name: '',
  };
};

export const getEmptyNodeByType = (type: TItemFileSystemType) => {
  switch (type) {
    case 'pdf':
      return getEmptyPdfNode();
    case 'folder':
      return getEmptyFolderNode();
  }
};

interface IVirtualModelNodeParams {
  getCurrentVirtualNode: () => null | IVirtualNodeModelFileSystem;
  createVirtualNodeFileSystem: (
    data: IUpdateFileSystem,
    currentNode: TVirtualModelFileSystem
  ) => void;
}

export const getAppendModelNode = (
  type: TItemFileSystemType,
  params: IVirtualModelNodeParams
): IAppendNodeModelFileSystem | null => {
  switch (type) {
    case 'folder':
      return getAppendFolderVirtualModelNode(params);
    default:
      return null;
  }
};

const getAppendFolderVirtualModelNode = (
  params: IVirtualModelNodeParams
): IAppendFolderVirtualNodeFileSystem => {
  const addChildNode = (data: IUpdateFileSystem): void => {
    const { getCurrentVirtualNode, createVirtualNodeFileSystem } = params;
    const node = getCurrentVirtualNode();

    if (!node) {
      return void 0;
    }

    if (node.type === folderTypeFileSystem) {
      createVirtualNodeFileSystem(data, node.children);
    }
  };

  return {
    children: new Map(),
    addChildNode,
  };
};
