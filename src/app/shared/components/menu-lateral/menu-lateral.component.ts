import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, Inject, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import { Eusuario } from '../../models/entidades/Eusuario';
import { AuthStoreService } from '../../stores/auth-store.service';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  public Drawer: MatDrawer | undefined;
  @Output() cerrarSesion = new EventEmitter<void>();

  @ViewChild('drawer') set MatDrawer(value: MatDrawer) {
    this.Drawer = value;
  }

  UsuarioActual: Eusuario | null = null;

  flatMenu: { label: string; icon: string; route: string }[] = [];
  filteredMenu: { label: string; icon: string; route: string }[] = [];

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'home',
      route: '/bandeja-contratos'
    },
    {
      label: 'Administración',
      icon: 'settings',
      children: [
        { label: 'Áreas', icon: 'business', route: '/areas' },
        { label: 'Usuarios', icon: 'people', route: '/usuarios' },
        { label: 'Roles', icon: 'admin_panel_settings', route: '/roles' }
      ]
    },
    {
      label: 'Reportes',
      icon: 'assessment',
      children: [
        { label: 'Reporte General', icon: 'bar_chart', route: '/reporte-general' },
        { label: 'Estadísticas', icon: 'pie_chart', route: '/estadisticas' }
      ]
    },
    {
      label: 'Dashboard',
      icon: 'grid_view',
      route: '/dashboard',
      children: [
        { label: 'Sub Dashboard', icon: 'view_module', route: '/sub-dashboard' }
      ]
    }
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private authService: AuthService,
    private authStore: AuthStoreService
  ) { }

  ngOnDestroy(): void {
  }

  async ngOnInit(): Promise<void> {
    this.UsuarioActual = this.authStore.getUser();
    this.buildFlatMenu();
    this.filteredMenu = [...this.flatMenu];
  }

  buildFlatMenu() {
    this.flatMenu = [];
    this.menuItems.forEach(item => {
      if (item.route) {
        this.flatMenu.push({ label: item.label, icon: item.icon, route: item.route });
      }
      if (item.children) {
        item.children.forEach(child => {
          this.flatMenu.push({ label: child.label, icon: child.icon, route: child.route });
        });
      }
    });
  }

  irAPerfil() {
    this.router.navigate(['/mi-perfil']);
  }

  public irAlHome(): void {
    this.router.navigate(['/bandeja-contratos']);
    this.Drawer?.toggle();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.Drawer?.toggle();
  }

  OnClickLogout() {
    this.authService.logout();
    this.cerrarSesion.emit();
  }
}
