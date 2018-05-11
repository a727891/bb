import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromBuilder from './builder/builder.reducer';
import * as fromCharacter from './characters/character.reducer';
import * as fromSavedBuffs from './saved-buffs/saved-buff.reducer';
import * as fromQueue from './queue/queue.reducer';
import { BuffPackage } from './builder/builder.models';

export interface BuffState {
  builder: fromBuilder.BuilderState;
  characters: fromCharacter.CharacterState;
  saved: fromSavedBuffs.SavedBuffState;
  queue: fromQueue.QueueState;
}

export const BuffReducers: ActionReducerMap<BuffState> = {
  builder: fromBuilder.builderReducer,
  characters: fromCharacter.characterReducer,
  saved: fromSavedBuffs.savedBuffReducer,
  queue: fromQueue.queueReducer

};

export const BuffStateSelector = createFeatureSelector('buff');

// Buff State
export const BuilderStateSelector = createSelector(
  BuffStateSelector,
  (state: BuffState) => state.builder
);
export const CharactersStateSelector = createSelector(
  BuffStateSelector,
  (state: BuffState) => state.characters
);

export const SavedBuffStateSelector = createSelector(
  BuffStateSelector,
  (state: BuffState) => state.saved
);

export const queueStateSelector = createSelector(
  BuffStateSelector,
  (state: BuffState) => state.queue
);


// Builder State
export const selectBuilderPoints = createSelector(
  BuilderStateSelector,
  fromBuilder.selectPoints
);
export const selectBuilderAvatar = createSelector(
  BuilderStateSelector,
  fromBuilder.selectAvatar
);
export const selectBuilderBuff = createSelector(
  BuilderStateSelector,
  fromBuilder.selectBuff
);

// Character State
export const selectCharacterList = createSelector(
  CharactersStateSelector,
  fromCharacter.selectCharacters
);
export const selectSelectedAvatar = createSelector(
  CharactersStateSelector,
  fromCharacter.selectSelected
);
export const selectCharacterError = createSelector(
  CharactersStateSelector,
  fromCharacter.selectErrorMessage
);

// Saved Buffs
export const savedBuffIds = createSelector(
  SavedBuffStateSelector,
  fromSavedBuffs.selectIds
);
export const savedBuffEntities = createSelector(
  SavedBuffStateSelector,
  fromSavedBuffs.selectEntities
);

export const SubmitReady = createSelector(
  BuilderStateSelector,
  CharactersStateSelector,
  (Builder, Characters) => {
    return {
      points: Builder.points,
      avatar: Characters.selected || '',
      buff: Builder.buff,
    };
  }
);
