import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = `${API}productos`;

  constructor(private http: HttpClient) { }
 
  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getProducto(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }
  updateProducto(id: number, producto: any): Observable<any> {
    producto.precio = parseFloat(producto.precio);
    return this.http.patch(`${this.apiUrl}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
