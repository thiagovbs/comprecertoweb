import { Routes } from '@angular/router';
import { MercadoComponent } from './mercado.component';

export const MercadoRoutes: Routes = [
  {
    path: '',
    component: MercadoComponent
  },
  {
    path: ':idMercado',
    component: MercadoComponent
  }
];
