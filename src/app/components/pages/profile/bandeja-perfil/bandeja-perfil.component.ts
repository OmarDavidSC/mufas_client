import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ERol } from 'src/app/shared/models/entidades/ERol';
import { Eusuario } from 'src/app/shared/models/entidades/Eusuario';
import { FormularioBase } from 'src/app/shared/pages/FormularioBase';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthStoreService } from 'src/app/shared/stores/auth-store.service';
import { ModalEditarPerfilComponent } from '../partials/modal-editar-perfil/modal-editar-perfil.component';
import { ModalEditarPasswordComponent } from '../partials/modal-editar-password/modal-editar-password.component';
import { ModalEditarEmailComponent } from '../partials/modal-editar-email/modal-editar-email.component';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-bandeja-perfil',
  templateUrl: './bandeja-perfil.component.html',
  styleUrls: ['./bandeja-perfil.component.scss']
})
export class BandejaPerfilComponent extends FormularioBase implements OnInit {

  UsuarioActual: Eusuario | null = null;
  Role: ERol | null = null;

  Loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService,
    public authService: AuthService,
    public profileService: ProfileService,
    public auhtStore: AuthStoreService
  ) {
    super('bandeja-perfil', dialog, route, router, spinner)
  }

  ngOnInit(): void {
    Promise.all([
      this.auhtStore.getUser(),
      this.auhtStore.getRole(),
    ]
    ).then(([resultadoUsuario, resultadoRole]) => {
      this.UsuarioActual = resultadoUsuario;
      this.Role = resultadoRole;
      this.initialize();
    });
  }

  async initialize() {
    this.Loading = true;
    this.Loading = false;
  }

  async eventoMostrarPopupEditarProfile(item: Eusuario): Promise<void> {
    const dialogRef = this.dialog.open(ModalEditarPerfilComponent, {
      width: '600px',
      disableClose: true,
      data: item
    });
    const respuesta = await dialogRef.afterClosed().toPromise();
    if (respuesta) {
      console.log('Respuesta editar perfil:', respuesta);
      await this.initialize();
    }
  }

  async eventoMostrarPopupEditarPassword(item: Eusuario): Promise<void> {
    const dialogRef = this.dialog.open(ModalEditarPasswordComponent, {
      width: '600px',
      disableClose: true,
      data: item
    });
    const respuesta = await dialogRef.afterClosed().toPromise();
    if (respuesta) {
      await this.initialize();
    }
  }

  async eventoMostrarPopupEditarEmail(item: Eusuario): Promise<void> {
    const dialogRef = this.dialog.open(ModalEditarEmailComponent, {
      width: '600px',
      disableClose: true,
      data: item
    });
    const respuesta = await dialogRef.afterClosed().toPromise();
    if (respuesta) {
      await this.initialize();
    }
  }

}
