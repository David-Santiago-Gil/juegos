import { Injectable } from '@angular/core';
import { CarritoItem } from './cuentas';

export interface Venta {
  id: string;
  fecha: Date;
  items: CarritoItem[];
  total: number;
  estado: 'pendiente' | 'completada' | 'cancelada';
  cliente?: {
    nombre: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  private ventas: Venta[] = [];
  private contadorVentas = 1000;

  constructor() {
    this.cargarVentas();
  }

  private cargarVentas(): void {
    if (typeof localStorage === 'undefined') return;
    const ventasGuardadas = localStorage.getItem('ventas');
    if (ventasGuardadas) {
      try {
        this.ventas = JSON.parse(ventasGuardadas);
      } catch (error) {
        console.error('Error al cargar ventas del localStorage', error);
      }
    }
  }

  private guardarVentas(): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('ventas', JSON.stringify(this.ventas));
  }

  crearVenta(items: CarritoItem[], cliente?: { nombre: string; email: string }): Venta {
    const venta: Venta = {
      id: `V-${++this.contadorVentas}`,
      fecha: new Date(),
      items: items,
      total: items.reduce((total, item) => total + item.precio * item.cantidad, 0),
      estado: 'pendiente',
      cliente: cliente,
    };

    this.ventas.push(venta);
    this.guardarVentas();
    return venta;
  }

  getVentas(): Venta[] {
    return this.ventas;
  }

  getVentaById(id: string): Venta | undefined {
    return this.ventas.find(venta => venta.id === id);
  }

  actualizarEstadoVenta(id: string, estado: 'pendiente' | 'completada' | 'cancelada'): boolean {
    const venta = this.ventas.find(v => v.id === id);
    if (venta) {
      venta.estado = estado;
      this.guardarVentas();
      return true;
    }
    return false;
  }

  eliminarVenta(id: string): boolean {
    const index = this.ventas.findIndex(v => v.id === id);
    if (index > -1) {
      this.ventas.splice(index, 1);
      this.guardarVentas();
      return true;
    }
    return false;
  }

  exportarVentas(): string {
    return JSON.stringify(this.ventas, null, 2);
  }

  importarVentas(jsonData: string): boolean {
    try {
      const datos = JSON.parse(jsonData);
      if (Array.isArray(datos)) {
        this.ventas = datos;
        this.guardarVentas();
        return true;
      }
    } catch (error) {
      console.error('Error al importar ventas', error);
    }
    return false;
  }
}
