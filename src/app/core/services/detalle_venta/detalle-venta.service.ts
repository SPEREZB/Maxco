import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  private apiUrl = `${API}detalle_venta`;

  constructor(private http: HttpClient) {}

  // Obtener todos los detalles de una venta por id
  getDetallesPorVenta(idVenta: number | undefined): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${idVenta}`);
  }

  // Crear un detalle
  crearDetalle(detalle: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, detalle);
  }

  // Actualizar un detalle
  actualizarDetalle(idDetalle: number, detalle: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${idDetalle}`, detalle);
  }

  // Eliminar un detalle
  eliminarDetalle(idDetalle: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${idDetalle}`);
  }
}
