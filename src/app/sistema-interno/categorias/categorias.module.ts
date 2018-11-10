import { CategoriaService } from './../../services/categoria.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from './categorias.component';
import { MatSelectModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatToolbarModule, MatCheckboxModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CategoriasRoutes } from './categorias.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriasFormComponent } from './categorias-form/categorias-form.component';
import { HttpModule } from '@angular/http';

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
    HttpModule
  ],
  declarations: [CategoriasComponent, CategoriasFormComponent],
  providers: [
    CategoriaService
  ]
})
export class CategoriasModule { }
