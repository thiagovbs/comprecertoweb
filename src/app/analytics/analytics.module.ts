import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { RouterModule } from '@angular/router';
import { AnalyticsRoutes } from './analytics.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AnalyticsRoutes)
  ],
  declarations: [AnalyticsComponent]
})
export class AnalyticsModule { }
