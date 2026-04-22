import { SPParse } from "src/app/utils/SPParse";

export class ECliente {
    Id: any;
    Nombre: string;
    Dni: number;
    Telefono: number;
    Correo: string;
    Distrito: string;
    Ciudad: string;
    Latitud: any;
    Longitud: any;
    Estado: any;

    constructor() {
        this.Id = "";
        this.Nombre = "";
        this.Dni = 0;
        this.Telefono = 0;
        this.Correo = "";
        this.Distrito = "";
        this.Ciudad = "";
        this.Latitud = 0;
        this.Longitud = 0;
        this.Estado = "";
    }

    public static parseJson(element: any): ECliente {
        const objeto = new ECliente();

        objeto.Id = SPParse.getNumber(element["id"]);
        objeto.Nombre = SPParse.getString(element["name"]);
        objeto.Dni = SPParse.getNumber(element["dni"]);
        objeto.Telefono = SPParse.getNumber(element["phone"]);
        objeto.Correo = SPParse.getString(element["address"]);
        objeto.Distrito = SPParse.getString(element["district"]);
        objeto.Ciudad = SPParse.getString(element["city"]);
        objeto.Latitud = SPParse.getFloat(element["latitude"]);
        objeto.Longitud = SPParse.getFloat(element["longitude"]);
        objeto.Estado = SPParse.getNumber(element["status"]);
        return objeto;
    }

    public static parseJsonList(elements: any): ECliente[] {

        const listado: ECliente[] = [];
        if (elements != null) {
            Object.keys(elements).forEach(key => {
                const element = elements[key];
                const objeto: ECliente = ECliente.parseJson(element);
                listado.push(objeto);
            })
        }
        return listado;
    }
}