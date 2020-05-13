import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationMenuComponent } from './dashboard/location-menu/location-menu.component';
import { DetailedBoardComponent } from './dashboard/detailed-board/detailed-board.component';
import { DayDetailedBoardComponent } from './dashboard/detailed-board/day-detailed-board/day-detailed-board.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { LoaderComponent } from './loader/loader.component';
import { HttpErrorInterceptor } from './interceptor/http-error.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LocationMenuComponent,
    DetailedBoardComponent,
    DayDetailedBoardComponent,
    ErrorDialogComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
