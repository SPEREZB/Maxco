import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {
  private apiUrl = `${API}zonas`;

  constructor(private http: HttpClient) { }

  // Obtener todas las zonas
  getZonas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener una zona por ID
  getZona(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva zona
  createZona(zona: any): Observable<any> {
    return this.http.post(this.apiUrl, zona);
  }

  // Actualizar una zona
  updateZona(id: number, zona: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, zona);
  }

  // Eliminar una zona
  deleteZona(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}