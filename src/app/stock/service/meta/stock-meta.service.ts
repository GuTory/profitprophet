import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StockMeta} from "../../model/stock-meta.class";
import {environment} from "../../../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StockMetaService {
  private stocks: StockMeta[] = [];

  constructor(private http: HttpClient) {
  }

  public getStocksByPage(): Observable<any[]> {
    return this.http.get<any[]>(environment.localBackendBaseUrl + environment.pageUrl);
  }

  public getNextPage(): Observable<any[]> {
    return this.http.get<any[]>(environment.localBackendBaseUrl + environment.nextPageUrl);
  }

  public getPreviousPage(): Observable<any[]> {
    return this.http.get<any[]>(environment.localBackendBaseUrl + environment.prevPageUrl);
  }

  public getStockByTicker(ticker: string): Observable<StockMeta> {
    return this.http.get<StockMeta>(environment.localBackendBaseUrl + environment.tickerSearchUrl + ticker);
  }
}
