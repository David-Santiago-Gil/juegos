import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Competitive } from './pages/competitive/competitive';
import { Service } from './pages/service/service';
import { Strimers } from './pages/strimers/strimers';
import { Terms } from './pages/terms/terms';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Home },
  { path: 'nosotros', component: About },
  { path: 'strimers', component: Strimers },
  { path: 'competitive', component: Competitive },
  { path: 'servicio', component: Service },
  { path: 'terminos', component: Terms },
  { path: '**', redirectTo: 'inicio' }
];