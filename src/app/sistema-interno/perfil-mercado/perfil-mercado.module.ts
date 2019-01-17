import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilMercadoComponent } from './perfil-mercado.component';
import { MatTabsModule, MatCardModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,

    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  declarations: [PerfilMercadoComponent],
  exports: [PerfilMercadoComponent]
})
export class PerfilMercadoModule { }
