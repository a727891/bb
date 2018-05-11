import { Action } from '@ngrx/store';
import { SavedBuff, SavedBuffEntities } from './saved-buff.models';

export const LS_KEY = 'buff.savedbuff';

export const LOAD_BUFFS = '[SAVED] Load Buffs';
export const LOAD_BUFFS_SUCCESS = '[SAVED] Load Buffs Success';
export const LOAD_BUFFS_FAIL = '[SAVED] Load Buffs Failed';

export const SAVE_BUFF = '[SAVED] Save Buff';
export const DELETE_BUFF = '[SAVED] Delete Buff';

export class LoadBuffs implements Action {
  readonly type = LOAD_BUFFS;
}

export class LoadBuffsSuccess implements Action {
  readonly type = LOAD_BUFFS_SUCCESS;
  constructor(public payload: SavedBuffEntities = {}) {}
}

export class LoadBuffsFail implements Action {
  readonly type = LOAD_BUFFS_SUCCESS;
  constructor(public payload: any) {}
}

export class SaveBuff implements Action {
  readonly type = SAVE_BUFF;
  constructor(public payload: SavedBuff) {}
}

export class DeleteBuff implements Action {
  readonly type = DELETE_BUFF;
  constructor(public payload: SavedBuff) {}
}

export type SavebuffActions =
  | LoadBuffs
  | LoadBuffsSuccess
  | LoadBuffsFail
  | SaveBuff
  | DeleteBuff;
