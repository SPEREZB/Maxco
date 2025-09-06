import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { ToastrService } from 'ngx-toastr'; 
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/core/services/localstorage/localstorage.service';

interface UserResponse {
  user_name: string;
  id_user: number;
  access_token: string;
  user: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private userService: UserService, 
    private toast: ToastrService, 
    private fb: FormBuilder,
    private router: Router,
    private localStorageService: LocalstorageService
  ) { 
    this.loginForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  @Output() log = new EventEmitter<void>(); 
  
  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.invalid) {
      this.toast.warning("Por favor complete todos los campos requeridos");
      return;
    }

    this.isLoading = true;
    
    this.userService.verifyUser(this.loginForm.value).subscribe({
      next: (response: UserResponse | null) => {
        this.isLoading = false;
     
        const loginData = this.loginForm.value;
       
        if (response) {
          const userId = response ? response.user.id_user : 0; 
          const rol = response ? response.user.rol : 'ADMIN'; 
          const token = response ? response.access_token : 'token-falso';
    
          this.createLocalStorage(userId, rol, token);
     
          this.log.emit(); 
        } else {
          this.toast.error("Usuario o contraseña incorrectos");
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.error("Error al verificar usuario");
        console.error(err);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  createLocalStorage( id_user:number, user_type:string, token:any)
  {
    this.localStorageService.setItem("id_user", id_user);
    this.localStorageService.setItem("rol", user_type);
    this.localStorageService.setItem("token", token);
  }
}
