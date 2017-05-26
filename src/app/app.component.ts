import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Http, HttpModule,Headers,  RequestOptions,  RequestMethod , Request } from '@angular/http';

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

    this.httpInterceptor.request().addInterceptor((data: any[] , method: string) => {

   console.log(" data start ", data);
   console.log(" data .length ",data.length);
   console.log("  data[getHttpOptionsIdx(method)]  ",  data[getHttpOptionsIdx(method)] );
let idx: number;
let headers: Headers;
let options: RequestOptions;

 idx =  getHttpOptionsIdx(method);

if(!data[idx]){
  console.log("  create options and headers collections ")
   headers = new Headers();
   options = new RequestOptions({  headers:   headers });
   let foo = Array.from(data);
   foo.splice(idx,0,options);
   data = foo;
}else{
  console.log("  options already there, check headers ")
 options = data[idx];
  headers = options.headers;
    // Create and update Headers
     if (!headers) {
        console.log(" !options.headers ");
        headers = new Headers();
        options.headers = headers;
     }
}

    this.error = null;
 //   
 //   options.withCredentials=true;
 //   
 //      data[idx] = options;   
 //  
     headers.append("testcode","IE11");
     headers.append(
       'Authorization', 
'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSIsImtpZCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJpc3MiOiJodHRwczovL2Rldi5hZGxkZWxpdmVyeS5jb20vaWQiLCJhdWQiOiJodHRwczovL2Rldi5hZGxkZWxpdmVyeS5jb20vaWQvcmVzb3VyY2VzIiwiZXhwIjoxNDk1ODMxNTU3LCJuYmYiOjE0OTU4MDI3NTcsImNsaWVudF9pZCI6ImltcGxpY2l0Y2xpZW50Iiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sInN1YiI6IjIiLCJhdXRoX3RpbWUiOjE0OTU4MDI3NTcsImlkcCI6Imlkc3J2IiwiYW1yIjpbInBhc3N3b3JkIl19.GgBQPzS0AXzOL4WlLiS8mLlCuHZLNdyMKqrQT_xY6b86S4a7hkXoRwzOrv9baMc1Q0FQhRsKcGpw5FZyURu7bMzDUTxCoAXY9gSOx-ZwEbiLhHsHijWo6d-HLWxf8bkjW1DyzGfFU7oDxgYEh_M_uI9d_cgC84LhjOHNaQkCFy6k3K6l8P7UollrNBFXl1WOg-phJbS9Vtgyf1aKihHv2K_lLV6LSfClXbHLxl31x_6w3YELj3roYAUqGviSwxZS87Ql4XGrBQyYusnClZ5a0kLN1Ed8rywT-FwrupTIxTrtyh3ly282nKyIPZXR6iqaheo84DhBo8piRWRlP59r0g' 
);

  console.log(" data end ", data);

  console.log(" data .length ",data.length);
     this.requests.push({
       method: method,
       url: data[0]
     }); 
      return data;
    });
    this.httpInterceptor.response().addInterceptor( res => res.do(null, e => this.error = e));
 }

  ngOnInit() {
    this.makeRequest();
  }


  makeRequest() {


    this.http.post( 'https://devwebservice.adldelivery.com/api/SSRS/ListItemTypes',''  ).subscribe(r => this.res = r.text());

  // this.http.get('https://devwebservice.adldelivery.com/api/MapData/FacilityList').subscribe(r => this.res = r.text());



  }


}
