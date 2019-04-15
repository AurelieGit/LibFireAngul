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
    newAuteur.bibliographie = bibliographie;
    if(this.fileUrl && this.fileUrl !== '') {
      newAuteur.photo = this.fileUrl;
    }
    this.auteursService.createNewAuteur(newAuteur);
    this.router.navigate(['/auteurs']);
}

  onUploadFile(file: File) { // methode pour récupérer l'URL retournée de upload file//
    this.fileIsUploading = false;  // pour désactiver le bouton submit pendant le cchargement//
    this.auteursService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;  // 1x chargement terminé Url est enregistré et modifie l'étét du component//
        this.fileIsUploading = true;
        this.fileUploaded = true;
      }
    );
}

detectFiles(event) {//méthode qui permettra de lier le  <input type="file">  à la méthode  onUploadFile()//
  this.onUploadFile(event.target.files[0]);
}

}

