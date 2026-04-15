import { SPParse } from "src/app/utils/SPParse";

export class EPermisos {
    Id: any;
    Nombre: string;
    Key: string

    constructor() {
        this.Id = "";
        this.Nombre = "";
        this.Key = "";
    }

    public static parseJson(element: any): EPermisos {
        const objeto = new EPermisos();

        objeto.Id = SPParse.getNumber(element["id"]);
        objeto.Nombre = SPParse.getString(element["name"]);
        objeto.Key = SPParse.getString(element["permission"]);

        return objeto;
    }

    public static parseJsonList(elements: any): EPermisos[] {

        const listado: EPermisos[] = [];
        if (elements != null) {
            Object.keys(elements).forEach(key => {
                const element = elements[key];
                const objeto: EPermisos = EPermisos.parseJson(element);
                listado.push(objeto);
            })
        }
        return listado;
    }
}