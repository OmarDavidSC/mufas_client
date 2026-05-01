
import { ComunModule } from '../app/shared/comun.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuLateralComponent } from './shared/components/menu-lateral/menu-lateral.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ModalDialog } from "./shared/components/modal/modal.component";
import { GridLoaderComponent } from "./shared/components/grid-loader/grid-loader.component";
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { AddTokenInterceptor } from './shared/components/authentication/add-token.interceptor';
import { BandejaContratosComponent } from './components/pages/bandejas/bandeja-contratos/bandeja-contratos.component';
import { BandejaAdendasComponent } from './components/pages/bandejas/bandeja-adendas/bandeja-adendas.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './components/authentication/restore-password/restore-password.component';
import { BandejaPerfilComponent } from './components/pages/profile/bandeja-perfil/bandeja-perfil.component';
import { ModalEditarPerfilComponent } from './components/pages/profile/partials/modal-editar-perfil/modal-editar-perfil.component';
import { ModalEditarPasswordComponent } from './components/pages/profile/partials/modal-editar-password/modal-editar-password.component';
import { ModalEditarEmailComponent } from './components/pages/profile/partials/modal-editar-email/modal-editar-email.component';
import { ClienteComponent } from './components/pages/administracion/cliente/cliente.component';
import { ModalClienteComponent } from './components/pages/administracion/modals/modal-cliente/modal-cliente.component';
import { NodosComponent } from './components/pages/administracion/nodos/nodos.component';
import { ModalNodosComponent } from './components/pages/administracion/modals/modal-nodos/modal-nodos.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    HeaderComponent,
    GridLoaderComponent,
    ModalDialog,
    HomeComponent,
    SigninComponent,
    BandejaContratosComponent,
    BandejaAdendasComponent,
    ForgotPasswordComponent,
    RestorePasswordComponent,
    BandejaPerfilComponent,
    ModalEditarPerfilComponent,
    ModalEditarPasswordComponent,
    ModalEditarEmailComponent,
    ClienteComponent,
    ModalClienteComponent,
    NodosComponent,
    ModalNodosComponent
  ],
  imports: [
    ComunModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonToggleModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    ModalDialog,
    GridLoaderComponent,
    MenuLateralComponent,
    FontAwesomeModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    ModalDialog
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faFileExcel);
  }
}