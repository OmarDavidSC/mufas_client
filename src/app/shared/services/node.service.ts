import { Injectable } from "@angular/core";
import { sp } from "@pnp/sp";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Router } from "@angular/router";
import { ApiResponse } from "src/app/utils/ApiResponse";
import { ApiService } from "./api.service";
import { ToastrService } from "ngx-toastr";
import { ENodo } from "../models/entidades/ENodo";

@Injectable({
    providedIn: "root"
})

export class NodeService {
    private urlBase = environment.uriApiBack + "/node";

    constructor(
        private http: ApiService,
        private httpCient: HttpClient,
        private router: Router,
        private toastService: ToastrService
    ) {
    }

    async index(page: number = 1): Promise<any> {
        try {
            const url = this.urlBase + '';

            //formulario para enviar el numero de pagina
            const formData = new FormData();
            formData.append('page', String(page));

            const { success, data, message } = await this.http.postForm(url, formData).toPromise();
            if (!success) {
                this.toastService.error(message);
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    async adm(): Promise<ENodo[]> {
        try {
            const url = this.urlBase + '/adm';
            const { success, data, message } = await this.httpCient.get<ApiResponse<any>>(url).toPromise();
            if (!success) {
                this.toastService.error(message);
            }
            return ENodo.parseJsonList(data);
        } catch (error) {
            throw error;
        }
    }

    async store(formData: any): Promise<ApiResponse<any>> {
        try {
            const url = this.urlBase + '/store';
            const response = await this.http.postForm(url, formData).toPromise();
            return response as ApiResponse<any>;
        } catch (error) {
            throw error;
        }
    }

    async update(formData: any): Promise<ApiResponse<any>> {
        try {
            const url = this.urlBase + `/${formData.get('id')}/update`;
            const response = await this.http.postForm(url, formData).toPromise();
            return response as ApiResponse<any>;
        } catch (error) {
            throw error;
        }
    }

    async remove(id: any): Promise<ApiResponse<any>> {
        try {
            const url = this.urlBase + `/${id}/remove`;
            const response = await this.http.post(url, {}).toPromise();
            return response as ApiResponse<any>;
        } catch (error) {
            throw error;
        }
    }
}