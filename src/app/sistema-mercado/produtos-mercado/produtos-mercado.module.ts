import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import {
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatDatepickerModule
} from '@angular/material';


import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MercadoService } from '../../services/mercado.service';
import { HttpModule } from '@angular/http';
import { ProdutosMercadoRoutes } from './produtos-mercado.routing';
import { ProdutosMercadoComponent } from './produtos-mercado.component';
import { ProdutosMercadoFormComponent } from './produtos-mercado-form/produtos-mercado-form.component';
import { ProdutoService } from '../../services/produto.service';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { UnidadeMedidaService } from '../../services/unidade-medida.service';
import { CategoriaService } from '../../services/categoria.service';
import { ImageUtilService } from '../../services/image-util.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MercadoProdutoService } from '../../services/mercado-produto.service';
import { DateFormatPipe } from './dateFormat.pipe';
import { EstadoService } from '../../services/estado.service';
import { CidadeService } from '../../services/cidade.service';
import { BairroService } from '../../services/bairro.service';
import { MoedaPadraoPipe } from '../../util/moeda-padrao.pipe';
import { NgxCurrencyModule } from "ngx-currency";
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(ptBr)

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProdutosMercadoRoutes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    HttpModule,
    ImageCropperModule,
    MatDatepickerModule,
    NgxCurrencyModule
  ],
  declarations: [ProdutosMercadoComponent, ProdutosMercadoFormComponent, DateFormatPipe, MoedaPadraoPipe],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-PT' },
    MercadoService,
    ProdutoService,
    SubcategoriaService,
    UnidadeMedidaService,
    CategoriaService,
    ImageUtilService,
    MercadoProdutoService,
    DateFormatPipe,
    EstadoService,
    CidadeService,
    BairroService,
    CurrencyPipe
  ]
})
export class ProdutosMercadoModule { }
