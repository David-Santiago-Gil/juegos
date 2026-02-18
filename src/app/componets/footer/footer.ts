import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  // Redes sociales con sus enlaces
  socialLinks = [
    { 
      icon: 'bi-facebook', 
      url: 'https://facebook.com/callofdutymobile',
      label: 'Facebook' 
    },
    { 
      icon: 'bi-twitter-x', 
      url: 'https://twitter.com/callofdutymobile',
      label: 'Twitter' 
    },
    { 
      icon: 'bi-tiktok', 
      url: 'https://tiktok.com/@callofdutymobile',
      label: 'TikTok' 
    },
    { 
      icon: 'bi-instagram', 
      url: 'https://instagram.com/callofdutymobile',
      label: 'Instagram' 
    }
  ];

  // Enlaces de navegación del footer
  footerNavLinks = [
    { label: 'STREAMERS', route: '/strimers' },
    { label: 'SERVICIO AL CLIENTE', route: '/servicio' },
    { label: 'TÉRMINOS Y CONDICIONES', route: '/terminos' }
  ];

  /**
   * Año actual para copyright
   */
  currentYear: number = new Date().getFullYear();

  /**
   * Abre enlace de red social en nueva pestaña
   */
  openSocialLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}