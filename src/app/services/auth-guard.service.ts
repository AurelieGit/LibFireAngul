import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot; /* canActivate sert avant tout a retourner une promise quand ont se connecter plutot qu'une boolean /// importer CanActivate */

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean{ /* methode CanActivate retourne un observable boolean ou une promise  boolean ou un boolean */
    return new Promise( /* retourne une promise. OneShot */
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) =>{
            if(user) {
              resolve(true);
              } else {
                this.router.navigate( [ '/auth', 'signin']); /* si ont a plusieur element dans l'url ont ne mais pas plusieur / on le met au premier puis on sépare d'une virgule */
                resolve(false);
              }
            }
          );
        }
      );
    }  
  }  

