import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

import { AuteursListComponent } from './auteurs-list/auteurs-list.component';
import { AuteurFormComponent } from './auteurs-list/auteur-form/auteur-form.component';
import { AuteurSingleComponent } from './auteurs-list/auteur-single/auteur-single.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';


const appRoutes: Routes =[];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    AuteursListComponent,
    AuteurFormComponent,
    AuteurSingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment),// clés API firebase mise dans environnement//
    AngularFirestoreModule,
    AngularFireStorageModule
    
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
