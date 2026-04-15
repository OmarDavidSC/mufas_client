import { SPParse } from "src/app/utils/SPParse";
import { Funciones } from "src/app/utils/Funciones";
import { EPermisos } from "./EPemisos";

export class ERol {
    Id: any;
    Nombre: string;
    Permisos: EPermisos[];

    constructor() {
        this.Id = "";
        this.Nombre = "";
        this.Permisos = [];
    }

    public static parseJson(element: any): ERol {
        const objeto = new ERol();

        objeto.Id = SPParse.getNumber(element["id"]);
        objeto.Nombre = SPParse.getString(element["name"]);

        if (!Funciones.esUndefinedNullOrEmpty(element["permissions"]) && element["permissions"].length > 0) {
            for (const item of element["permissions"]) {
                const datos = EPermisos.parseJson(item);
                objeto.Permisos.push(datos);
            }
        }
        return objeto;
    }

    public static parseJsonList(elements: any): ERol[] {

        const listado: ERol[] = [];
        if (elements != null) {
            Object.keys(elements).forEach(key => {
                const element = elements[key];
                const objeto: ERol = ERol.parseJson(element);
                listado.push(objeto);
            })
        }
        return listado;
    }
}