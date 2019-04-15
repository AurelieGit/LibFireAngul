import { Injectable } from '@angular/core';
import { Auteur } from '../models/auteur.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuteursService {

  auteurs: Auteur[] = [] /* c'est un array local d'objet de type Book qui seras un array vide par defaut  /// importer Book*/
  auteursSubject = new Subject<Auteur[]>() /* un subjet qui emmetra cette aray /// importe Subject*/

  constructor() { }
    
  emitAuteurs() {/* création de la méthode emitAuteurs pour faire émettre le subject elle prendra le contenue de l'array books et l'émtrras grace au subject*/
    this.auteursSubject.next(this.auteurs);
  }
    
  saveAuteurs() { /* création de la méthode qui permet d'enregistrer des livres */
    firebase.database().ref('/auteurs').set(this.auteurs); /* .database pour les methodes de la base de donnée | .ref qui retourne une reference a la base de donnée | '/books' création du node dans la base de donnée (tout les livres seront stockée ici) | .set pour enregistrer this.books */
  }

  getAuteurs() { /* création de la méthode qui permet de récuperer les livres depuis la base de donnée */
    firebase.database().ref('/auteurs')
    .on('value', (data) => { /* création de la méthode .on qui permet de réagir a des modification de la base de donée | l'événement que tu veux regarder c'est "value" | en deuxieme argument ont passe la fonction qui réagiras a chaque evenement */
      this.auteurs = data.val() ? data.val() : []; /* data contient la propriéter Val (valeurs des données retourner par le serveur) */
      this.emitAuteurs(); /* émitions du subject */
    });   
  }

  getSingleAuteur(id: number) { /* création de la méthode qui permet de retourner un seule livre | il prend l'identifiant du livre donc le number comme argument | la méthode seras asynchrone*/
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/auteurs/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
              reject(error);
          }
        );
      }
    );
  }

  createNewAuteur(newAuteur: Auteur) { /* création de la méthode qui permet d'ajouter un nouveaux livre */
    this.auteurs.push(newAuteur); /* push permet d'ajouter un nouveaux livre a l'array des books */
    this.saveAuteurs() /* sauvegarde sur la base de donnée */
    this.emitAuteurs(); /* permet d'emetre le subject */
  }

  removeAuteur(auteur: Auteur) { // si auteur supprimé la photo aussi//
    if(auteur.photo) {
      const storageRef = firebase.storage().refFromURL(auteur.photo); // car 
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const auteurIndexToRemove = this.auteurs.findIndex(
      (auteurEl) => {
        if(auteurEl === auteur) {
          return true;
        }
      }
    );
    this.auteurs.splice(auteurIndexToRemove, 1);
    this.saveAuteurs();
    this.emitAuteurs();
}

uploadFile(file: File) {
  return new Promise( // methode asyn car prend du temp de charger un photo//
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString(); // pour nom unique evite d'écraser d'autres fichier qui porteraient un m^me nom
      const upload = firebase.storage().ref() //upload = tache de chargement//
        .child('images/' + almostUniqueFileName + file.name).put(file);// methode child pour retourner une référence de sous dossier images avec un nouveau nom de dossier unique + nom du fichier d'origine
        /*.then(snapshot => { 
           return snapshot.ref.getDownloadURL(); 
         })
         .then(downloadURL => {
            console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
            resolve(downloadURL);
         })
         .catch(error => {
           console.log(`Failed to upload file and get link - ${error}`);
           reject(); 
         });
}
  );
}
}*/
upload.on(firebase.storage.TaskEvent.STATE_CHANGED, //retourne une référence à la racine de votre bucket Firebase,
  () => { // avec la methode on() on suit l'état en passant 3 fonctions//
    console.log('Chargement…'); //déclenchée à chaque fois que des données sont envoyées vers le serveur
  },
  (error) => {
    console.log('Erreur de chargement ! : ' + error); //déclenchée si le serveur renvoie une erreur
    reject();
  },
  () => {
    resolve(upload.snapshot.downloadURL); //déclenchée lorsque le chargement est terminé et permet de retourner l'URL unique du fichier chargé.
  }
);
}
);
}
}