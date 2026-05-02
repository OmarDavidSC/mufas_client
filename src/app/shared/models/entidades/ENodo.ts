import { SPParse } from "src/app/utils/SPParse";

export class ENodo {
    Id: any;
    Nombre: string;
    Codigo: any;
    Latitud: any;
    Longitud: any;
    Referencia: string;
    Distrito: string;
    Ciudad: string;
    Estado: string;

    constructor() {
        this.Id = "";
        this.Nombre = "";
        this.Codigo = "";
        this.Latitud = 0;
        this.Longitud = 0;
        this.Referencia = "";
        this.Distrito = "";
        this.Ciudad = "";
        this.Estado = "";
    }

    public static parseJson(element: any): ENodo {
        const objeto = new ENodo();

        objeto.Id = SPParse.getNumber(element["id"]);
        objeto.Nombre = SPParse.getString(element["name"]);
        objeto.Codigo = SPParse.getString(element["code"]);
        objeto.Latitud = SPParse.getFloat(element["latitude"]);
        objeto.Longitud = SPParse.getFloat(element["longitude"]);
        objeto.Referencia = SPParse.getString(element["reference"]);
        objeto.Distrito = SPParse.getString(element["district"]);
        objeto.Ciudad = SPParse.getString(element["city"]);
        objeto.Estado = SPParse.getString(element["status"]);
        return objeto;
    }

    public static parseJsonList(elements: any): ENodo[] {

        const listado: ENodo[] = [];
        if (elements != null) {
            Object.keys(elements).forEach(key => {
                const element = elements[key];
                const objeto: ENodo = ENodo.parseJson(element);
                listado.push(objeto);
            })
        }
        return listado;
    }
}