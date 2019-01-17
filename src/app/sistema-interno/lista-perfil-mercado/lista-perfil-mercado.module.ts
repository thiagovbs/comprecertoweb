import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPerfilMercadoComponent } from './lista-perfil-mercado.component';
import { RouterModule } from '@angular/router';
import { ListaPerfilMercadoRoutes } from './lista-perfil-mercado.routing';
import { HttpModule } from '@angular/http';
import { MercadoService } from '../../services/mercado.service';
import { PerfilMercadoModule } from '../perfil-mercado/perfil-mercado.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ListaPerfilMercadoRoutes),

    HttpModule,
    PerfilMercadoModule
  ],
  declarations: [ListaPerfilMercadoComponent],
  providers: [
    MercadoService
  ]
})
export class ListaPerfilMercadoModule { }
