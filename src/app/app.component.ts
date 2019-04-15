import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
//import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(){
  var config = {
    apiKey: "AIzaSyCmSqAioC9mEVG8qKczVE-TMSSFcDKM6wc",
    authDomain: "libfireangul.firebaseapp.com",
    databaseURL: "https://libfireangul.firebaseio.com",
    projectId: "libfireangul",
    storageBucket: "libfireangul.appspot.com",
    messagingSenderId: "776489022226"
  };
  firebase.initializeApp(config);
}
}
