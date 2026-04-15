import { Injectable } from '@angular/core';
import { Eusuario } from '../models/entidades/Eusuario';
import { ERol } from '../models/entidades/ERol';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  constructor() { }

  private Usuario: Eusuario | null = null;
  private Rol: ERol | null = null;

  setUser(data: Eusuario) {
    this.Usuario = data;
  }

  getUser(): Eusuario | null {
    return this.Usuario;
  }

  deleteUser() {
    this.Usuario = null;
  }

  setRole(rol: ERol) {
    this.Rol = rol;
  }

  getRole(): ERol | null {
    return this.Rol;
  }

  deleteRole() {
    this.Rol = null;
  }
}
