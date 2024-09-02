import {Injectable} from '@angular/core';
import {UserDto} from "../common/dtos/user-dto";
import {UserRole} from "../common/enum/user-role";

import {Strings} from "../common/function.common";
import {SessionStorage} from "ngx-webstorage";
import isObjectEmpty = Strings.isObjectEmpty;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @SessionStorage("user_info")
  private _userInfo?: UserDto;

  isAdmin(): boolean {
    if (isObjectEmpty(this._userInfo)) return false
    return this._userInfo?.role === UserRole.ADMIN
  }

  isUser(): boolean {
    if (isObjectEmpty(this._userInfo)) return false
    return this._userInfo?.role === UserRole.USER
  }

  public get userInfo(): UserDto | undefined {
    return this._userInfo;
  }

  public set userInfo(userInfo: UserDto | undefined) {
    this._userInfo = userInfo;
  }
}


