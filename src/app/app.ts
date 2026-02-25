import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './componets/header/header';
import { FooterComponent } from './componets/footer/footer';
import { Sale } from './pages/sale/sale';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  abrirModalLogin(): void {
    if (this.headerComponent) {
      this.headerComponent.openAuth();
    }
  }

  onRouteActivate(component: any): void {
    if (component instanceof Sale) {
      component.openAuthModal.subscribe(() => {
        this.abrirModalLogin();
      });
    }
  }
}