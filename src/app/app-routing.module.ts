import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuteursListComponent } from './auteurs-list/auteurs-list.component';
import { AuteurFormComponent } from './auteurs-list/auteur-form/auteur-form.component';
import { AuteurSingleComponent } from './auteurs-list/auteur-single/auteur-single.component';



const routes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auteurs', canActivate: [AuthGuardService], component: AuteursListComponent },
  { path: 'auteurs/new', canActivate: [AuthGuardService], component: AuteurFormComponent },
  { path: 'auteurs/view/:id', canActivate: [AuthGuardService], component: AuteurSingleComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
