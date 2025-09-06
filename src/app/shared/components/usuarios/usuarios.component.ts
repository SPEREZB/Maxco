import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';

interface Usuario {
  id_usuario?: number;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  rol: string;
  password: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = this.resetUsuario();
  isEditing: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.userService.readUser().subscribe((users: Usuario[]) => {
      this.usuarios = users;
    });
  }

  guardarUsuario() {
    if (this.usuario.id_usuario) {
      // Actualizar
      this.userService.updateUser(this.usuario.id_usuario, this.usuario).subscribe(() => {
        this.loadUsuarios();
        this.usuario = this.resetUsuario();
        this.isEditing = false;
      });
    } else {
      // Crear nuevo
      this.userService.createUser(this.usuario).subscribe(() => {
        this.loadUsuarios();
        this.usuario = this.resetUsuario();
      });
    }
  }

  editarUsuario(u: Usuario) {
    this.usuario = { ...u };
    this.isEditing = true;
  }

  eliminarUsuario(id?: number) {
    if (id) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsuarios();
      });
    }
  }

  private resetUsuario(): Usuario {
    return {
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      rol: 'CLT',
      password: ''
    };
  }
}

