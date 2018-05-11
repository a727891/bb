import { Action } from '@ngrx/store';
import { BuffPackage } from '@app/buff/builder/builder.models';

export const QUEUE_LOAD = '[QUEUE] Load';
export const SUBMIT_ACTION = '[QUEUE] SUBMIT';

export const QUEUE_STATUS = '[QUEUE] Status';
export const QUEUE_CHANGED = '[QUEUE] Changed';
export const CAPTCHA_SUBMIT = '[QUEUE] Captcha';


export class QueueLoad implements Action{
   readonly type = QUEUE_LOAD;
}
export class SubmitAction implements Action {
  readonly type = SUBMIT_ACTION;
  constructor(public payload: BuffPackage) {}
}

export class QueueChanged implements Action {
  readonly type = QUEUE_CHANGED;
  constructor(public payload: any) {}
}

export class QueueStatusChanged implements Action{
  readonly type = QUEUE_STATUS;
  constructor(public payload: any){}
}

export class CaptchaSubmitted implements Action{
  readonly type = CAPTCHA_SUBMIT;
  constructor(public payload: string){}
}

export type Action = SubmitAction| QueueChanged | QueueLoad | QueueStatusChanged | CaptchaSubmitted;
