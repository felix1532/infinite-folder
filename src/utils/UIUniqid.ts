import uniqid from 'uniqid';

const uiidPrefix = 'uiid' as const;

export type TUIUniqid = `${typeof uiidPrefix}_${string}`;

export function UIUniqid(): TUIUniqid {
  return `${uiidPrefix}_${uniqid()}`;
}
