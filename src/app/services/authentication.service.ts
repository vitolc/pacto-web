import {Injectable} from '@angular/core';
import {environment} from "../../enviroments/enviroment.dev";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, take} from "rxjs";
import {UserService} from "./user.service";
import {ResponseBody} from "../common/dtos/response-body";
import {UserDto} from "../common/dtos/user-dto";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly API = `${environment.API}/api/auth`;

  constructor(
    private _http: HttpClient,
    private _userService: UserService) {
  }

  public login(form: any, next: {
    next: ((value: ResponseBody<UserDto>) => void) | undefined,
    error: ((err: any) => void) | undefined
  }) {
    this._http.post<ResponseBody<UserDto>>(`${this.API}/login`, form, { withCredentials: true })
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this._userService.userInfo = response.data;

          if (next?.next)
            next.next(response)
        },
        error: err => {
          if (next?.error)
            next.error(err)
        }
      })
  }

  public register(form: any): Observable<Object> {
    return this._http.post(`${this.API}/register`, form)
      .pipe(take(1));
  }

}
