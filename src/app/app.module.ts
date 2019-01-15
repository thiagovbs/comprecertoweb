import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { SharedModule } from './shared/shared.module';

import { SpinnerComponent } from './shared/spinner.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { FullComponent } from './layouts/full/full.component';
import { AppComponent } from './app.component';

import { AppRoutes } from './app.routing';
import { AppGuard } from './app.guard';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),

    HttpClientModule
  ],
  providers: [
    AppGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
