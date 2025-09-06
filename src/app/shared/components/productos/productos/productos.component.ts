import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/core/services/productos/productos.service';
import { ToastrService } from 'ngx-toastr';

export interface Producto {
  id_producto?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productoForm: FormGroup;
  isEditing = false;
  currentProductoId: number | null = null;
  isLoading = true;
  searchText = '';
  categorias: string[] = ['Electrónica', 'Hogar', 'Ropa', 'Alimentos', 'Otros'];

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private toastr: ToastrService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.isLoading = true;
    this.productosService.getProductos().subscribe({
      next: (data: any) => {
        this.productos = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.toastr.error('Error al cargar los productos', 'Error');
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const productoData = this.productoForm.value;
    const request = this.isEditing && this.currentProductoId
      ? this.productosService.updateProducto(this.currentProductoId, productoData)
      : this.productosService.createProducto(productoData);

    request.subscribe({
      next: () => {
        this.toastr.success(`Producto ${this.isEditing ? 'actualizado' : 'creado'} correctamente`, 'Éxito');
        this.resetForm();
        this.loadProductos();
      },
      error: (error) => {
        console.error('Error al guardar producto:', error);
        this.toastr.error('Error al guardar el producto', 'Error');
      }
    });
  }

  editProducto(producto: Producto): void {
    this.isEditing = true;
    if (producto.id_producto) {
      this.currentProductoId = producto.id_producto;
      this.productoForm.patchValue({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        categoria: producto.categoria
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  deleteProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productosService.deleteProducto(id).subscribe({
        next: () => {
          this.toastr.success('Producto eliminado correctamente', 'Éxito');
          this.loadProductos();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          this.toastr.error('Error al eliminar el producto', 'Error');
        }
      });
    }
  }

  isCreating = false;

  resetForm(): void {
    this.productoForm.reset();
    this.isEditing = false;
    this.currentProductoId = null;
    this.isCreating = false; 
  }
  
  nuevoProducto(): void {
    this.resetForm();
    this.isCreating = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.loadProductos();
  }

  get filteredProductos(): Producto[] {
    if (!this.searchText) return this.productos;
    const search = this.searchText.toLowerCase();
    return this.productos.filter(p => 
      p.nombre.toLowerCase().includes(search) || 
      p.descripcion.toLowerCase().includes(search) ||
      p.categoria.toLowerCase().includes(search)
    );
  }

  get formControls() {
    return this.productoForm.controls;
  }
}
