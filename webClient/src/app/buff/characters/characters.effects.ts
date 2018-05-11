import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService, Action } from '@app/core';

import * as CharacterActions from './character.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AvatarSelect } from '@app/buff/buff.actions';

@Injectable()
export class CharacterEffects {
  constructor(
    private actions$: Actions<Action>,
    private afs: AngularFirestore,
    private localStorageService: LocalStorageService
  ) {
    console.log('effects module online');
  }

  @Effect()
  loadAvatars(): Observable<Action> {
    return this.actions$.ofType(CharacterActions.LOAD_AVATARS).pipe(
      map( this.getCharacterList ),
      map( list => new CharacterActions.LoadAvatarsSuccess(list) ),
      catchError( e => of(new CharacterActions.LoadAvatarsFail(e)))
    );
  }

  @Effect()
  addAvatar(): Observable<Action> {
    return this.actions$.ofType(CharacterActions.ADD_AVATAR).pipe(
      map(action => {
        let list = this.getCharacterList();
        list = [...list, action.payload];
        this.localStorageService.setItem(CharacterActions.LS_KEY, list);
        return new CharacterActions.LoadAvatarsSuccess(list);
      })
    );
  }

  @Effect()
  deleteAvatar(): Observable<Action> {
    return this.actions$.ofType(CharacterActions.AVATAR_DELETE).pipe(
      map(action => {
        let list = this.getCharacterList();
        list = list.filter( a => a!=action.payload);
        this.localStorageService.setItem(CharacterActions.LS_KEY, list);
        return new CharacterActions.LoadAvatarsSuccess(list);
      })
    );
  }


  getCharacterList = () => this.localStorageService.getItem(CharacterActions.LS_KEY) || [];

}


