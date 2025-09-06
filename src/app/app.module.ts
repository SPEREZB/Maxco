import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
 import { MainmenuComponent } from './shared/components/menus/mainmenu/mainmenu.component';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
 import { LoginComponent } from './shared/components/login/login.component'; 
import { FormatDatePipe } from './shared/pipes/formatDate';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'; 
import { MinValueDirective } from './shared/directives/participantesMinimos';
import { OnlyNumberDirective } from './shared/directives/onlyNumber';
import { CapitalizePipe } from './shared/pipes/letraMayuscula'; 
import { ValidateUrlPipe } from './shared/pipes/linkValidate'; 
import { Error404Interceptor } from './core/middleware/errorStatus.interceptor';
import { PreventDuplicateRequestsInterceptor } from './core/middleware/prevent-duplicate-request.interceptor';
import { TimeoutInterceptor } from './core/middleware/timeoute.interceptor';
import { AuthInterceptor } from './core/middleware/auth.interceptor';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductosComponent } from './shared/components/productos/productos/productos.component';
import { ZoneComponent } from './shared/components/zone/zone.component';
import { VentasComponent } from './shared/components/ventas/ventas.component';
import { UsuariosComponent } from './shared/components/usuarios/usuarios.component'; 
@NgModule({
  declarations: [
    AppComponent, 
    MainmenuComponent, 
    LoginComponent, 
    FormatDatePipe,
    CapitalizePipe,
    ValidateUrlPipe, 
    MinValueDirective,
    OnlyNumberDirective,
    ProductosComponent,
    ZoneComponent,
    VentasComponent,
    UsuariosComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, 
    AngularFireStorageModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,  
    NgApexchartsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [   DatePipe,
    { provide: 'LOCALE_ID', useValue: 'es-ES' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: Error404Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: PreventDuplicateRequestsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true } ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() { 
    registerLocaleData(localeEs);
  }
 }
