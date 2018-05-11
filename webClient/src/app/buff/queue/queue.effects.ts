import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { of } from 'rxjs/observable/of';
import { map, tap, catchError, switchMap } from 'rxjs/operators';

import { LocalStorageService, Action } from '@app/core';

import * as QueueActions from './queue.actions';
import { BuffOptions } from '@app/buff/builder/builder.models';

import * as RouterActions from '@app/core/router/router.actions';

enum BuffStatus {
  Pending = 'pending',
  Active = 'active',
  Done = 'done'
}

export interface BuffQueueItem {
  time: number;
  status: BuffStatus;
  avatar: string;
  buff: BuffOptions;
}

interface StatusDoc {
  status: string;
  state: string;
  captchaUrl: string;
};

@Injectable()
export class QueueEffects {
  private buffStatus: AngularFirestoreCollection<BuffQueueItem>;
  private entStatus: AngularFirestoreDocument<any>;
  private captcha: AngularFirestoreDocument<any>;
  private watchingQueue = false;

  @Effect()
  query$: Observable<Action> = this.actions$
    .ofType(QueueActions.QUEUE_LOAD)
    .pipe(
    switchMap(action => {
      return this.buffStatus.snapshotChanges().map(arr => {
        return arr.map(doc => {
          const data = doc.payload.doc.data();
          return { id: doc.payload.doc.id, ...data };
        });
      });
    }),
    map(arr => {
      return new QueueActions.QueueChanged(arr);
    })
    );

  @Effect()
  entStatusUpdated$: Observable<Action> = this.actions$
    .ofType(QueueActions.QUEUE_LOAD)
    .pipe(
    switchMap(action => {
      return this.entStatus.snapshotChanges().map( doc => doc.payload.data() );
    }),
    map(statusDoc => {
      console.log(statusDoc);
      return new QueueActions.QueueStatusChanged(statusDoc);
    })
    );

  @Effect({dispatch: false})
  captchaSubmit$: Observable<Action> = this.actions$
    .ofType(QueueActions.CAPTCHA_SUBMIT)
    .pipe(
    tap(action => {
      this.captcha.update({answer: action.payload});
    })
    );

  @Effect()
  submmitBuff(): Observable<Action> {
    return this.actions$.ofType(QueueActions.SUBMIT_ACTION).pipe(
      map(action => {
        console.log(action);
        const newDoc: BuffQueueItem = {
          time: Date.now(),
          status: BuffStatus.Pending,
          avatar: action.payload.avatar,
          buff: action.payload.buff
        };
        return Observable.fromPromise(this.buffStatus.add(newDoc));
      }),
      map(newDocRef => {
        console.log('doc added successfully, ', newDocRef);
        return new RouterActions.Go({ path: ['/entertainer', 'status'] })
      })
    );
  }



  constructor(
    private actions$: Actions<Action>,
    private afs: AngularFirestore
  ) {
    this.buffStatus = afs.collection<BuffQueueItem>('buffs', ref => ref.where('status', '==', 'pending').orderBy('time', 'asc'));
    this.entStatus = afs.doc<any>('status/status');
    this.captcha = afs.doc<any>('status/captcha');
  }
}
