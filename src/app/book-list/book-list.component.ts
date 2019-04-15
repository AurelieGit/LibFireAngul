import { Component, OnInit, OnDestroy } from '@angular/core';
import { Auteur } from '../models/auteur.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuteursService } from '../services/auteurs.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  auteurs: Auteur[];
  auteursSubscription: Subscription;

  constructor(private auteursService: AuteursService, private router: Router) { }

  ngOnInit() {
    this.auteursSubscription = this.auteursService.auteursSubject.subscribe(
      (auteurs: Auteur[]) => {
        this.auteurs = auteurs;
      }
    );
    this.auteursService.getAuteurs();
    this.auteursService.emitAuteurs();
  }

  onNewAuteur() {
    this.router.navigate( ['/books', 'new']);
  }

  onDeleteAuteur(auteur: Auteur) {
    this.auteursService.removeAuteur(auteur);
  }

  onViewAuteur(id: number) {
    this.router.navigate( ['/books', 'view', id]);
  }

  ngOnDestroy() {
    this.auteursSubscription.unsubscribe();
  }

}
