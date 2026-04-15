import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { sweet2 } from 'src/app/utils/sweet2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  Form: FormGroup;
  loading: boolean = false;
  hide: boolean = true;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.Form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/bandeja-documentos'])
    }
  }

  async login() {
    if (this.Form.invalid) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    const item = this.Form.value;
    const datos = new FormData();
    datos.append('username', item.username);
    datos.append('password', item.password);

    this.loading = true;
    const response = await this.authService.signin(datos);
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      sweet2.loading();
      setTimeout(async () => {
        sweet2.loading(false);
        Swal.fire({
          text: 'Ha iniciado sesión correctamente',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        }).then(() => {
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
        });
      }, 3000);
    } else {
      Swal.fire({
        text: response.message,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      })
    }
  }

  irRecuperarPassword() {
    this.router.navigate(['/forgot-password']);
  }

}
