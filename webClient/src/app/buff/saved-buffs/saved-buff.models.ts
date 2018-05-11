import {BuffOptions} from '../builder/builder.models'

export interface SavedBuff{
  name: string;
  buff: BuffOptions;
}

export interface SavedBuffEntities{
  [id: string]: SavedBuff;
}
