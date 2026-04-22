import { Component } from '@angular/core';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

@Component({
  selector: '[app-toast-confirm]',
  template: `
  <div class="toast-confirm">
    
    <div class="toast-icon">
      ?
    </div>

    <div class="toast-title">
      {{ title }}
    </div>

    <div class="toast-message">
      {{ message }}
    </div>

    <div class="toast-actions">
      <button class="btn-cancel" (click)="cancel()">
        Cancelar
      </button>

      <button class="btn-ok" (click)="ok()">
        OK
      </button>
    </div>

  </div>
  `,
  styles: [`
    .toast-confirm{
        text-align:center;
        padding:20px;
        border-radius:16px;
        background: linear-gradient(135deg,#f8fbff,#eef5ff);
        min-width:280px;
    }

    .toast-icon{
        width:45px;
        height:45px;
        background:#4f8cff;
        color:white;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        font-weight:bold;
        margin:0 auto 10px auto;
        font-size:18px;
    }

    .toast-title{
        font-weight:600;
        font-size:17px;
        margin-bottom:5px;
        color:#1e2a3b;
    }

    .toast-message{
        font-size:14px;
        margin-bottom:18px;
        color:#5b6b7f;
    }

    .toast-actions{
        display:flex;
        justify-content:center;
        gap:12px;
    }

    .btn-ok{
        background: linear-gradient(135deg,#4f8cff,#3a6ff7);
        color:white;
        border:none;
        padding:7px 18px;
        border-radius:10px;
        cursor:pointer;
        font-weight:500;
        transition:0.2s;
    }

    .btn-ok:hover{
        transform:translateY(-1px);
        box-shadow:0 4px 10px rgba(79,140,255,0.4);
    }

    .btn-cancel{
        background:#eef1f6;
        border:none;
        padding:7px 18px;
        border-radius:10px;
        cursor:pointer;
        color:#5b6b7f;
        font-weight:500;
        transition:0.2s;
    }

    .btn-cancel:hover{
        background:#e4e9f2;
    }
  `]
})
export class ToastConfirmComponent extends Toast {

  constructor(
    protected override toastrService: ToastrService,
    public override toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
  }

  ok() {
    this.toastPackage.triggerAction();
    this.remove();
  }

  cancel() {
    this.remove();
  }
}