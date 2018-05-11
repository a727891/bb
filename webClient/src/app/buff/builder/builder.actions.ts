import { Action } from '@ngrx/store';
import { BuffOptions } from './builder.models';

// User Actions
export const BB_RESET = '[BB] Reset';
export const BB_INCREMENT = '[BB] Inc';
export const BB_DECREMENT = '[BB] Dec';

export const BB_SET_BUFF = '[BB] Set Buff';

export class BBResetAction implements Action {
  readonly type = BB_RESET;
}

export class BBIncrementAction implements Action {
  readonly type = BB_INCREMENT;
  constructor(public payload: string) {}
}
export class BBDecrementAction implements Action {
  readonly type = BB_DECREMENT;
  constructor(public payload: string) {}
}

export class BBSetBuff implements Action {
  readonly type = BB_SET_BUFF;
  constructor(public payload: BuffOptions) {}
}

export type All =
  | BBResetAction
  | BBIncrementAction
  | BBDecrementAction
  | BBSetBuff;
