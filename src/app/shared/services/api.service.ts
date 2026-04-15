import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly RETRIES = 1;

  constructor(private httpClient: HttpClient) { }

  public get(url: string): any {
    return this.httpClient.get<any>(url).pipe(
      retry(this.RETRIES),
      map((data) => {
        return data;
      })
    );
  }
  public getCustomHeader(url: string, headers: any): any {
    return this.httpClient.get<any>(url, { headers: headers }).pipe(
      retry(this.RETRIES),
      map((data) => {
        return data;
      })
    );
  }
  public post(url: string, body: any): Observable<any> {
    return this.httpClient.post<any>(url, body).pipe(
      map((data) => {
        return data;
      })
    );
  }
  public put(url: string, body: any): Observable<any> {
    return this.httpClient.put<any>(url, body).pipe(
      map((data) => {
        return data;
      })
    );
  }
  public delete(url: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.delete<any>(url, options).pipe(
      map((data) => {
        return data;
      })
    );
  }
  public postFile(url: string, body: any, bodyName: string, file: File): Observable<any> {
    let formData = new FormData();
    formData.append("File", file);
    if (typeof body === 'object' && body !== null) {
      for (var key in body) {
        if (body[key]) {
          formData.append(`${bodyName}.${key}`, body[key]);
        }
      }
    } else {
      formData.append(`${bodyName}`, body);
    }
    return this.httpClient.post<any>(url, formData).pipe(
      map((data) => {
        return data;
      })
    );
  }
  public postForm(url: string, body: FormData): Observable<any> {
    return this.httpClient.post<any>(url, body).pipe(
      map((data) => {
        return data;
      })
    );
  }
  public postFiles(url: string, body: any, bodyName: string, files: Array<File>): Observable<any> {
    let formData = new FormData();
    if (files) {
      files.forEach(x => {
        formData.append(`Archivos`, x);
      });
    }
    if (typeof body === 'object' && body !== null) {
      for (var key in body) {
        if (body[key]) {
          formData.append(`${bodyName}.${key}`, body[key]);
        }
      }
    } else {
      formData.append(`${bodyName}`, body);
    }
    return this.httpClient.post<any>(url, formData).pipe(
      map((data) => {
        return data;
      })
    );
  }
  public putFile(url: string, body: any, bodyName: string, file: File): Observable<any> {
    let formData = new FormData();
    formData.append("File", file);
    for (var key in body) {
      if (body[key]) {
        formData.append(`${bodyName}.${key}`, body[key]);
      }
    }
    return this.httpClient.put<any>(url, formData).pipe(
      map((data) => {
        return data;
      })
    );
  }
  public putForm(url: string, body: FormData): Observable<any> {
    return this.httpClient.put<any>(url, body).pipe(
      map((data) => {
        return data;
      })
    );
  }
  public putFiles(url: string, body: any, bodyName: string, files: Array<File>): Observable<any> {
    let formData = new FormData();
    if (files) {
      files.forEach(x => {
        formData.append(`Archivos`, x);
      })
    }
    if (typeof body === 'object' && body !== null) {
      for (var key in body) {
        if (body[key]) {
          formData.append(`${bodyName}.${key}`, body[key]);
        }
      }
    } else {
      formData.append(`${bodyName}`, body);
    }
    return this.httpClient.put<any>(url, formData).pipe(
      map((data) => {
        return data;
      })
    );
  }
  public downloadFile(url: string): Observable<any> {
    return this.httpClient.get(url, { responseType: 'blob' });
  }
  public deleteMasivo(url: string, body: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body,
    };
    return this.httpClient.delete<any>(url, options).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
