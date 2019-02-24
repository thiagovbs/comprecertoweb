import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule,
         MatFormFieldModule, 
         MatCardModule, 
         MatButtonModule, 
         MatSelectModule, 
         MatCheckboxModule, 
         MatToolbarModule, 
         MatIconModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MercadoService } from '../../services/mercado.service';
import { HttpModule } from '@angular/http';
import { ProdutosMercadoRoutes } from './produtos-mercado.routing';
import { ProdutosMercadoComponent } from './produtos-mercado.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProdutosMercadoRoutes),
    MatToolbarModule,
    MatButtonModule,
    PerfectScrollbarModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    HttpModule
  ],
  declarations: [ProdutosMercadoComponent],
  providers: [
    MercadoService
  ]
})
export class ProdutosMercadoModule { }
