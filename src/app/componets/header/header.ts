import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cuentas } from '../../services/cuentas';

interface StoredUser {
  email: string;
  password: string;
  name: string;
  avatar?: string; // base64 o URL
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  private cuentasService = inject(Cuentas);
  
  // Control del menú hamburguesa en móvil
  isMenuOpen: boolean = false;

  // Estado de autenticación
  isAuthenticated: boolean = false;
  username: string | null = null;
  currentEmail: string | null = null;
  currentAvatar: string | null = null;

  // Modal de autenticación y menú perfil
  showAuthModal: boolean = false;
  authMode: 'login' | 'register' = 'login';
  showProfileMenu: boolean = false;

  // Formularios y errores inline (como Service)
  loginForm = {
    email: '',
    password: '',
  };
  loginErrors = {
    email: '',
    password: '',
    general: '',
  };

  registerForm = {
    name: '',
    email: '',
    password: '',
  };
  registerErrors = {
    name: '',
    email: '',
    password: '',
  };

  // Búsqueda
  searchQuery: string = '';

  // Carrito
  carrito = this.cuentasService.getCarrito();

  // Rutas de navegación
  navLinks = [
    { label: 'INICIO', route: '/inicio' },
    { label: 'NOSOTROS', route: '/nosotros' },
    { label: 'STREAMERS', route: '/strimers' },
    { label: 'TORNEOS Y COMPE', route: '/competitive' },
    { label: 'SERVICIO AL CLIENTE', route: '/servicio' },
    { label: 'TÉRMINOS Y CONDICIONES', route: '/terminos' },
    { label: 'VENTA DE CUENTAS', route: '/ventas' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.restoreSession();
    this.addEscapeKeyListener();
  }

  private addEscapeKeyListener(): void {
    if (typeof document === 'undefined') return;
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  // =========================
  // Menú mobile
  // =========================
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  // =========================
  // Búsqueda
  // =========================
  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value || '';
  }

  onSearchSubmit(): void {
    const target = this.findRouteForQuery(this.searchQuery);
    if (target) {
      this.router.navigateByUrl(target);
      this.searchQuery = '';
      this.closeMenu();
    } else if (this.searchQuery.trim()) {
      // sin alertas
    }
  }

  private normalize(text: string): string {
    return (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
  }

  private findRouteForQuery(query: string): string | null {
    const q = this.normalize(query.trim());
    if (!q) return null;

    const dictionary: Record<string, string> = {
      'inicio': '/inicio', 'home': '/inicio', 'start': '/inicio',
      'nosotros': '/nosotros', 'about': '/nosotros', 'equipo': '/nosotros',
      'strimers': '/strimers', 'streamers': '/strimers', 'streamer': '/strimers', 'creadores': '/strimers',
      'competitive': '/competitive', 'competitivo': '/competitive', 'torneos': '/competitive', 'compe': '/competitive',
      'servicio': '/servicio', 'service': '/servicio', 'soporte': '/servicio', 'ayuda': '/servicio',
      'terminos': '/terminos', 'terminos y condiciones': '/terminos', 'términos': '/terminos', 'terms': '/terminos'
    };

    if (dictionary[q]) return dictionary[q];

    for (const key of Object.keys(dictionary)) {
      if (key.includes(q) || q.includes(key)) {
        return dictionary[key];
      }
    }
    return null;
  }

  // =========================
  // Autenticación (localStorage)
  // =========================
  openAuth(): void {
    this.showAuthModal = true;
    this.authMode = 'login';
    this.loginErrors = { email: '', password: '', general: '' };
    this.registerErrors = { name: '', email: '', password: '' };
  }

  closeAuth(): void {
    this.showAuthModal = false;
  }

  switchAuthMode(mode: 'login' | 'register'): void {
    this.authMode = mode;
    this.loginErrors = { email: '', password: '', general: '' };
    this.registerErrors = { name: '', email: '', password: '' };
  }

  private getUsersStore(): Record<string, StoredUser> {
    try {
      if (typeof localStorage === 'undefined') return {};
      return JSON.parse(localStorage.getItem('auth.users') || '{}');
    } catch {
      return {};
    }
  }

  private setUsersStore(store: Record<string, StoredUser>): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('auth.users', JSON.stringify(store));
  }

  private setCurrentUser(email: string): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('auth.current', email);
  }

  private getCurrentUser(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem('auth.current');
  }

