import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { authGuard, guestGuard } from './core/Guards/auth.guard';
import { VentasComponent } from './shared/components/ventas/ventas.component';
import { ZoneComponent } from './shared/components/zone/zone.component';
import { ProductosComponent } from './shared/components/productos/productos/productos.component';
import { UsuariosComponent } from './shared/components/usuarios/usuarios.component';
 
const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard]  },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard] },
  { path: 'ventas', component: VentasComponent, canActivate: [authGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [authGuard] },
  { path: 'zonas', component: ZoneComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }