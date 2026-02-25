import { Injectable, signal } from '@angular/core';

export interface Cuenta {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen1?: string;
  imagen2?: string;
}

export interface CarritoItem extends Cuenta {
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class Cuentas {
  private cuentasData: Cuenta[] = [
    {
      id: 1,
      nombre: 'COD Mobile - Cuenta Elite',
      descripcion: 'Nivel máximo con armas legendarias y operadores exclusivos',
      precio: 49.99,
      imagen1: '/img/sale/1.jpg',
      imagen2: '/img/sale/1.jpg',
    },
    {
      id: 2,
      nombre: 'COD Mobile - Operador Premium',
      descripcion: 'Todos los operadores desbloqueados con skins épicas',
      precio: 39.99,
      imagen1: '/img/sale/2.jpg',
      imagen2: '/img/sale/2.jpg',
    },
    {
      id: 3,
      nombre: 'COD Mobile - Armas Completas',
      descripcion: 'Todas las armas máximas con camos raros y exclusivos',
      precio: 54.99,
      imagen1: '/img/sale/3.jpg',
      imagen2: '/img/sale/3.jpg',
    },
    {
      id: 4,
      nombre: 'COD Mobile - Soldado Veterano',
      descripcion: 'Rango alto con todas las armas y pases de batalla completos',
      precio: 44.99,
      imagen1: '/img/sale/4.jpg',
      imagen2: '/img/sale/4.jpg',
    },
    {
      id: 5,
      nombre: 'COD Mobile - Coleccionista',
      descripcion: 'Colección completa de skins de operador raros y legendarios',
      precio: 59.99,
      imagen1: '/img/sale/5.jpg',
      imagen2: '/img/sale/5.jpg',
    },
    {
      id: 6,
      nombre: 'COD Mobile - Arsenal Total',
      descripcion: 'Todas las armas legendarias con camos épicos desbloqueados',
      precio: 64.99,
      imagen1: '/img/sale/6.jpg',
      imagen2: '/img/sale/6.jpg',
    },
    {
      id: 7,
      nombre: 'COD Mobile - Prestige Master',
      descripcion: 'Prestige máximo con todo desbloqueado en multijugador',
      precio: 69.99,
      imagen1: '/img/sale/7.jpg',
      imagen2: '/img/sale/7.jpg',
    },
    {
      id: 8,
      nombre: 'COD Mobile - Battle Pass Infinito',
      descripcion: 'Todos los pases de batalla de temporadas pasadas completos',
      precio: 54.99,
      imagen1: '/img/sale/8.jpg',
      imagen2: '/img/sale/8.jpg',
    },
    {
      id: 9,
      nombre: 'COD Mobile - Cuenta Premium',
      descripcion: 'Paquete completo: operadores, armas y cosméticos exclusivos',
      precio: 79.99,
      imagen1: '/img/sale/9.jpg',
      imagen2: '/img/sale/9.jpg',
    },
  ];

  private carrito = signal<CarritoItem[]>([]);

  constructor() {}

  getCuentas(): Cuenta[] {
    return this.cuentasData;
  }

  getCuentaById(id: number): Cuenta | undefined {
    return this.cuentasData.find(cuenta => cuenta.id === id);
  }

  getCarrito() {
    return this.carrito.asReadonly();
  }

  addToCarrito(cuenta: Cuenta, cantidad: number = 1): void {
    const carritoActual = this.carrito();
    const itemExistente = carritoActual.find(item => item.id === cuenta.id);

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.carrito.set([...carritoActual, { ...cuenta, cantidad }]);
    }
  }

  removeFromCarrito(id: number): void {
    this.carrito.set(this.carrito().filter(item => item.id !== id));
  }

  updateQuantity(id: number, cantidad: number): void {
    const carritoActual = this.carrito();
    const item = carritoActual.find(item => item.id === id);
    if (item) {
      if (cantidad > 0) {
        item.cantidad = cantidad;
        this.carrito.set([...carritoActual]);
      } else {
        this.removeFromCarrito(id);
      }
    }
  }

  clearCarrito(): void {
    this.carrito.set([]);
  }

  getTotalCarrito(): number {
    return this.carrito().reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  }

  getCantidadCarrito(): number {
    return this.carrito().reduce((total, item) => total + item.cantidad, 0);
  }
}
