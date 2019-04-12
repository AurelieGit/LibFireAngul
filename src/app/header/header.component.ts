import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'; //importer Fb//
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean; // boolean local//

  constructor(private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged( // déclencher à chque fois que l'état d'auth est changé par l'utilisateur//
      (user) => { // observable//
        if(user) { // si authentifié : objet user déclenché par le serveur//
          this.isAuth = true; // information de connexion
        } else { // sinon 
        this.isAuth = false;  // pas connecté//
        }  
      }
    );
  }

  onSignOut() { //pour se déconnecter//
    this.authService.signOutUser(); 
  }





}
