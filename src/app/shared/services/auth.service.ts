import { Injectable } from "@angular/core";
import { sp } from "@pnp/sp";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Router } from "@angular/router";
import { ApiResponse } from "src/app/utils/ApiResponse";
import { ApiService } from "./api.service";


@Injectable({
    providedIn: "root"
})

export class AuthService {
    private urlBase = environment.uriApiBack + "/auth";

    constructor(
        private http: ApiService,
        private router: Router
    ) {
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    async verifyToken(): Promise<ApiResponse<any>> {
        try {
            const url = this.urlBase + '/verify-token';
            const response = await this.http.post(url, {}).toPromise();

            return response as ApiResponse<any>;
        } catch (error) {
            throw error;
        }

    }

    async signin(formData: any): Promise<ApiResponse<any>> {
        try {
            const url = this.urlBase + '/signin';
            const response = await this.http.postForm(url, formData).toPromise();
            return response as ApiResponse<any>;
        } catch (error) {
            throw error;
        }

    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/signin']);
    }


    async forgotpassword(formData: any): Promise<ApiResponse<any>> {
        try {
            const url = this.urlBase + '/password/forgot';
            const response = await this.http.postForm(url, formData).toPromise();
            return response as ApiResponse<any>;
        } catch (error) {
            throw error;
        }

    }

    async passwordverify(formData: any): Promise<ApiResponse<any>> {
        try {
            const url = this.urlBase + '/password/verify';
            const response = await this.http.postForm(url, formData).toPromise();
            return response as ApiResponse<any>;
        } catch (error) {
            throw error;
        }

    }

    async passwordrestore(formData: any): Promise<ApiResponse<any>> {
        try {
            const url = this.urlBase + '/password/restore';
            const response = await this.http.postForm(url, formData).toPromise();
            return response as ApiResponse<any>;
        } catch (error) {
            throw error;
        }

    }
}