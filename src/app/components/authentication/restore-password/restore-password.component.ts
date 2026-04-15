import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  Token: string | null = null;
  IdUsuario: number | null = null;
  Form: FormGroup;
  Loading: boolean = false;
  isTokenValid: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.Form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Obtener el parámetro 'key' de la URL
    this.activatedRoute.queryParams.subscribe((params) => {
      this.Token = params['key'] || null;
      console.log('Token recibido:', this.Token);
      if (this.Token) {
        this.passwordFerify();
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('password_confirmation');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  async passwordFerify() {
    const datos = new FormData();
    datos.append('token', this.Token);
    const { data, message, success } = await this.authService.passwordverify(datos);

    if (!success) {
      this.toastr.error(message, 'Error');
      this.isTokenValid = false;
      return;
    }
    this.IdUsuario = data.user_id;
    this.isTokenValid = true;
  }

  async restorePassword() {
    if (this.Form.invalid) {
      this.toastr.error('Todos los campos son obligatorios y las contraseñas deben coincidir', 'Error');
      return;
    }
    const item = this.Form.value;
    const datos = new FormData();
    datos.append('user_id', this.IdUsuario!.toString());
    datos.append('new_password', item.password);
    datos.append('repeat_password', item.password_confirmation)
    this.Loading = true;

    const response = await this.authService.passwordrestore(datos);
    if (response.success) {
      this.toastr.success(response.message, 'Éxito');
      this.router.navigate(['/signin']);
    } else {
      this.toastr.error(response.message, 'Error');
    }
    this.Loading = false;
  }
}