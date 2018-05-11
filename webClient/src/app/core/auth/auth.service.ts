import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  isAnonymous?: boolean;
  photoURL?: string;
  displayName?: string;
}
@Injectable()
export class AuthService {
  AuthState;
  constructor(private af: AngularFireAuth,
              private router:Router) {
                this.af.authState.subscribe((authState) => {
                  console.log('Auth State is now', authState);
                  this.AuthState = authState;
                });
          }

  getAuthState () {
    return this.AuthState;
  }

  anonymousLogin() {
    return this.af.auth.signInAnonymously()
    .then(() => console.log("successful login") )
    .catch(error => console.log(error));
  }
}
