import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentasService } from 'src/app/core/services/ventas/ventas.service';
import { DetalleVentaService } from 'src/app/core/services/detalle_venta/detalle-venta.service';
import { Producto } from '../productos/productos/productos.component';
import { API } from 'src/config';
import { ToastrService } from 'ngx-toastr';

interface Venta {
  id_venta?: number;
  fecha: string;
  monto_total: number;
  id_cliente: number;
  id_vendedor: number;
  id_zona: number;
}

interface Usuario {
  id_usuario: number;
  nombre: string;
  rol: string;
}

interface Zona {
  id_zona: number;
  nombre_zona: string;
}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html'
})
export class VentasComponent implements OnInit {
  ventas: Venta[] = [];
  usuarios: Usuario[] = [];
  zonas: Zona[] = [];
  productos: Producto[] = [];

  nuevaVenta: Venta = { fecha: '', monto_total: 0, id_cliente: 0, id_vendedor: 0, id_zona: 0 };
  editando: boolean = false;
  ventaEditandoId: number | null = null;

  // Resultados de reportes
  reporteVentasPorZonaVendedor: any[] = [];
  reporteZonasSinVentas: any[] = [];
  reporteVendedoresSinVentas: any[] = [];
  reporteVentasPorCliente: any[] = [];

  // Fechas para reportes
  fechaInicio: string = '';
  fechaFin: string = '';

  private apiUrl = API + 'ventas';
  private usuariosUrl = API + 'usuarios';
  private zonasUrl = API + 'zonas';

  constructor(private http: HttpClient, private toastr: ToastrService,private ventasService: VentasService, private detalleVentaService: DetalleVentaService) {}

  ngOnInit(): void {
    this.obtenerVentas();
    this.obtenerUsuarios();
    this.obtenerZonas(); 
  }

  getUsuarioNombre(idUsuario: number): string {
    const usuario = this.usuarios.find(u => u.id_usuario === idUsuario);
    return usuario ? usuario.nombre : 'Desconocido';
  }
  
  getZonaNombre(idZona: number): string {
    const zona = this.zonas.find(z => z.id_zona === idZona);
    return zona ? zona.nombre_zona : 'Desconocida';
  }
  
  obtenerVentas() {
    this.http.get<Venta[]>(this.apiUrl).subscribe(data => this.ventas = data);
  } 

  obtenerUsuarios() {
    this.http.get<Usuario[]>(this.usuariosUrl).subscribe(data => this.usuarios = data);
  }

  obtenerZonas() {
    this.http.get<Zona[]>(this.zonasUrl).subscribe(data => this.zonas = data);
  }

  agregarVenta() {
    if (!this.nuevaVenta.fecha || !this.nuevaVenta.monto_total || !this.nuevaVenta.id_cliente || !this.nuevaVenta.id_zona) return;

    // Asignar el id del vendedor desde localStorage
    const vendedorId = Number(localStorage.getItem('id_usuario'));
    const ventaParaEnviar = {
      ...this.nuevaVenta,
      id_vendedor: vendedorId
    };

    this.http.post<Venta>(this.apiUrl, ventaParaEnviar).subscribe(() => {
      this.obtenerVentas();
      this.nuevaVenta = { fecha: '', monto_total: 0, id_cliente: 0,id_vendedor: 0, id_zona: 0 };
    });
  }

  editarVenta(venta: Venta) {
    this.editando = true;
    this.ventaEditandoId = venta.id_venta || null;
    this.nuevaVenta = { ...venta };
  }

  actualizarVenta() {
    if (this.ventaEditandoId) {
      this.http.put(`${this.apiUrl}/${this.ventaEditandoId}`, this.nuevaVenta).subscribe(() => {
        this.obtenerVentas();
        this.cancelarEdicion();
      });
    }
  }

  eliminarVenta(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.obtenerVentas());
  }

  cancelarEdicion() {
    this.editando = false;
    this.ventaEditandoId = null;
    this.nuevaVenta = { fecha: '', monto_total: 0, id_cliente: 0, id_vendedor: 0, id_zona: 0 };
  }

  // --- Métodos para reportes especiales ---
  cargarVentasPorZonaYVendedor() {
    this.ventasService.getVentasPorZonaYVendedor().subscribe((res: any) => {
      this.reporteVentasPorZonaVendedor = res;
    });
  }

  cargarZonasSinVentas() {
    if (!this.fechaInicio || !this.fechaFin) return;
    this.ventasService.getZonasSinVentas(this.fechaInicio, this.fechaFin).subscribe((res: any) => {
      this.reporteZonasSinVentas = res;
    });
  }

  cargarVendedoresSinVentas() {
    if (!this.fechaInicio || !this.fechaFin) 
      {
        this.toastr.warning('Por favor, seleccione una fecha de inicio y fin', 'Error');
        return;
      }
    this.ventasService.getVendedoresSinVentas(this.fechaInicio, this.fechaFin).subscribe((res: any) => {
      this.reporteVendedoresSinVentas = res;
    });
  }

  cargarVentasPorCliente() {
    this.ventasService.getVentasPorCliente().subscribe((res: any) => {
      this.reporteVentasPorCliente = res;
    });
  }

  detalleVenta: any[] = [];
mostrarModalDetalle = false;


verDetalleVenta(idVenta: number | undefined) {
  this.detalleVentaService.getDetallesPorVenta(idVenta).subscribe({
    next: (res: any) => {
      this.detalleVenta = res || [];  
      this.mostrarModalDetalle = true;
    },
    error: (err: any) => {
      console.error('Error al cargar detalles:', err);
    }
  });
}
getNombreProducto(id: number): string {
  const prod = this.productos.find(p => p.id_producto === id);
  return prod ? prod.nombre : 'Producto desconocido';
}

cerrarDetalle() {
  this.mostrarModalDetalle = false;
  this.detalleVenta = [];
}

editarDetalle(detalle: any) {
  this.detalleVentaService.actualizarDetalle(detalle.id_detalle_venta, detalle).subscribe({
    next: () => {
      this.obtenerVentas();

    },
    error: (err) => console.error('Error al actualizar detalle:', err)
  });
}

// Eliminar un detalle de venta
eliminarDetalle(idDetalle: number) {
  this.detalleVentaService.eliminarDetalle(idDetalle).subscribe({
    next: () => {
      this.detalleVenta = this.detalleVenta.filter(d => d.id_detalle_venta !== idDetalle);
      this.obtenerVentas();

    },
    error: (err) => console.error('Error al eliminar detalle:', err)
  });
}

guardarDetalle(detalle: any) {
  // Convertir precio a número antes de enviar
  const precioNum = parseFloat(detalle.precio.replace('$','').replace(',','.'));
  const payload = {
    cantidad: detalle.cantidad,
    precio: precioNum
  };
  this.detalleVentaService.actualizarDetalle(detalle.id_detalle_venta, payload).subscribe({
    next: () => {
      this.obtenerVentas();
      this.cerrarDetalle();
      this.toastr.success('Detalle actualizado correctamente', 'Éxito');
    },
    error: (err) => {
      console.error('Error al actualizar detalle:', err);
      this.toastr.error('Error al actualizar detalle', 'Error');
    }
  }); 
}

}

