import {Injectable} from '@angular/core';
import {IAggsPreviousClose, IRestClient, restClient} from '@polygon.io/client-js';
import {environment} from "../../../environments/environment.development";
import {from, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PolygonRestService {
  rest: IRestClient;

  constructor(private http: HttpClient) {
    const res = this.http.get('http://localhost:3000/api/auth/google/login');
    console.log(res);
    this.rest = restClient(environment.polygonApiKey);
  }

  getPreviousClose(ticker: string): Observable<IAggsPreviousClose> {
    return from(this.rest.stocks.previousClose(ticker));
  }
}
