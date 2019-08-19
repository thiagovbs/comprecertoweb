import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EasyBuyComponent } from './easy-buy.component';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatSelectModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatDatepickerModule, MatListModule, MatGridListModule, MatTableModule, MatPaginator, MatPaginatorModule, MatSortModule, MatDialog, MatDialogModule, MatRadioModule, MatChipsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { EasyBuyRoutes } from './easy-buy.routing';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxCurrencyModule } from 'ngx-currency';
import { SharedPipeModule } from '../../util/shared.pipe.module';
import { EasyBuyDialog } from './modal/easy-buy-dialog';
import { NgxLoadingModule } from 'ngx-loading';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EasyBuyRoutes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule,
    FormsModule,  
    MatChipsModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    HttpModule,
    ImageCropperModule,
    MatDatepickerModule,
    NgxCurrencyModule,
    SharedPipeModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [EasyBuyComponent,EasyBuyDialog]
  ,
    entryComponents: [
      EasyBuyDialog
    ] 
})

export class EasyBuyModule { }
