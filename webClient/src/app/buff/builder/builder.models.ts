export interface BuffOptions{
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
export interface SavedBuff {
  name: string;
  buff: BuffOptions;
}

export interface BuffPackage{
  avatar: string;
  points: number;
  buff: BuffOptions;
}

export const PointCost: BuffOptions = {
  // Attributes
  agl: 1,
  con: 1,
  luck: 1,
  prec: 1,
  stam: 1,
  str: 1,
  // Combat
  acr: 5,
  chr: 5,
  crit: 5,
  glance: 5,
  // Misc
  xp: 2,
  harvest: 2,
  healer: 2,
  resilience: 2,
  flow: 2,
  secondChance: 2,
  // Resistances
  elem: 1,
  energy: 1,
  kinetic: 1,
  // Trader stuff
  assembly: 2,
  amazing: 5,
  sampling: 2
}
export const MaxSpend = 20;

export const MaxPoints: BuffOptions = {
    // Attributes
    agl: 10,
    con: 10,
    luck: 10,
    prec: 10,
    stam: 10,
    str: 10,
    // Combat
    acr: 1,
    crit: 1,
    chr: 1,
    glance: 1,
    // Misc
    xp: 5,
    harvest: 5,
    healer: 5,
    resilience: 5,
    flow: 5,
    secondChance: 4,
    // Resistances
    elem: 5,
    energy: 5,
    kinetic: 5,
    // Trader stuff
    assembly: 5,
    amazing: 2,
    sampling: 5,
}

export const BuffCategories = [
  {'title': 'Attributes', 'stats':['agl', 'con', 'luck', 'prec', 'stam', 'str']},
  {'title': 'Combat', 'stats':['acr', 'crit', 'chr', 'glance']},
  {'title': 'Misc', 'stats':['xp', 'harvest', 'healer', 'resilience', 'flow', 'secondChance']},
  {'title': 'Resistances', 'stats':['elem', 'energy', 'kinetic']},
  {'title': 'Trader', 'stats':['assembly', 'amazing', 'sampling']}
]

export const BuffLabels = {
  // Attributes
  agl: 'Agility',
  con: 'Constituition',
  luck: 'Luck',
  prec: 'Precision',
  stam: 'Stamina',
  str: 'Strength',
  // Combat
  acr: 'Act. Cost Reduc.',
  crit: 'Crit. Chance',
  chr: 'Crit Hit Reduc.',
  glance: 'Glancing Blow',
  // Misc
  xp: 'XP Increase',
  harvest: 'Harv. Yield',
  healer: 'Healer',
  resilience: 'Resilience',
  flow: 'Run Speed',
  secondChance: '2nd Chance Heal',
  // Resistances
  elem: 'Elemental Armor',
  energy: 'Energy Armor',
  kinetic: 'Kinetic Armor',
  // Trader stuff
  assembly: 'Crafting Assembly',
  amazing: 'Amazing Success',
  sampling: 'Hand Sampling'
}

