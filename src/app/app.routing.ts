import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: 'secure',
    component: FullComponent,
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
        path: 'material',
        loadChildren:
          './material-component/material.module#MaterialComponentsModule'
      },
      {
        path: 'starter',
        loadChildren: './starter/starter.module#StarterModule'
      },
      {
        path: 'icons',
        loadChildren: './icons/mat-icon.module#IconsModule'
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  }
];
