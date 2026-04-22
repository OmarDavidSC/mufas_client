import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ECliente } from 'src/app/shared/models/entidades/ECliente';
import { ERol } from 'src/app/shared/models/entidades/ERol';
import { Eusuario } from 'src/app/shared/models/entidades/Eusuario';
import { FormularioBase } from 'src/app/shared/pages/FormularioBase';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { AuthStoreService } from 'src/app/shared/stores/auth-store.service';
import { ModalClienteComponent } from '../modals/modal-cliente/modal-cliente.component';
import { ToastConfirmComponent } from 'src/app/shared/components/toast-confirm/toast-confirm.component';
import { ToastLoadingComponent } from 'src/app/shared/components/toast-loading/toast-loading.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent extends FormularioBase implements OnInit {

  ListaClientes: ECliente[] = [];
  UsuarioActual: Eusuario | null = null;
  Role: ERol | null = null;

  displayedColumns: string[] = ['Nombre', 'Dni', 'Telefono', 'Correo', 'Distrito', 'Ciudad', 'Latitud', 'Longitud', 'Acciones'];

  PaginaActual: number = 1;
  TotalPaginas: number = 1;
  TotalRRegistros: number = 0;

  Loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService,
    public authService: AuthService,
    public clienteService: ClienteService,
    public auhtStore: AuthStoreService,
    public toastService: ToastrService,
  ) {
    super('administracion-clientes', dialog, route, router, spinner)
  }

  ngOnInit(): void {
    Promise.all([
      this.auhtStore.getUser(),
      this.auhtStore.getRole(),
    ]
    ).then(([resultadoUsuario, resultadoRole]) => {
      this.UsuarioActual = resultadoUsuario;
      this.Role = resultadoRole;
      if (this.Role?.Nombre !== "Administrador") {
        this.mostrarModalInformativo("Validación de Acceso", "Su usuario no tiene acceso a esta página.")
        setTimeout(() => {
          this.router.navigate(['/inicio']);
        }, 500);
      } else {
        this.initialize();
      }
    });
  }

  async initialize() {
    this.OnEventoCargarClientes();
  }

  async OnEventoCargarClientes() {
    this.Loading = true;
    const data = await this.clienteService.index(this.PaginaActual)
    this.ListaClientes = ECliente.parseJsonList(data.data);
    this.PaginaActual = data.page;
    this.TotalPaginas = data.total_pages;
    this.TotalRRegistros = data.total;
    this.Loading = false;
  }

  async OnchangedPage(page: number) {
    if (page < 1) return;
    if (page > this.TotalPaginas) return;

    this.PaginaActual = page;
    await this.OnEventoCargarClientes();
  }

  async eventoMostrarPopupRegistrar(): Promise<void> {
    const dialogRef = this.dialog.open(ModalClienteComponent, {
      width: '600px',
      disableClose: true,
      data: null
    });
    const respuesta = await dialogRef.afterClosed().toPromise();
    if (respuesta) {
      await this.initialize();
    }
  }

  async eventoMostrarPopupEditar(item: ECliente): Promise<void> {
    const dialogRef = this.dialog.open(ModalClienteComponent, {
      width: '600px',
      disableClose: true,
      data: item
    });
    const respuesta = await dialogRef.afterClosed().toPromise();
    if (respuesta) {
      await this.initialize();
    }
  }

  async eventoEliminar(item: ECliente): Promise<void> {
    const confirmToast = this.toastService.show(
      '¿Confirmas la eliminación del cliente?',
      'Eliminar cliente',
      {
        toastComponent: ToastConfirmComponent,
        positionClass: 'toast-center-center',
        disableTimeOut: true
      }
    );
    confirmToast.onAction.subscribe(async () => {

      this.toastService.clear();

      const loadingToast = this.toastService.show(
        'Eliminando cliente...',
        '',
        {
          toastComponent: ToastLoadingComponent,
          positionClass: 'toast-center-center',
          disableTimeOut: true,
          tapToDismiss: false
        }
      );

      try {
        const response = await this.clienteService.remove(item.Id);
        this.toastService.clear();

        if (response.success) {
          this.toastService.success(response.message);
          await this.initialize();
        } else {
          this.toastService.error(response.message);
        }
      } catch (error: any) {
        this.toastService.clear();
        this.toastService.error(error);
      }
    });
  }

  public Navegar(site: string): void {
    const tieneAspx = site.indexOf('.aspx') !== -1;
    if (tieneAspx) {
      location.href = ``;
    } else {
      this.router.navigate([site]);
    }
  }

}
