import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {// importer Can activate. Elle retourne une promise quand ont se connecter plutot qu'une boolean /// importer CanActivate //

  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot; 
  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean{ /* methode CanActivate retourne un observable boolean ou une promise  boolean ou un boolean */
    return new Promise( // retourne une promise. //
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) =>{
            if(user) {// si utilisateur existe le laisser passer//
              resolve(true);
              } else {// si non renavigué vers l'authentif et précisément vers le signin//
                this.router.navigate( [ '/auth', 'signin']); // quand plusieurs éléments dans l'url ont ne mais pas plusieurs / on le met uiquement au premier puis on les sépare d'une virgule //
                resolve(false);
              }
            }
          );
        }
      );
    }  
  }  

