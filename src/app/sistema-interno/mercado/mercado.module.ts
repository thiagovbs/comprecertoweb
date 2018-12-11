import { MercadoService } from '../../services/mercado.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercadoComponent } from './mercado.component';
import { RouterModule } from '@angular/router';
import { MercadoRoutes } from './mercado.routing';
import { MatIconModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatTabsModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CadastroMercadoComponent } from './tabs/cadastro-mercado/cadastro-mercado.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocalidadeFilialComponent } from './tabs/localidade-filial/localidade-filial.component';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { TextMaskModule } from 'angular2-text-mask';
import { PacoteServicosComponent } from './tabs/pacote-servicos/pacote-servicos.component';
import { ServicoService } from '../../services/servico.service';
import { PreVisualizacaoComponent } from './tabs/pre-visualizacao/pre-visualizacao.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MercadoRoutes),

    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    PerfectScrollbarModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgxViacepModule,
    TextMaskModule,
    MatChipsModule,
    MatTabsModule,
    HttpModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
  declarations: [MercadoComponent, CadastroMercadoComponent, LocalidadeFilialComponent, PacoteServicosComponent, PreVisualizacaoComponent]
  , providers: [
    MercadoService,
    ServicoService
  ]
})
export class MercadoModule { }
