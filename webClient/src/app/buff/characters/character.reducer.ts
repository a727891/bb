import { Action } from '@app/core';
import * as characterActions from './character.actions';

export interface CharacterState {
  characters: string[];
  selected: string;
  error: string;
}

export const selectCharacters = (state: CharacterState) => state.characters;
export const selectSelected = (state: CharacterState) => state.selected;
export const selectErrorMessage = (state: CharacterState) => state.error;

export const initialState: CharacterState = {
  characters: [],
  selected: '',
  error: ''
};

export function characterReducer(
  state: CharacterState = {...initialState},
  action: characterActions.Actions
): CharacterState {
  switch (action.type) {
    case characterActions.LOAD_AVATARS_SUCESS:
      return { ...state, characters: action.payload };
    case characterActions.LOAD_AVATARS_FAIL:
      return { ...state, error: action.payload };
    case characterActions.AVATAR_SELECT:
      return {...state, selected:action.payload};
    case characterActions.AVATAR_DELETE:
      return {...state, selected:''};
    default:
      return state;
  }
}
