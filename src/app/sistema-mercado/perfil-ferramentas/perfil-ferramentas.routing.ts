import { Routes } from '@angular/router';
import { CadastroEasyBuyComponent } from './cadastro-easy-buy/cadastro-easy-buy.component';


export const PerfilFerramentasRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cadastro-easy-buy',
        component: CadastroEasyBuyComponent
      }
    ]
    
  }
];
