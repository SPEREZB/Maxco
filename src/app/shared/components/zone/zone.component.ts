import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentasService } from 'src/app/core/services/ventas/ventas.service';
interface Zona {
  id_zona?: number;
  nombre_zona: string;
  descripcion: string;
}
@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent {
  zonas: Zona[] = [];
  nuevaZona: Zona = { nombre_zona: '', descripcion: '' };
  editando: boolean = false;
  zonaEditandoId: number | null = null;

  // Reportes
  zonasMasVentasPorVendedor: any[] = [];
  zonasSinVentas: any[] = [];
  fechaInicio: string = '';
  fechaFin: string = '';

  // Cambia esta URL según tu backend (ejemplo en Go con pgx)
  private apiUrl = 'http://localhost:3000/zonas';

  constructor(private http: HttpClient, private ventasService: VentasService) {}

  ngOnInit(): void {
    this.obtenerZonas();
  }

  cargarZonasMasVentasPorVendedor() {
    this.ventasService.getVentasPorZonaYVendedor().subscribe((res: any) => {
      this.zonasMasVentasPorVendedor = res;
    });
  }

  cargarZonasSinVentas() {
    if (!this.fechaInicio || !this.fechaFin) return;
    this.ventasService.getZonasSinVentas(this.fechaInicio, this.fechaFin).subscribe((res: any) => {
      this.zonasSinVentas = res;
    });
  }

  obtenerZonas() {
    this.http.get<Zona[]>(this.apiUrl).subscribe(data => {
      this.zonas = data;
    });
  }

  agregarZona() {
    if (!this.nuevaZona.nombre_zona) return;

    this.http.post<Zona>(this.apiUrl, this.nuevaZona).subscribe(() => {
      this.obtenerZonas();
      this.nuevaZona = { nombre_zona: '', descripcion: '' };
    });
  }

  editarZona(zona: Zona) {
    this.editando = true;
    this.zonaEditandoId = zona.id_zona || null;
    this.nuevaZona = { ...zona };
  }

  actualizarZona() {
    if (this.zonaEditandoId) {
      const zonaParaActualizar = { ...this.nuevaZona };
      delete zonaParaActualizar.id_zona;

      this.http.patch(`${this.apiUrl}/${this.zonaEditandoId}`, zonaParaActualizar).subscribe(() => {
        this.obtenerZonas();
        this.cancelarEdicion();
      });
    }
  }

  eliminarZona(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.obtenerZonas();
    });
  }

  cancelarEdicion() {
    this.editando = false;
    this.zonaEditandoId = null;
    this.nuevaZona = { nombre_zona : '', descripcion: '' };
  }
}
