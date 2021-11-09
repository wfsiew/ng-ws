import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, POSITION } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MainIhpComponent } from './main-ihp/main-ihp.component';

import { WebService } from './services/web.service';
import { MainService } from './main/services/main.service';
import { MainIhpService } from './main-ihp/services/main-ihp.service';
import { HttpTimeoutInterceptor } from './shared/interceptors/timeout.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MainIhpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxUiLoaderModule.forRoot({
      bgsPosition: POSITION.centerCenter,
      bgsColor: '#f04124',
      bgsType: 'ball-spin',
      fgsPosition: POSITION.centerCenter,
      fgsColor: '#f04124',
      fgsType: 'ball-spin',
      pbColor: '#f04124',
      hasProgressBar: true,
      textPosition: POSITION.centerCenter
    }),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
      exclude: []
    }),
  ],
  providers: [
    WebService,
    MainService,
    MainIhpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTimeoutInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
