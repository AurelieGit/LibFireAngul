import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {   /* lier firebase au projet angular. utiliser <> après création du projet sur FireB */
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
