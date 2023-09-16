import {Injectable} from '@angular/core';
import {IAggsPreviousClose, IRestClient, restClient} from '@polygon.io/client-js';
import {environment} from "../../../environments/environment.development";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PolygonRestService {
  rest: IRestClient;

  constructor() {
    this.rest = restClient(environment.polygonApiKey);
  }

  getPreviousClose(ticker: string): Observable<IAggsPreviousClose> {
    return from(this.rest.stocks.previousClose(ticker));
  }
}
