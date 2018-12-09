import { MercadoService } from '../../services/mercado.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercadoComponent } from './mercado.component';
import { RouterModule } from '@angular/router';
import { MercadoRoutes } from './mercado.routing';
import { MatIconModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatTabsModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CadastroMercadoComponent } from './tabs/cadastro-mercado/cadastro-mercado.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocalidadeFilialComponent } from './tabs/localidade-filial/localidade-filial.component';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { TextMaskModule } from 'angular2-text-mask';

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
    HttpModule
  ],
  declarations: [MercadoComponent, CadastroMercadoComponent, LocalidadeFilialComponent]
  , providers: [
    MercadoService
  ]
})
export class MercadoModule { }
