import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import { HttpInterceptorModule,
HttpInterceptorService, 
getHttpOptions,
getHttpOptionsIdx,
getHttpOptionsAndIdx,
getHttpHeadersOrInit } from 'ng-http-interceptor';

import 'rxjs/add/operator/do';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {
  title = 'app works!';
 requests = [];
  res = null;
  error = null;

  constructor(
    private http: Http,
    private httpInterceptor: HttpInterceptorService
  ) {
    this.httpInterceptor.request().addInterceptor((data, method) => {
        const headers = getHttpHeadersOrInit(data, method); 
     this.error = null;
     headers.append(
       'Authorization', 
     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSIsImtpZCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJpc3MiOiJodHRwczovL2Rldi5hZGxkZWxpdmVyeS5jb20vaWQiLCJhdWQiOiJodHRwczovL2Rldi5hZGxkZWxpdmVyeS5jb20vaWQvcmVzb3VyY2VzIiwiZXhwIjoxNDk1Njc3OTA5LCJuYmYiOjE0OTU2NDkxMDksImNsaWVudF9pZCI6ImltcGxpY2l0Y2xpZW50Iiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sInN1YiI6IjIiLCJhdXRoX3RpbWUiOjE0OTU2NDkxMDksImlkcCI6Imlkc3J2IiwiYW1yIjpbInBhc3N3b3JkIl19.DENx59NNMlePbrnPXAa5J9xTYBdXn3xbFyE2U9p0GgMV9J2oFklM2AoZIa3w5IqLkm3u7H_7R1PkILGzFF67DjIuEV03-5KcNHb2FWL8-LCYnifre3-JO4rV-CjX0TelZ7VHxQncxhiUpgGkWPlNzhCIhgNWwoTmrbu0SrOxpAFU4SFNl_lbG9CCbabEEKsHByPOZlAyDWFnA92RQrn_GfHp_jJcm8FbeCmjfRAnqn6Nif9Lrv7KR_eISksTcOlvk9uTTPrYlvtrlMVgaWxme2E5LZT1Ta5yVLMPkiGTDuG9PF2_NhUpmLwWpANk1tj7VJpS6jzaUkKd7UYod_PCMg' 
     );
      this.requests.push({
        method: method,
        url: data[0]
      });
      
      return data;
    });
    
    this.httpInterceptor.response().addInterceptor(
      res => res.do(null, e => this.error = e));
  }


  ngOnInit() {
    this.makeRequest();
  }


  makeRequest() {

    this.http.post( 'https://devwebservice.adldelivery.com/api/SSRS/ListItemTypes','').subscribe(r => this.res = r.text());

  }


}
