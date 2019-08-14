import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadesMedidaComponent } from './unidades-medida.component';
import { UnidadesMedidaFormComponent } from './unidades-medida-form/unidades-medida-form.component';
import { RouterModule } from '@angular/router';
import { UnidadesmedidaRoutes } from './unidades-medida.routing';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule, MatCheckboxModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UnidadeMedidaService } from '../../services/unidade-medida.service';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UnidadesmedidaRoutes),

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
    NgxLoadingModule.forRoot({})
  ],
  declarations: [UnidadesMedidaComponent, UnidadesMedidaFormComponent],
  providers: [
    UnidadeMedidaService
  ]
})
export class UnidadesMedidaModule { }
