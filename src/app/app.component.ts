import { Component } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { Eusuario } from './shared/models/entidades/Eusuario';
import { AuthStoreService } from './shared/stores/auth-store.service';
import { ERol } from './shared/models/entidades/ERol';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Loginloaded: boolean = false;
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private authStore: AuthStoreService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.verify();
  }

  async verify() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await this.authService.verifyToken();
        if (response.success) {
          const user = Eusuario.parseJson(response.data.user);
          const role = ERol.parseJson(response.data.role);
          this.authStore.setUser(user);
          this.authStore.setRole(role);
          this.isAuthenticated = true;
        } else {
          this.authService.logout();
        }
      } catch (error) {
        this.authService.logout();
      }
    }
    this.Loginloaded = true;
  }

  onLogout() {
    this.authStore.deleteUser();
    this.authStore.deleteRole();
    this.isAuthenticated = false;
    this.Loginloaded = true;
    this.router.navigate(['/inicio']);
  }
}