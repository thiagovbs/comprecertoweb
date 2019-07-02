import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import {
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatChipsModule,
  MatSidenavModule,
  MatTabsModule,
  MatSlideToggleModule
} from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfilFerramentasRoutes } from './perfil-ferramentas.routing';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MercadoService } from '../../services/mercado.service';
import { HttpModule } from '@angular/http';
import { CadastroEasyBuyComponent } from './cadastro-easy-buy/cadastro-easy-buy.component';
import { NgxCurrencyModule } from "ngx-currency";
import { SharedPipeModule } from '../../util/shared.pipe.module';
import ptBr from '@angular/common/locales/pt';
import { TextMaskModule } from 'angular2-text-mask';
registerLocaleData(ptBr)

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
    MatSlideToggleModule,
    NgxCurrencyModule,
    MatChipsModule,
    ReactiveFormsModule,
    SharedPipeModule,
    TextMaskModule
  ],
  declarations: [CadastroEasyBuyComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-PT' },
    MercadoService
  ]
})
export class PerfilFerramentaModule {}
