import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service.html',
  styleUrls: ['./service.css']
})
export class Service {
  formData = {
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: '',
  };

  errors = {
    nombre: '',
    correo: '',
    mensaje: '',
  };

  private isResetting = false;

  validate(): boolean {
    // No validar si estamos reseteando el formulario
    if (this.isResetting) {
      return true;
    }

    this.errors = { nombre: '', correo: '', mensaje: '' };
    let valid = true;

    const email = (this.formData.correo || '').trim();
    const nombre = (this.formData.nombre || '').trim();
    const mensaje = (this.formData.mensaje || '').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      this.errors.correo = 'Señor usuario, por favor escriba su correo.';
      valid = false;
    } else if (!emailRegex.test(email)) {
      this.errors.correo = 'El correo no es válido.';
      valid = false;
    }

    if (!nombre) {
      this.errors.nombre = 'Señor usuario, por favor escriba su nombre.';
      valid = false;
    }

    if (!mensaje) {
      this.errors.mensaje = 'Por favor, escribe tu mensaje.';
      valid = false;
    }

    return valid;
  }

  hasErrors(): boolean {
    return false;
  }

  onSubmit(form?: NgForm) {
    if (!this.validate()) {
      return;
    }

    console.log('Form submitted:', this.formData);

    // Generar y descargar archivo JSON
    this.downloadFormAsJSON();

    // Marcar que estamos reseteando para evitar validaciones
    this.isResetting = true;

    this.formData = { nombre: '', correo: '', telefono: '', mensaje: '' };
    this.errors = { nombre: '', correo: '', mensaje: '' };
    if (form) {
      form.resetForm({ nombre: '', correo: '', telefono: '', mensaje: '' });
    }

    // Permitir validaciones de nuevo después de que se complete el reset
    setTimeout(() => {
      this.isResetting = false;
      this.errors = { nombre: '', correo: '', mensaje: '' };
    }, 0);
  }

  private downloadFormAsJSON(): void {
    // Crear objeto con los datos del formulario
    const jsonData = {
      tipo: 'formulariosServicioAlCliente',
      fecha: new Date().toLocaleString('es-ES'),
      hora: new Date().toLocaleTimeString('es-ES'),
      datos: {
        nombre: this.formData.nombre,
        correo: this.formData.correo,
        telefono: this.formData.telefono,
        mensaje: this.formData.mensaje,
      },
      metadata: {
        navegador: navigator.userAgent,
        idioma: navigator.language,
      }
    };

    // Convertir a JSON string
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Crear blob
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Crear URL temporal
    const url = window.URL.createObjectURL(blob);

    // Crear elemento temporal para descarga
    const link = document.createElement('a');
    link.href = url;
    link.download = `formulario-servicio-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();

    // Limpiar recursos
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
