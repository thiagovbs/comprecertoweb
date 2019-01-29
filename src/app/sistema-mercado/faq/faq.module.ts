import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { RouterModule } from '@angular/router';
import { FaqRoutes } from './faq.routing';
import { MatCardModule, MatToolbarModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FaqService } from '../../services/faq.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FaqRoutes),

    MatCardModule,
    MatToolbarModule,
    SharedModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    HttpModule,
    MatTabsModule
  ],
  declarations: [FaqComponent],
  providers: [
    FaqService
  ]
})
export class FaqModule { }
