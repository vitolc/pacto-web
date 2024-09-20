import { Injectable } from '@angular/core';
import { environment } from "../../enviroments/enviroment.dev";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobApplicationsService {

  private readonly API = `${environment.API}/api/job-vacancies`;

  constructor(protected http: HttpClient) { }

  apply(application: any, vacancyId: number ): Observable<any> {
    let params = new HttpParams();
    params = params.append('vacancyId', vacancyId);

    return this.http.post<any>(`${this.API}/apply`, application, { params: params, withCredentials: true });
  }

  public createVacancy(vacancy: any): Observable<Object> {
    return this.http.post(`${this.API}/new`, vacancy, { withCredentials: true })
      .pipe(take(1));
  }

  public getPaginated(vacancyId: number, params: any): Observable<any> {
    return this.http.get<any>(`${environment.API}/api/job-applications/by-id/${vacancyId}`, {params, withCredentials: true
    }).pipe(take(1));
  }


}
