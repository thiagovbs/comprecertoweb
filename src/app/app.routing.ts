import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppGuard } from './app.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/secure/analytics',
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
      },
      {
        path: 'cadastro-subcategorias',
        loadChildren:
          './sistema-interno/subcategorias/subcategorias.module#SubcategoriasModule'
      },
      {
        path: 'cadastro-unidades-medida',
        loadChildren:
          './sistema-interno/unidades-medida/unidades-medida.module#UnidadesMedidaModule'
      },
      {
        path: 'cadastro-mercado',
        loadChildren:
          './sistema-interno/mercado/mercado.module#MercadoModule'
      },
      {
        path: 'perfil-mercado',
        loadChildren:
          './sistema-interno/lista-perfil-mercado/lista-perfil-mercado.module#ListaPerfilMercadoModule'
      }, {
        path: 'cadastro-faq',
        loadChildren:
          './sistema-interno/faq/faq.module#FaqModule'
      }, {
        path: 'perfil-ferramentas',
        loadChildren:
          './sistema-mercado/perfil-ferramentas/perfil-ferramentas.module#PerfilFerramentasModule'
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  }
];
