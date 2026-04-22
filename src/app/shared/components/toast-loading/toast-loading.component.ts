import { Component } from '@angular/core';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

@Component({
  selector: '[app-toast-loading]',
  template: `
  <div class="toast-loading">

      <div class="spinner"></div>

      <div class="text">
        {{ message || 'Procesando...' }}
      </div>

  </div>
  `,
  styles: [`
    .toast-loading{
        padding:25px 30px;
        border-radius:16px;
        background:white;
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:15px;
        min-width:220px;
    }

    .spinner{
        width:35px;
        height:35px;
        border:4px solid #e0e7ff;
        border-top:4px solid #4f8cff;
        border-radius:50%;
        animation:spin 1s linear infinite;
    }

    @keyframes spin{
        to{
            transform:rotate(360deg);
        }
    }

    .text{
        font-size:14px;
        color:#5b6b7f;
        font-weight:500;
    }
  `]
})
export class ToastLoadingComponent extends Toast {

   tapToDismiss = false;
   timeOut = 0;
   extendedTimeOut = 0;

  constructor(
    protected override toastrService: ToastrService,
    public override toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
  }

}