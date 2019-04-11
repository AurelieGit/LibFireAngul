import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup; /* création d'un formulaire réactive pour l'indentification /// importer FormsGroup*/
  errorMessage: string; /* création d'un éventuelle message d'erreur si jamais ont en a besoins */

  constructor(private formBuilder: FormBuilder, /* formBuilder pour la création du formulaire /// importer FormBuilder */
              private authService: AuthService, /* authService pour tout ce qui concerne l'authentification /// importer authService */
              private router: Router) { } /* pour permettre une redirection /// importer Router */

  ngOnInit() {
    this.initForm(); /* initialisation du formulaire /// il faut créer la méthode pour le rendre fonctionnel*/
  }

  initForm() {
    this.signInForm = this.formBuilder.group({  /* pour génerer le FormGroup */
      email: ['', [Validators.required, Validators.email]], /* Ont va utiliser la validation, ce seras vide pas default  /// importer validators*/
      password: ['', [Validators.required, Validators.pattern( '^[a-zA-Z]+$') ]]  
    });
  }
  onSubmit() { /* permet de récuper le mail et le mot de passe du formulaire */
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.authService.signInUser(email, password).then(  /* remplacer le CreateNewUser car désormais c'est un formulaire de connexion*/
      () => {
        this.router.navigate(['/books']); /* si la connexion se passe bien redirige vers books par defaut */
      },
      (error) => {
        this.errorMessage = error; /* message d'erreur si sa échoue */
      }
    );

}
}
