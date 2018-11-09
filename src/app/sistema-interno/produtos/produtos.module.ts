import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './produtos.component';
import { RouterModule } from '@angular/router';
import { ProdutosRoutes } from './produtos.routing';
import { MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';

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
    MatSelectModule
  ],
  declarations: [ProdutosComponent, ProdutosFormComponent]
})
export class ProdutosModule { }
