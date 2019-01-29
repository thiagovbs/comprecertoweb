import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilFerramentasComponent } from './perfil-ferramentas.component';
import { MatToolbarModule, MatSidenavModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfilFerramentasRoutes } from './perfil-ferramentas.routing';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { InformacaoPacoteComponent } from './tabs/informacao-pacote/informacao-pacote.component';
import { MercadoService } from '../../services/mercado.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PerfilFerramentasRoutes),

    MatToolbarModule,
    MatSidenavModule,
    PerfectScrollbarModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    HttpModule
  ],
  declarations: [PerfilFerramentasComponent, InformacaoPacoteComponent],
  providers: [
    MercadoService
  ]
})
export class PerfilFerramentasModule { }