  register(): void {
    this.registerErrors = { name: '', email: '', password: '' };

    const name = (this.registerForm.name || '').trim();
    const email = (this.registerForm.email || '').trim().toLowerCase();
    const password = this.registerForm.password || '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
      this.registerErrors.name = 'Señor usuario, por favor escriba su nombre.';
    }
    if (!email) {
      this.registerErrors.email = 'Señor usuario, por favor escriba su correo.';
    } else if (!emailRegex.test(email)) {
      this.registerErrors.email = 'El correo no es válido.';
    }
    if (!password || password.length < 6) {
      this.registerErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (this.registerErrors.name || this.registerErrors.email || this.registerErrors.password) {
      return;
    }

    const users = this.getUsersStore();
    if (users[email]) {
      this.registerErrors.email = 'Este correo ya existe.';
      return;
    }

    users[email] = { email, password, name };
    this.setUsersStore(users);
    this.setCurrentUser(email);

    this.isAuthenticated = true;
    this.username = name;
    this.currentEmail = email;
    this.currentAvatar = users[email].avatar || null;

    this.registerForm = { name: '', email: '', password: '' };
    this.closeAuth();
  }

  login(): void {
    this.loginErrors = { email: '', password: '', general: '' };

    const email = (this.loginForm.email || '').trim().toLowerCase();
    const password = this.loginForm.password || '';

    if (!email) {
      this.loginErrors.email = 'Por favor, ingresa tu correo.';
    }
    if (!password) {
      this.loginErrors.password = 'Por favor, ingresa tu contraseña.';
    }

    if (this.loginErrors.email || this.loginErrors.password) {
      return;
    }

    const users = this.getUsersStore();
    const user = users[email];
    if (!user || user.password !== password) {
      this.loginErrors.general = 'Correo o contraseña incorrectos.';
      return;
    }

    this.setCurrentUser(email);
    this.isAuthenticated = true;
    this.username = user.name || email.split('@')[0];
    this.currentEmail = email;
    this.currentAvatar = user.avatar || null;

    this.loginForm.password = '';
    this.closeAuth();
  }

  logout(): void {
    this.isAuthenticated = false;
    this.username = null;
    this.currentEmail = null;
    this.currentAvatar = null;
    localStorage.removeItem('auth.current');
    this.showProfileMenu = false;
  }

  changeAccount(): void {
    this.openAuth();
    this.switchAuthMode('login');
    this.showProfileMenu = false;
  }

  // =========================
  // Avatar: carga desde PC, redimensiona y guarda en localStorage
  // =========================
  private updateUserAvatar(email: string, avatarDataUrl: string): void {
    const users = this.getUsersStore();
    if (users[email]) {
      users[email].avatar = avatarDataUrl;
      this.setUsersStore(users);
      this.currentAvatar = avatarDataUrl;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.currentEmail) return;
    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const size = 128;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = '#0f1625';
        ctx.fillRect(0, 0, size, size);
        const ratio = Math.min(size / img.width, size / img.height);
        const w = img.width * ratio;
        const h = img.height * ratio;
        const x = (size - w) / 2;
        const y = (size - h) / 2;
        ctx.drawImage(img, x, y, w, h);
        const dataUrl = canvas.toDataURL('image/png');
        this.updateUserAvatar(this.currentEmail!, dataUrl);
        this.showProfileMenu = false;
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  private restoreSession(): void {
    if (typeof localStorage === 'undefined') {
      this.isAuthenticated = false;
      return;
    }
    const email = this.getCurrentUser();
    if (!email) {
      this.isAuthenticated = false;
      return;
    }
    const users = this.getUsersStore();
    const user = users[email];
    if (user) {
      this.isAuthenticated = true;
      this.username = user.name || email.split('@')[0];
      this.currentEmail = email;
      this.currentAvatar = user.avatar || null;
    } else {
      this.isAuthenticated = false;
      this.username = null;
      this.currentEmail = null;
      this.currentAvatar = null;
      localStorage.removeItem('auth.current');
    }
  }

  // =========================
  // Avatar/Perfil
  // =========================
  get initials(): string {
    if (this.username) {
      const parts = this.username.split(/\s+/).filter(Boolean);
      const first = parts[0]?.[0] || '';
      const second = parts.length > 1 ? parts[1][0] : '';
      return (first + second).toUpperCase() || (this.currentEmail?.[0] || '?').toUpperCase();
    }
    return '?';
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  getCantidadCarrito(): number {
    return this.cuentasService.getCantidadCarrito();
  }
}
