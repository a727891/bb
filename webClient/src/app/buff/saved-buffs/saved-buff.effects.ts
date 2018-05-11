import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService, Action } from '@app/core';

import * as saveActions from './saved-buff.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class SavedBuffEffects {
  constructor(
    private actions$: Actions<Action>,
    private afs: AngularFirestore,
    private localStorageService: LocalStorageService
  ) {}

  @Effect()
  loadBuffs(): Observable<Action> {
    return this.actions$.ofType(saveActions.LOAD_BUFFS).pipe(
      map( this.getSavedBuffs ),
      map( list => new saveActions.LoadBuffsSuccess(list) ),
      catchError( e => of(new saveActions.LoadBuffsFail(e)))
    );
  }

  @Effect()
  addBuff(): Observable<Action> {
    return this.actions$.ofType(saveActions.SAVE_BUFF).pipe(
      map(action => {
        let list = this.getSavedBuffs();
        list = {...list, [action.payload.name]: action.payload};
        this.localStorageService.setItem(saveActions.LS_KEY, list);
        return new saveActions.LoadBuffsSuccess(list);
      })
    );
  }

  @Effect()
  deleteBuff(): Observable<Action> {
    return this.actions$.ofType(saveActions.DELETE_BUFF).pipe(
      map(action => {
        const list = this.getSavedBuffs();
        delete list[action.payload.name];
        this.localStorageService.setItem(saveActions.LS_KEY, list);
        return new saveActions.LoadBuffsSuccess(list);
      })
    );
  }


  getSavedBuffs = () => this.localStorageService.getItem(saveActions.LS_KEY) || {};

}
