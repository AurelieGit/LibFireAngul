import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuteursService } from 'src/app/services/auteurs.service';
import { Router } from '@angular/router';
import { Auteur } from 'src/app/models/auteur.model';

@Component({
  selector: 'app-auteur-form',
  templateUrl: './auteur-form.component.html',
  styleUrls: ['./auteur-form.component.css']
})
export class AuteurFormComponent implements OnInit {

  auteurForm: FormGroup;
  fileIsUploading = false; // photos en false par default//
  fileUrl: string; // recup l'url du download de la photo//
  fileUploaded = false; // signal fin du telechargement//

  constructor(private formBuilder: FormBuilder, private auteursService: AuteursService, private router: Router) { }

  ngOnInit() {
    this.initForm();  
  }

  initForm() {
    this.auteurForm = this.formBuilder.group( {
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      bibliographie: ['', Validators.required],
      photo: ['']
    });
  }

  onSaveAuteur() {
    const nom = this.auteurForm.get('nom').value;
    const prenom = this.auteurForm.get('prenom').value;
    const bibliographie = this.auteurForm.get('bibliographie').value;
    const newAuteur = new Auteur(nom, prenom, bibliographie);
    if(this.fileUrl && this.fileUrl !== '') {
      newAuteur.photo = this.fileUrl;
    }
    this.auteursService.createNewAuteur(newAuteur);
    this.router.navigate(['/auteurs']);
}

  onUploadFile(file: File) {
    this.fileIsUploading = false;
    this.auteursService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = true;
        this.fileUploaded = true;
      }
    );
}

detectFiles(event) {
  this.onUploadFile(event.target.files[0]);
}

}

