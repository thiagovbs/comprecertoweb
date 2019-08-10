import { CategoriaService } from './../../services/categoria.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from './categorias.component';
import { MatSelectModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatToolbarModule, MatCheckboxModule, MatChipsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CategoriasRoutes } from './categorias.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriasFormComponent } from './categorias-form/categorias-form.component';
import { HttpModule } from '@angular/http';
import { UnidadeMedidaService } from '../../services/unidade-medida.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageUtilService } from '../../services/image-util.service';
import { NgxLoadingModule } from 'ngx-loading';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CategoriasRoutes),

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
    MatChipsModule,
    MatIconModule,
    ImageCropperModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [CategoriasComponent, CategoriasFormComponent],
  providers: [
    CategoriaService,
    UnidadeMedidaService,
    ImageUtilService
  ]
})
export class CategoriasModule { }
