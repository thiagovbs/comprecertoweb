import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule,
         MatFormFieldModule, 
         MatCardModule, 
         MatButtonModule, 
         MatSelectModule, 
         MatCheckboxModule, 
         MatToolbarModule, 
         MatIconModule, 
         MatDatepickerModule} from '@angular/material';


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
    MatDatepickerModule
  ],
  declarations: [ProdutosMercadoComponent, ProdutosMercadoFormComponent],
  providers: [
    MercadoService,
    ProdutoService,
    SubcategoriaService,
    UnidadeMedidaService,
    CategoriaService,
    ImageUtilService,
    MercadoProdutoService
  ]
})
export class ProdutosMercadoModule { }
