import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {StockHistoryInterface} from "../../model/stock-history.interface";

@Injectable({
  providedIn: 'root'
})
export class StockHistoryService {

  constructor(private http: HttpClient) { }

  getStockHistory(ticker: string) {
    return this.http.get<StockHistoryInterface[]>(environment.localBackendBaseUrl + environment.stockHistoryUrl + ticker);
  }
}
