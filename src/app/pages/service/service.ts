import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    telefono: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
    // Aquí puedes agregar la lógica para enviar el formulario
    alert('Mensaje enviado. Nos pondremos en contacto contigo pronto.');
    this.formData = { nombre: '', correo: '', telefono: '' };
  }
}
