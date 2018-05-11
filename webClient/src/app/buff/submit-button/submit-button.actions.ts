import { Action } from '@app/core';
import { BuffPackage } from '@app/buff/builder/builder.models';

export const SUBMIT_ACTION = '[BUFF] SUBMIT';

export class SubmitAction implements Action {
  readonly type = SUBMIT_ACTION;
  constructor(public payload: BuffPackage) {}
}


export type Action = SubmitAction;
