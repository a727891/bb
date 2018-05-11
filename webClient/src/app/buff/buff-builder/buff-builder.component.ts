import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AvatarList } from '../characters/characters.models';

import {
  BuffState,
  selectCharacterList,
  selectSelectedAvatar,
  BuilderStateSelector,
  SavedBuffStateSelector,
  SubmitReady
} from '../buff.reducer';

import * as BuilderActions from '../builder/builder.actions';
import * as CharacterActions from '../characters/character.actions';
import * as SaveActions from '../saved-buffs/saved-buff.actions';
import * as QueueActions from '../queue/queue.actions';
import { SavedBuffState } from '@app/buff/saved-buffs/saved-buff.reducer';
import { SavedBuff, BuffPackage } from '@app/buff/builder/builder.models';
import { SubmitAction } from '../submit-button/submit-button.actions';

@Component({
  selector: 'anms-buff-builder',
  templateUrl: './buff-builder.component.html',
  styleUrls: ['./buff-builder.component.scss']
})
export class BuffBuilderComponent implements OnInit {
  public submitReady$: Observable<any>;
  public buff$: Observable<any>;
  public avatars$: Observable<AvatarList>;
  public selectedAvatar$: Observable<string>;
  public savedBuffs$: Observable<SavedBuffState>;

  constructor(private store: Store<BuffState>) {}

  ngOnInit() {
    this.store.dispatch(new CharacterActions.LoadAvatars());
    this.store.dispatch(new SaveActions.LoadBuffs());
    this.buff$ = this.store.select(BuilderStateSelector);
    this.avatars$ = this.store.select(selectCharacterList);
    this.selectedAvatar$ = this.store.select(selectSelectedAvatar);
    this.savedBuffs$ = this.store.select(SavedBuffStateSelector);
    this.submitReady$ = this.store.select(SubmitReady);
  }

  AddAvatar(avatar: string) {
    this.store.dispatch(new CharacterActions.AddAvatar(avatar));
  }
  SelectAvatar(avatar: string) {
    this.store.dispatch(new CharacterActions.AvatarSelect(avatar));
  }
  DeleteAvatar(avatar: string) {
    this.store.dispatch(new CharacterActions.AvatarDelete(avatar));
  }

  ResetBuilder() {
    this.store.dispatch(new BuilderActions.BBResetAction());
  }
  AddBuilderPoint(property: string) {
    this.store.dispatch(new BuilderActions.BBIncrementAction(property));
  }
  SubBuilderPoint(property: string) {
    this.store.dispatch(new BuilderActions.BBDecrementAction(property));
  }

  SelectSavedTemplate(buff: SavedBuff){
    this.store.dispatch(new BuilderActions.BBSetBuff(buff.buff));
  }
  SaveTemplate(buff: SavedBuff) {
    this.store.dispatch(new SaveActions.SaveBuff(buff));
  }
  DeleteBuff(buff: SavedBuff) {
    this.store.dispatch(new SaveActions.DeleteBuff(buff));
  }

  SubmitBuff(pack: BuffPackage){
    this.store.dispatch( new QueueActions.SubmitAction( pack ));
  }
}
