export class UserForm { 
    id_usuario?: number;
    nombre: string;
    email: string;
    telefono?: string;
    direccion?: string;
    rol: string;
    password?: string;

    constructor() { 
    this.id_usuario = 0;
    this.nombre = '';
    this.email = '';
    this.telefono = '';
    this.direccion = '';
    this.rol = '';
    this.password = '';
    }
}