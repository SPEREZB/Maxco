import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
 
   private apiUrl = `${API}ventas`;

   constructor(private http: HttpClient) { }
 
   // Obtener todas las ventas
   getVentas(): Observable<any> {
     return this.http.get(this.apiUrl);
   }
 
   // Obtener una venta por ID
   getVenta(id: number): Observable<any> {
     return this.http.get(`${this.apiUrl}/${id}`);
   }
 
   // Crear una nueva venta
   createVenta(venta: any): Observable<any> {
     return this.http.post(this.apiUrl, venta);
   }
 
   // Actualizar una venta
   updateVenta(id: number, venta: any): Observable<any> {
     return this.http.patch(`${this.apiUrl}/${id}`, venta);
   }
 
   // Eliminar una venta
   deleteVenta(id: number): Observable<any> {
     return this.http.delete(`${this.apiUrl}/${id}`);
   }

   // Reporte: Ventas por zona y vendedor
  getVentasPorZonaYVendedor() {
    return this.http.get(`${this.apiUrl}/reporte/ventas-por-zona-vendedor`);
  }

  // Reporte: Zonas sin ventas en un rango de fechas
  getZonasSinVentas(fechaInicio: string, fechaFin: string) {
    return this.http.get(`${this.apiUrl}/reporte/zonas-sin-ventas`, {
      params: { inicio: fechaInicio, fin: fechaFin }
    });
  }

  // Reporte: Vendedores sin ventas en un rango de fechas
  getVendedoresSinVentas(fechaInicio: string, fechaFin: string) {
    return this.http.get(`${this.apiUrl}/reporte/vendedores-sin-ventas`, {
      params: { inicio: fechaInicio, fin: fechaFin }
    });
  }

  // Reporte: Ventas por cliente (con totales por año)
  getVentasPorCliente() {
    return this.http.get(`${this.apiUrl}/reporte/ventas-por-cliente`);
  }
}
