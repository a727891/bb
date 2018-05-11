import {} from '@app/core';
import * as queueActions from './queue.actions';
import { BuffPackage } from '@app/buff/builder/builder.models';
import {BuffQueueItem} from './queue.effects'
export interface QueueState {
  status: string;
  pending: BuffQueueItem[];
  captcha: string;
}

export const statusSelector = (state:QueueState) => state.status;
export const pendingSelector = (state:QueueState) => state.pending;
export const captchaSelector = (state:QueueState) => state.captcha;



export const inititalState: QueueState = {
  status: 'OFFLINE',
  pending: [],
  captcha: null
};

export function queueReducer(
  state: QueueState = { ...inititalState },
  action: queueActions.Action
): QueueState {
  switch (action.type) {
    case queueActions.QUEUE_CHANGED:{
      return {...state, pending:action.payload};
    }
    case queueActions.QUEUE_STATUS:{
      return {...state, status:action.payload.status, captcha: action.payload.captchaUrl};
    }
    default:
      return state;
  }
}
