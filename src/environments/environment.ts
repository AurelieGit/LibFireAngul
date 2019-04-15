import * as firebase from 'firebase';

export const environment = {
  production: false,
  constructor() { 
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
