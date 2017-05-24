import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpInterceptor } from 'ng-http-interceptor'
import { HttpInterceptorModule, HttpInterceptorService } from 'ng-http-interceptor';



import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
   HttpInterceptorModule 
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
