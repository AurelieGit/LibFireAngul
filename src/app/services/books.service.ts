import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [] /* c'est un array local d'objet de type Book qui seras un array vide par defaut  /// importer Book*/
  booksSubject = new Subject<Book[]>() /* un subjet qui emmetra cette aray /// importe Subject*/

  constructor() { }
    
  emitBooks() {/* création de la méthode emitBooks pour faire émettre le subject elle prendra le contenue de l'array books et l'émtrras grace au subject*/
    this.booksSubject.next(this.books);
  }
    
  saveBooks() { /* création de la méthode qui permet d'enregistrer des livres */
    firebase.database().ref('/books').set(this.books); /* .database pour les methodes de la base de donnée | .ref qui retourne une reference a la base de donnée | '/books' création du node dans la base de donnée (tout les livres seront stockée ici) | .set pour enregistrer this.books */
  }

  getBooks() { /* création de la méthode qui permet de récuperer les livres depuis la base de donnée */
    firebase.database().ref('/books')
    .on('value', (data) => { /* création de la méthode .on qui permet de réagir a des modification de la base de donée | l'événement que tu veux regarder c'est "value" | en deuxieme argument ont passe la fonction qui réagiras a chaque evenement */
      this.books = data.val() ? data.val() : []; /* data contient la propriéter Val (valeurs des données retourner par le serveur) */
      this.emitBooks(); /* émitions du subject */
    });   
  }

  getSingleBook(id: number) { /* création de la méthode qui permet de retourner un seule livre | il prend l'identifiant du livre donc le number comme argument | la méthode seras asynchrone*/
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
              reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) { /* création de la méthode qui permet d'ajouter un nouveaux livre */
    this.books.push(newBook); /* push permet d'ajouter un nouveaux livre a l'array des books */
    this.saveBooks() /* sauvegarde sur la base de donnée */
    this.emitBooks(); /* permet d'emetre le subject */
  }

  removeBook(book: Book) {
    if(book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
}

uploadFile(file: File) {
  return new Promise(
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase.storage().ref()
        .child('images/' + almostUniqueFileName + file.name)
        .put(file)
        .then(snapshot => {
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
}
