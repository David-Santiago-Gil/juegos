import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  // Control del menú hamburguesa en móvil
  isMenuOpen: boolean = false;

  // Rutas de navegación
  navLinks = [
    { label: 'INICIO', route: '/inicio' },
    { label: 'NOSOTROS', route: '/nosotros' },
    { label: 'STREAMERS', route: '/strimers' },
    { label: 'TORNEOS Y COMPE', route: '/competitive' },
    { label: 'SERVICIO AL CLIENTE', route: '/servicio' },
    { label: 'TÉRMINOS Y CONDICIONES', route: '/terminos' }
  ];

  /**
   * Alterna el estado del menú móvil
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Cierra el menú móvil (útil al hacer clic en un enlace)
   */
  closeMenu(): void {
    this.isMenuOpen = false;
  }

  /**
   * Placeholder para funcionalidad futura de búsqueda
   */
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('Búsqueda:', input.value);
    // Implementar lógica de búsqueda aquí
  }
}