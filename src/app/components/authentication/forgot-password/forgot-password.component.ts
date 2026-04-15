import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { sweet2 } from 'src/app/utils/sweet2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  Form: FormGroup;
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.Form = this.fb.group({
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/bandeja-documentos'])
    }
  }

  async forgotPassword() {
    if (this.Form.invalid) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    const item = this.Form.value;
    const datos = new FormData();
    datos.append('email', item.email);

    this.loading = true;
    const response = await this.authService.forgotpassword(datos);
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      sweet2.loading();
      setTimeout(async () => {
        sweet2.loading(false);
        Swal.fire({
          text: response.message,
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        }).then(() => {
          this.loading = false;
        });
      }, 3000);
    } else {
      this.loading = false;
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
}
