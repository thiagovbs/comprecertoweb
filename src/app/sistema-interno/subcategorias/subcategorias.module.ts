import { SubcategoriasRoutes } from './subcategorias.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcategoriasComponent } from './subcategorias.component';
import { SubcategoriasFormComponent } from './subcategorias-form/subcategorias-form.component';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule, MatCheckboxModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { CategoriaService } from '../../services/categoria.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SubcategoriasRoutes),

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
    HttpModule
  ],
  declarations: [SubcategoriasComponent, SubcategoriasFormComponent],
  providers: [
    SubcategoriaService,
    CategoriaService
  ]
})
export class SubcategoriasModule { }
