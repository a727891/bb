/********************
 * 
 * These interfaces are shared between the two applications.
 * 
 ********************/

export enum BuffStatus {
  Pending = "pending",
  Active = "active",
  Done = "done"
}

export interface BuffQueueItem {
  time: number;
  status: BuffStatus;
  avatar: string;
  buff: BuffOptions;
}

export interface BuffOptions {
  // Attributes
  agl: number;
  con: number;
  luck: number;
  prec: number;
  stam: number;
  str: number;
  // Combat
  acr: number;
  crit: number;
  chr: number;
  glance: number;
  // Misc
  xp: number;
  harvest: number;
  healer: number;
  resilience: number;
  flow: number;
  secondChance: number;
  // Resistances
  elem: number;
  energy: number;
  kinetic: number;
  // Trader stuff
  assembly: number;
  amazing: number;
  sampling: number;
}
