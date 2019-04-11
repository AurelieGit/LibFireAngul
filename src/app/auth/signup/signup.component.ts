import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup; // création du formulaire réactif pour l'incription (importer FormsGroup)//
  errorMessage: string; //  éventuel message d'erreur si besoin //

  constructor(private formBuilder: FormBuilder, // formBuilder = création du formulaire (importer FormBuilder) //
              private authService: AuthService, // authService pour tout ce qui concerne l'authentification (importer authService)//
              private router: Router) { } //pour permettre une redirection () importer Router)//

  ngOnInit() {
    this.initForm(); //initialisation du formulaire //
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({  //pour génerer le FormGroup //
      nom: ['','nom'],
      prenom: ['','prenom'],
      adresse: ['','adresse'],      
      email: ['', [Validators.required, Validators.email]], // Validator pour validation:  vide pas default (importer validators)//
      password: ['', [Validators.required, Validators.pattern( '^[a-zA-Z]+$') ]] // patterne avec expression régulière oblige avoir 6 caractères//
    });
  }
  onSubmit() { //Soumission du formulaire//
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.authService.createNewUser(email, password).then( // le .then car asynch//
      () => {
       
        this.router.navigate(['/books']); //si la création se passe bien redirige vers books (le chemin protégé) //
      },
      (error) => {
        this.errorMessage = error; // message d'erreur affiché dans le template si erreur//
      }
    );
  }





}
