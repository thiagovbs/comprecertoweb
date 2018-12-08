import { MercadoService } from './../../services/mercado.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupermercadoComponent } from './supermercado.component';
import { RouterModule } from '@angular/router';
import { SupermercadoRoutes } from './supermercado.routing';
import { MatIconModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatTabsModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CadastroSupermercadoComponent } from './tabs/cadastro-supermercado/cadastro-supermercado.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocalidadeFilialComponent } from './tabs/localidade-filial/localidade-filial.component';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SupermercadoRoutes),

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
  declarations: [SupermercadoComponent, CadastroSupermercadoComponent, LocalidadeFilialComponent]
  , providers: [
    MercadoService
  ]
})
export class SupermercadoModule { }
