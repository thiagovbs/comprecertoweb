import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppGuard } from './app.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/secure/interno/categorias',
    pathMatch: 'full',
    canActivate: [AppGuard]
  },
  {
    path: 'secure',
    component: FullComponent,
    canActivate: [AppGuard],
    children: [
      {
        path: '',
        redirectTo: '/analytics',
        pathMatch: 'full'
      },
      {
        path: 'analytics',
        loadChildren: './analytics/analytics.module#AnalyticsModule'
      },
      {
        path: 'cadastro-produtos',
        loadChildren:
          './sistema-interno/produtos/produtos.module#ProdutosModule'
      },
      {
        path: 'cadastro-categorias',
        loadChildren:
          './sistema-interno/categorias/categorias.module#CategoriasModule'
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  }
];
