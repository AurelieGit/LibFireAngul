import { Injectable } from '@angular/core';
import * as firebase from 'firebase'; /* importer firebase */ 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string) { // Méthode pour  création d'un nouvel utilisateur. Arguments= email et un mot de passe //
    return new Promise(// car asynchone (attendre réponse)//
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then( //méthode FB avec les parenthèses pour avoir accés aux methodes de l'authentification et les arguments email et mpd que l'ont à en argument. le .then car promise //
          () => {
            resolve(); // si la création d'utilisateur réussie is ok : resolve la promise//
          },
          (error) => { // si la création d'utilisateur echoue ont renvoie un message d'erreur avec reject + l'erreur //
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) { // méthode pour la connexion user déjà existant. Idem utilisateur */
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then( 
          () => {
            resolve(); 
          },
          (error) => { 
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {  //Méthode pour la déconnexion. Plus simple car pas besoins d'etre asynchrone //
    firebase.auth().signOut();
  }


}
