import {Injectable} from '@angular/core';
import {IAggsPreviousClose, IRestClient, restClient} from '@polygon.io/client-js';
import {environment} from "../../../../environments/environment.development";
import {from, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PolygonRestService {
  rest: IRestClient = restClient(environment.polygonApiKey)

  getPreviousClose(ticker: string): Observable<IAggsPreviousClose> {
    return from(this.rest.stocks.previousClose(ticker));
  }
}
