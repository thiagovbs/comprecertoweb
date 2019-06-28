import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatTabsModule
} from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfilFerramentasRoutes } from './perfil-ferramentas.routing';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MercadoService } from '../../services/mercado.service';
import { HttpModule } from '@angular/http';
import { CadastroEasyBuyComponent } from './cadastro-easy-buy/cadastro-easy-buy.component';
import { NgxCurrencyModule } from "ngx-currency";
import { MoedaPadraoPipe } from '../../util/moeda-padrao.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PerfilFerramentasRoutes),
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    PerfectScrollbarModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    HttpModule,
    NgxCurrencyModule
  ],
  declarations: [CadastroEasyBuyComponent, MoedaPadraoPipe],
  providers: [
    MercadoService
  ]
})
export class PerfilFerramentaModule {}
