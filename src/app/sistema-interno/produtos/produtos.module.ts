import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './produtos.component';
import { RouterModule } from '@angular/router';
import { ProdutosRoutes } from './produtos.routing';
import { MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatPaginator, MatPaginatorModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { HttpModule } from '@angular/http';
import { ProdutoService } from '../../services/produto.service';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { UnidadeMedidaService } from '../../services/unidade-medida.service';
import { CategoriaService } from '../../services/categoria.service';
import { ImageUtilService } from '../../services/image-util.service';
import { ImageCropperModule } from 'ngx-image-cropper';
//import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProdutosRoutes),
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
    MatPaginatorModule,
    MatToolbarModule,
    MatCheckboxModule,
    HttpModule,
    ImageCropperModule,
    //NgxLoadingModule.forRoot({})
  ],
  declarations: [ProdutosComponent, ProdutosFormComponent],
  providers: [
    ProdutoService,
    SubcategoriaService,
    UnidadeMedidaService,
    CategoriaService,
    ImageUtilService
  ]
})
export class ProdutosModule { }
