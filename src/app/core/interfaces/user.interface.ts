import { Rol } from "../enums/rol.enum";

export interface IUserResponse {
    id_user: number;
    user_name: string;
    user_type: Rol;
    token: string;
  }