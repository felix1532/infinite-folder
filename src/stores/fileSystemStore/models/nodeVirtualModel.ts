//Общий интерфейс каждого узла виртуальной модели
import type { TUIUniqid } from '@/utils/UIUniqid';
import type {
  TFolderFileSystem,
  TPDFFileSystem,
} from '@/stores/fileSystemStore/models/nodeTypes';
import type {
  IFolderFileSystemComponent,
  IPdfFileSystemComponent,
} from '@/stores/fileSystemStore/mappers';
import type { AtLeastOne } from '@/utils/object';
import type {
  IUpdateFileSystem,
  IUpdateFolderFileSystem,
  IUpdatePdfFileSystem,
} from '@/stores/fileSystemStore/models/nodeData';

//Интерфейс виртуальной модели типа "Папка"
export interface IFolderVirtualNodeFileSystem
  extends IAppendFolderVirtualNodeFileSystem {
  readonly id: TUIUniqid;
  readonly type: TFolderFileSystem;

  readonly getNodeData: () => Readonly<IFolderFileSystemComponent | null>;
  readonly editCurrentNode: (
    value: AtLeastOne<Omit<IUpdateFolderFileSystem, 'type'>>
  ) => void;
  readonly deleteCurrentNode: () => void;
}

//Дополнительные методы для модели "Папка"
export interface IAppendFolderVirtualNodeFileSystem {
  readonly children: TVirtualModelFileSystem;
  readonly addChildNode: (data: IUpdateFileSystem) => void;
}

//Интерфейс виртуальной модели типа "PDF файл"
export interface IPdfVirtualNodeFileSystem {
  readonly id: TUIUniqid;
  readonly type: TPDFFileSystem;

  readonly getNodeData: () => Readonly<IPdfFileSystemComponent | null>;
  readonly editCurrentNode: (
    value: AtLeastOne<Omit<IUpdatePdfFileSystem, 'type'>>
  ) => void;
  readonly deleteCurrentNode: () => void;
}

//Типы узлов виртуальной модели файловой системы
export type IVirtualNodeModelFileSystem =
  | IFolderVirtualNodeFileSystem
  | IPdfVirtualNodeFileSystem;

export type IAppendNodeModelFileSystem = IAppendFolderVirtualNodeFileSystem;

//Виртуальная модель файловой системы
export type TVirtualModelFileSystem = Map<
  TUIUniqid,
  IVirtualNodeModelFileSystem
>;
