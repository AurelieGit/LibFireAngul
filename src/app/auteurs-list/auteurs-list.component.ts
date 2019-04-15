import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Auteur } from '../models/auteur.model';
import { AuteursService } from '../services/auteurs.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auteurs-list',
  templateUrl: './auteurs-list.component.html',
  styleUrls: ['./auteurs-list.component.css']
})
export class AuteursListComponent implements OnInit {
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
    this.router.navigate( ['/auteurs', 'new']);
  }

  onDeleteAuteur(auteur: Auteur) {
    this.auteursService.removeAuteur(auteur);
  }

  onViewAuteur(id: number) {
    this.router.navigate( ['/auteurs', 'view', id]);
  }

  ngOnDestroy() {
    this.auteursSubscription.unsubscribe();
  }

}