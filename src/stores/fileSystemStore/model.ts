import type { TUIUniqid } from '@/utils/UIUniqid';

export interface IFileSystem {
  readonly id: TUIUniqid;
  readonly children: TMapFileSystem;
  value: string;
  isShow: boolean;

  readonly toggleShow: () => void;
  readonly addChildNode: (nodeName: string) => void;
  readonly deleteCurrentNode: () => void;
  readonly editCurrentNode: (nodeName: string) => void;
}

export type TMapFileSystem = Map<TUIUniqid, IFileSystem>;
