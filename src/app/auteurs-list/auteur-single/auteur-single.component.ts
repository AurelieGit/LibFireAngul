import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuteursService } from 'src/app/services/auteurs.service';
import { Auteur } from 'src/app/models/auteur.model';

@Component({
  selector: 'app-auteur-single',
  templateUrl: './auteur-single.component.html',
  styleUrls: ['./auteur-single.component.css']
})
export class AuteurSingleComponent implements OnInit {

  auteur: Auteur;

  constructor(private route: ActivatedRoute, private auteursService: AuteursService, private router: Router) { }

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
