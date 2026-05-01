import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ToastConfirmComponent } from 'src/app/shared/components/toast-confirm/toast-confirm.component';
import { ToastLoadingComponent } from 'src/app/shared/components/toast-loading/toast-loading.component';
import { ENodo } from 'src/app/shared/models/entidades/ENodo';
import { NodeService } from 'src/app/shared/services/node.service';
import { FormHelper } from 'src/app/utils/form-helper';

@Component({
  selector: 'app-modal-nodos',
  templateUrl: './modal-nodos.component.html',
  styleUrls: ['./modal-nodos.component.scss']
})
export class ModalNodosComponent implements OnInit {

  public TituloPopup: string;
  public TituloButton: string;
  public Form: FormGroup;
  Loading: boolean = false;
  LoadingToast: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ENodo,
    private formBuilder: FormBuilder,
    private nodoService: NodeService,
    private spinnerService: NgxSpinnerService,
    public toastService: ToastrService,
    public dialogRef: MatDialogRef<ModalNodosComponent>,
    private dialog: MatDialog
  ) {
    this.TituloPopup = this.data ? 'Editar Nodo' : 'Nueva Nodo';
    this.TituloButton = this.data ? 'Actualizar' : 'Registrar';

    this.Form = this.formBuilder.group({
      id: new FormControl(this.data?.Id, []),
      name: new FormControl(this.data?.Nombre, [Validators.required]),
      code: new FormControl(this.data?.Codigo, [Validators.required]),
      latitude: new FormControl(this.data?.Latitud, [Validators.required]),
      longitude: new FormControl(this.data?.Longitud, [Validators.required]),
      reference: new FormControl(this.data?.Referencia, [Validators.required]),
      district: new FormControl(this.data?.Distrito, [Validators.required]),
      city: new FormControl(this.data?.Ciudad, [Validators.required]),

    });
  }

  ngOnInit(): void { }

  async eventoGuardar(): Promise<void> {
    if (this.Loading) return;
    if (!this.Form.valid) {
      FormHelper.ValidarFormGroup(this.Form);
      return;
    }

    const item = this.Form.value;
    const formData = new FormData();
    formData.append('id', this.data ? this.data.Id : '');
    formData.append('name', item.name);
    formData.append('code', item.code);
    formData.append('reference', item.reference);
    formData.append('district', item.district);
    formData.append('city', item.city);
    formData.append('latitude', item.latitude);
    formData.append('longitude', item.longitude);

    const confirmToast = this.toastService.show(
      this.data
        ? '¿Deseas actualizar el nodo?'
        : '¿Deseas registrar el nodo?',
      'Confirmación',
      {
        toastComponent: ToastConfirmComponent,
        positionClass: 'toast-center-center',
        disableTimeOut: true
      }
    );

    confirmToast.onAction.subscribe(async () => {

      this.toastService.clear();
      this.Loading = true;
      this.LoadingToast = this.toastService.show(
        'Procesando todos los datos...',
        '',
        {
          toastComponent: ToastLoadingComponent,
          positionClass: 'toast-center-center',
          disableTimeOut: true,
          tapToDismiss: false,
          closeButton: false,
          enableHtml: true
        }
      );

      try {
        let response;
        if (this.data) {
          response = await this.nodoService.update(formData);
        } else {
          response = await this.nodoService.store(formData);
        }
        this.Loading = false;
        this.toastService.clear();
        if (!this.Loading) {
          if (response.success) {
            this.toastService.success(response.message);
            this.dialogRef.close(true);
          } else {
            this.toastService.error(response.message);
          }
        }
      } catch (error: any) {
        this.Loading = false;
        this.toastService.clear();
        if (!this.Loading) {
          this.toastService.error(error);
        }
      }
    });
  }
}
