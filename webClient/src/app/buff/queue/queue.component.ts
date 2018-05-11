import { Component, OnInit , OnDestroy} from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as queueActions from './queue.actions';

import { queueStateSelector } from '../buff.reducer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'anms-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit, OnDestroy {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  status$: Subscription;
  status: any;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(new queueActions.QueueLoad());
    this.status$ = this.store.select(queueStateSelector).subscribe((value)=>{
      console.log(value);
      this.status = value;
    })
    // const collection: AngularFirestoreCollection<any> = this.afs.collection('queue')
    // const collection$: Observable<any> = collection.valueChanges()
    // collection$.subscribe(data => this.data = data )
  }
  ngOnDestroy(){
    this.status$.unsubscribe();
  }

  addCaptchaAnswer(value) {
    this.store.dispatch(new queueActions.CaptchaSubmitted(value));
  }

}
