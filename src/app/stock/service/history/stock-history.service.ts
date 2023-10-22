import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {StockHistoryInterface} from "../../model/stock-history.interface";
import {StockMeta} from "../../model/stock-meta.class";

@Injectable({
  providedIn: 'root'
})
export class StockHistoryService {
  private http = inject(HttpClient);

  getStockHistory(ticker: string) {
    return this.http.get<StockHistoryInterface[]>(environment.localBackendBaseUrl + environment.stockHistoryUrl + ticker);
  }
}
