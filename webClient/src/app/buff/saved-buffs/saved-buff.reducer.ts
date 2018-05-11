import { Action } from '@app/core';

import { SavedBuff, SavedBuffEntities } from './saved-buff.models';
import * as saveActions from './saved-buff.actions';


export interface SavedBuffState {
  ids: string[];
  entities: SavedBuffEntities;
}

export const initialState: SavedBuffState = {
  ids: [],
  entities: {}
};

export const selectIds = (state: SavedBuffState) => state.ids;
export const selectEntities = (state: SavedBuffState) => state.entities;


export function savedBuffReducer(
  state: SavedBuffState = initialState,
  action: saveActions.SavebuffActions
): SavedBuffState {
  switch (action.type) {
    case saveActions.LOAD_BUFFS_SUCCESS:
      const ids = Object.keys(action.payload);
      return {ids: ids, entities:action.payload};
    default:
      return state;
  }
}
