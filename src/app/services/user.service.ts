import { Injectable } from '@angular/core';
import { environment } from "../../enviroments/enviroment.dev";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {UserDto} from "../common/dtos/user-dto";
import {ResponseBody} from "../common/dtos/response-body";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = `${environment.API}/api/user`;

  constructor(protected http: HttpClient) {
  }

  getUserInfo() {
    return this.http.get<ResponseBody<UserDto>>(`${this.API}/me`, { withCredentials: true });
  }
}
