import {
  UserRole} from "../enum/user-role";

export interface UserDto {
  id: number,
  name: string,
  email: string,
  phone: string,
  role: UserRole
}
