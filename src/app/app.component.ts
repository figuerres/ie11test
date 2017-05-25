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

    this.httpInterceptor.request().addInterceptor((data, method) => {
        const headers = getHttpHeadersOrInit(data, method); 
console.log(" data ", data);

console.log(" method ", method );
console.log(" headers ", headers);

     this.error = null;
 headers.append("testcode","IE11");

     headers.append(
       'Authorization', 
'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSIsImtpZCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJpc3MiOiJodHRwczovL2Rldi5hZGxkZWxpdmVyeS5jb20vaWQiLCJhdWQiOiJodHRwczovL2Rldi5hZGxkZWxpdmVyeS5jb20vaWQvcmVzb3VyY2VzIiwiZXhwIjoxNDk1NzUxMTg4LCJuYmYiOjE0OTU3MjIzODgsImNsaWVudF9pZCI6ImltcGxpY2l0Y2xpZW50Iiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sInN1YiI6IjIiLCJhdXRoX3RpbWUiOjE0OTU3MjIzODgsImlkcCI6Imlkc3J2IiwiYW1yIjpbInBhc3N3b3JkIl19.MZDrkJKR6WXiE9xpjNHhylERwN3kLUFGkk5GajCsHyab8aBb6ityV8TW-c00vPaE0PpiilvBV5HrAe5ARzO8XGSRm7bV7bJmz5DUzbduwikdCg8BnoBFy-JrrIdzsANBki78SeQLUsdzijUjlA9th3160vfr9CE-slDTyY90FxZTtxnHLjb6qzoPFSnupix05a4VX7ZQA17dWd2hwu-lPhVxPd6LMwuHTNsBHZrdFTXfu9EGTos6rRx7Lsyg5pCzoYgYev0vieROr6ff7Jkn8P6v5DUpERb8d5fH_Yoj_AVEdBaBYUMgc5FUD343KfdfnZqAoBu5lmgLzw1_h05eCg' 
);

// console.log(" headers 2 ", headers );

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
//var head = new Headers( {  "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSIsImtpZCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJpc3MiOiJodHRwczovL2Rldi5hZGxkZWxpdmVyeS5jb20vaWQiLCJhdWQiOiJodHRwczovL2Rldi5hZGxkZWxpdmVyeS5jb20vaWQvcmVzb3VyY2VzIiwiZXhwIjoxNDk1NzQzNzg4LCJuYmYiOjE0OTU3MTQ5ODgsImNsaWVudF9pZCI6ImltcGxpY2l0Y2xpZW50Iiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sInN1YiI6IjIiLCJhdXRoX3RpbWUiOjE0OTU3MTQ5ODcsImlkcCI6Imlkc3J2IiwiYW1yIjpbInBhc3N3b3JkIl19.ZRL6f8Ke1Q-d9WHzTgMoMoO989e6h6odPTvcu9TkwpkiG_1n0GkStT0E1-VnJe-cZ5hQmoTHIZza-btsmc3DHMLb9AseyDX0GtACqOe6v_Slrpap_I9nyt1oHzMsPjisj-2L1I4GR-5rWzkLKlvNqhVowJG7EQU54cbUoYDqp6DtU_kwa5beRtkheoi26zj78InjSG4lcJX2zIBA5NTXauzwMNbuAMW8ml38gdlA875Y5yWEFd9M-oohffAiazTVsnfmsGiegbkpGkXMdWi6iTOPveXz7RlL4in2sKZClCD-kaKkqjiwHNsL1GReM6DcTqMlRa0nN40rxw4tf7q9lA"});

//  var options = new RequestOptions({
//   method: RequestMethod.Post,
//  // headers: head,
//   url: 'https://devwebservice.adldelivery.com/api/SSRS/ListItemTypes',
//   withCredentials:true
// });
 var options = new RequestOptions({
  withCredentials:true
});

    this.http.post( 'https://devwebservice.adldelivery.com/api/SSRS/ListItemTypes','',options).subscribe(r => this.res = r.text());

  }


}
