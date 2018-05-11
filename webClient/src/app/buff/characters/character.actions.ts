import { Action } from '@ngrx/store';

export const LS_KEY = 'buff.characters.characters';

export const LOAD_AVATARS = '[CHAR] Load Avatars';
export const LOAD_AVATARS_FAIL = '[CHAR] Load Avatars Fail';
export const LOAD_AVATARS_SUCESS = '[CHAR] Load Avatars Success';

export const ADD_AVATAR = '[CHAR] Add Avatar';

export const AVATAR_SELECT = '[CHAR] Avatar Select';
export const AVATAR_DELETE = '[CHAR] Avatar Delete';

export class LoadAvatars implements Action {
  readonly type = LOAD_AVATARS;
}

export class LoadAvatarsFail implements Action {
  readonly type = LOAD_AVATARS_FAIL;
  constructor(public payload: any) {}
}

export class LoadAvatarsSuccess implements Action {
  readonly type = LOAD_AVATARS_SUCESS;
  constructor(public payload: string[]) {}
}

export class AddAvatar implements Action{
  readonly type = ADD_AVATAR;
  constructor(public payload: string) {}
}

export class AvatarSelect implements Action {
  readonly type = AVATAR_SELECT;
  constructor(public payload: string) {}
}
export class AvatarDelete implements Action {
  readonly type = AVATAR_DELETE;
  constructor(public payload: string) {}
}

export type Actions =
  | LoadAvatars
  | LoadAvatarsFail
  | LoadAvatarsSuccess
  | AddAvatar
  | AvatarSelect
  | AvatarDelete;
