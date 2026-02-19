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

  validate(): boolean {
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
    return !!(this.errors.nombre || this.errors.correo || this.errors.mensaje);
  }

  onSubmit(form?: NgForm) {
    if (!this.validate()) {
      return;
    }

    console.log('Form submitted:', this.formData);

    this.formData = { nombre: '', correo: '', telefono: '', mensaje: '' };
    if (form) {
      form.resetForm({ nombre: '', correo: '', telefono: '', mensaje: '' });
    }
  }
}
