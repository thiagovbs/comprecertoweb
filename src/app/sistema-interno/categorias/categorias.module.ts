import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from './categorias.component';
import { MatSelectModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CategoriasRoutes } from './categorias.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CategoriasFormComponent } from './categorias-form/categorias-form.component';

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
    MatSelectModule
  ],
  declarations: [CategoriasComponent, CategoriasFormComponent]
})
export class CategoriasModule { }
