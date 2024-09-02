import { Injectable } from '@angular/core';
import { environment } from "../../enviroments/enviroment.dev";
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobVacanciesService {

  private readonly API = `${environment.API}/api/job-vacancies`;

  constructor(protected http: HttpClient) { }

  public getPaginated(params: any): Observable<Object> {
    return this.http.get(`${this.API}`, {params})
      .pipe(take(1));
  }
}
