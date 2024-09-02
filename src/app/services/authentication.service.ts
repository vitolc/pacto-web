import {Injectable} from '@angular/core';
import {environment} from "../../enviroments/enviroment.dev";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly API = `${environment.API}/api/auth`;

  constructor(protected http: HttpClient) {
  }

  public login(form: any): Observable<Object> {
    return this.http.post(`${this.API}/login`, form, { withCredentials: true })
      .pipe(take(1));
  }

  public register(form: any): Observable<Object> {
    return this.http.post(`${this.API}/register`, form)
      .pipe(take(1));
  }
}
