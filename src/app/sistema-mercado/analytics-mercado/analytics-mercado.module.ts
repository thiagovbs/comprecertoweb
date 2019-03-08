import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule, MatSidenavModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MercadoService } from '../../services/mercado.service';
import { HttpModule } from '@angular/http';
import { AnalyticsMercadoRoutes } from './analytics-mercado.routing';
import { AnalyticsMercadoComponent } from './analytics-mercado.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AnalyticsMercadoRoutes),
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
  declarations: [AnalyticsMercadoComponent],
  providers: [
    MercadoService
  ]
})
export class AnalyticsMercadoModule { }
