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


const appRoutes: Routes =[];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    AuteursListComponent,
    AuteurFormComponent,
    AuteurSingleComponent,
    

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
