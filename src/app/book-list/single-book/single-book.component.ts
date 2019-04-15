import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuteursService } from 'src/app/services/auteurs.service';
import { Auteur } from 'src/app/models/auteur.model';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  auteur: Auteur;

  constructor(private route: ActivatedRoute,
              private auteursService: AuteursService,
              private router: Router) { }

  ngOnInit() {
    this.auteur = new Auteur('', '', '');
    const id = this.route.snapshot.params['id'];
    this.auteursService.getSingleAuteur(+id).then(
      (auteur: Auteur) => {
        this.auteur = auteur;
      }
    );
  }

  onBack() {
    this.router.navigate( ['/books']);
  }

}
