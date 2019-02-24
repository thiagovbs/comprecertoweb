import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilMercadoComponent } from './perfil-mercado.component';
import { MatTabsModule, MatCardModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,

    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [PerfilMercadoComponent],
  exports: [PerfilMercadoComponent]
})
export class PerfilMercadoModule { }
