import { Routes } from '@angular/router';
import { CadastroEasyBuyComponent } from './cadastro-easy-buy/cadastro-easy-buy.component';
import { InformacoesDePacoteComponent } from './informacoes-de-pacote/informacoes-de-pacote.component';


export const PerfilFerramentasRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cadastro-easy-buy',
        component: CadastroEasyBuyComponent
      },
      {
        path: 'informacoes-de-pacote',
        component: InformacoesDePacoteComponent
      }
    ]
    
  }
];
