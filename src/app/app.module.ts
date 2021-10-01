import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, POSITION } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WsService } from './services/ws.service';
import { WebService } from './services/web.service';
import { HttpTimeoutInterceptor } from './shared/interceptors/timeout.interceptor';

@NgModule({
  declarations: [
    AppComponent
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
      bgsPosition: POSITION.topCenter,
      bgsColor: '#f04124',
      bgsType: 'ball-spin-clockwise',
      fgsPosition: POSITION.topCenter,
      fgsColor: '#f04124',
      fgsType: 'ball-spin-clockwise'
    }),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
      exclude: []
    }),
  ],
  providers: [
    WsService,
    WebService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTimeoutInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
