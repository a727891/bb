import { Action } from '../../core/core.interfaces';
import * as builderActions from './builder.actions';
import * as characterActions from '../characters/character.actions';
import {
  BuffOptions,
  BuffPackage,
  MaxPoints,
  PointCost,
  MaxSpend
} from './builder.models';

export interface BuilderState {
  points: number;
  buff: BuffOptions;
}

export type Actions = builderActions.All;

export const selectPoints = (state: BuffPackage) => state.points;
export const selectAvatar = (state: BuffPackage) => state.avatar;
export const selectBuff = (state: BuffPackage) => state.buff;

export const initialState: BuilderState = {
  points: 0,
  buff: {
    // Attributes
    agl: 0,
    con: 0,
    luck: 0,
    prec: 0,
    stam: 0,
    str: 0,
    // Combat
    acr: 0,
    crit: 0,
    chr: 0,
    glance: 0,
    // Misc
    xp: 0,
    harvest: 0,
    healer: 0,
    resilience: 0,
    flow: 0,
    secondChance: 0,
    // Resistances
    elem: 0,
    energy: 0,
    kinetic: 0,
    // Trader stuff
    assembly: 0,
    amazing: 0,
    sampling: 0
  }
};

export function builderReducer(
  state = { ...initialState, buff: { ...initialState.buff } },
  action: Action
) {
  switch (action.type) {
    case builderActions.BB_INCREMENT:
      return checkPointChange(state, action.payload, true);
    case builderActions.BB_DECREMENT:
      return checkPointChange(state, action.payload, false);
    case builderActions.BB_RESET:
      return { points: initialState.points, buff: { ...initialState.buff } };
    case builderActions.BB_SET_BUFF:
      return checkPoints(state, {points: 0, buff: action.payload});
    default:
      return state;
  }
}

function checkPointChange(
  currentPackage: BuilderState,
  field: string,
  up: Boolean
): BuilderState {
  const updatedPackage = {...currentPackage, buff:{...currentPackage.buff}};
  if (field) {
    const currentPoints = currentPackage.buff[field];
    if (up) {
      if (currentPoints < MaxPoints[field]) {
        updatedPackage.buff[field] = currentPoints + 1;
      }
    } else {
      if (currentPoints > 0) {
        updatedPackage.buff[field] = currentPoints - 1;
      }
    }
  }

  // Check points Total
  const keys = Object.keys(updatedPackage.buff);
  const updatedPoints = keys.reduce((sum, k) => {
    return sum + updatedPackage.buff[k] * PointCost[k];
  }, 0);
  if (updatedPoints > MaxSpend) {
    return currentPackage;
  }
  updatedPackage.points = updatedPoints;

  return checkPoints(currentPackage, updatedPackage);
}

function checkPoints(
  currentState: BuilderState,
  newState: BuilderState
): BuilderState {

  // Check points Total

  const keys = Object.keys(newState.buff);
  const updatedPoints = keys.reduce((sum, k) => {
    return sum + newState.buff[k] * PointCost[k];
  }, 0);
  if (updatedPoints > MaxSpend) {
    console.log('too many points');
    return currentState;
  }
  newState.points = updatedPoints;

  return newState;
}
