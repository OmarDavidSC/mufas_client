import { DatePipe } from "@angular/common";

export class SPParse {
  
  static getBool(valor: any): boolean {
    if (valor) {
      return valor;
    }

    return false;
  }

  static getString(valor: any): string {
    if (valor) {
      return valor.toString();
    }

    return "";
  }  

  static getNumber(valor: any): number {
    if (valor) {
      return parseInt(valor, 10);
    }

    return 0;
  }

  static getFloat(valor: any): number {
    if (valor) {
      return parseFloat(valor);
    }

    return 0;
  }

  static getDate(valor: any): Date | null {
    if (valor) {
      let fecha = new Date(valor);
      fecha = new Date(fecha);
      return fecha;
    }

    return null;
  }

  static getDateLarge(valor: any): string | null {
    if (valor) {
      let fecha = new Date(valor);
      const datePipe = new DatePipe("es-PE");
      return datePipe.transform(fecha, "dd/MM/yyyy");
    }

    return "";
  }

  static getDateReporte(valor: any): Date | null {
    if (valor) {
      let fecha = new Date(valor);
      fecha = new Date(fecha.setMinutes(30));
      return fecha;
    }

    return null;
  }

  static getHyperlink(valor: any): any {
    let datos = { Descripcion: "", URL: "" };

    /*if (valor) {
      datos.Descripcion = valor[Constantes.columnas.Descripcion];
      datos.URL = valor[Constantes.columnas.Url];
    }*/

    return datos;
  }

  static getStringHtml(valor: any): any {
    if (valor) {     
      return valor.replace(/<[^>]*>/g, "");     
    }

    return "";
  }  

  static convertirStringToDate(valor: any): Date {
    const parts = valor.split("/");

    if (parts.length === 3) {
      const mes = parseInt(parts[1], 10) - 1;
      return new Date(parts[2], mes, parts[0]);
    }
    return new Date();
  }
 
}
