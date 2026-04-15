import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { AuthGuard } from './shared/components/authentication/auth.guard';
import { BandejaContratosComponent } from './components/pages/bandejas/bandeja-contratos/bandeja-contratos.component';
import { BandejaAdendasComponent } from './components/pages/bandejas/bandeja-adendas/bandeja-adendas.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './components/authentication/restore-password/restore-password.component';
import { BandejaPerfilComponent } from './components/pages/profile/bandeja-perfil/bandeja-perfil.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent, },
  { path: 'forgot-password', component: ForgotPasswordComponent, },
  { path: 'restore-password', component: RestorePasswordComponent, },
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'mi-perfil', component: BandejaPerfilComponent, canActivate: [AuthGuard]},
  {
    path: '**', pathMatch: 'full', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
