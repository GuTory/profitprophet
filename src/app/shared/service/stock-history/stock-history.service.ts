import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {ChartDataInterface} from "../../model/chartdata.interface";

@Injectable({
  providedIn: 'root'
})
export class StockHistoryService {

  constructor(private http: HttpClient) { }

  getStockHistory(ticker: string) {
    return this.http.get<ChartDataInterface[]>(environment.localBackendUrl + "stock/" + ticker);
  }
}
