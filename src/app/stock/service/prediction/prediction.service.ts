import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private http = inject(HttpClient);

  constructor() { }

  public getPrediction(ticker: string) {
    return this.http.get<number>(environment.localBackendBaseUrl + environment.predictionUrl + ticker);
  }
}
