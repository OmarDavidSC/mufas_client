import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  lat!: number;
  lng!: number;
  mapUrl!: SafeResourceUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<GoogleMapsComponent>,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.lat = this.data.lat;
    this.lng = this.data.lng;

    const url = `https://www.google.com/maps?q=${this.lat},${this.lng}&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  abrirGoogleMaps() {
    const url = `https://www.google.com/maps?q=${this.lat},${this.lng}`;
    window.open(url, '_blank');
  }

  copiarCoordenadas() {
    const texto = `${this.lat}, ${this.lng}`;
    navigator.clipboard.writeText(texto);
    this.toast.success('Coordenadas copiadas');
  }

  cerrar() {
    this.dialogRef.close();
  }
}
