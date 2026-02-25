import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cuentas, Cuenta, CarritoItem } from '../../services/cuentas';

@Component({
  selector: 'app-sale',
  imports: [CommonModule, FormsModule],
  templateUrl: './sale.html',
  styleUrl: './sale.css',
})
export class Sale implements OnInit {
  private cuentasService = inject(Cuentas);
  cuentas: Cuenta[] = [];
  carrito = this.cuentasService.getCarrito();
  cantidadSeleccionada: { [key: number]: number } = {};
  
  @Output() openAuthModal = new EventEmitter<void>();

  ngOnInit(): void {
    this.cuentas = this.cuentasService.getCuentas();
    this.cuentas.forEach(cuenta => {
      this.cantidadSeleccionada[cuenta.id] = 1;
    });
  }

  addToCarrito(cuenta: Cuenta): void {
    const cantidad = this.cantidadSeleccionada[cuenta.id] || 1;
    this.cuentasService.addToCarrito(cuenta, cantidad);
  }

  removeFromCarrito(id: number): void {
    this.cuentasService.removeFromCarrito(id);
  }

  updateQuantity(id: number, cantidad: number): void {
    this.cuentasService.updateQuantity(id, cantidad);
  }

  getTotalCarrito(): number {
    return this.cuentasService.getTotalCarrito();
  }

  getCantidadCarrito(): number {
    return this.cuentasService.getCantidadCarrito();
  }

  clearCarrito(): void {
    this.cuentasService.clearCarrito();
  }

  procederACompra(): void {
    this.openAuthModal.emit();
  }
}
