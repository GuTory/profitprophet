import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading$: Observable<boolean> = of(false);

  public setIsLoading(isLoading: boolean): void {
    this.isLoading$ = of(isLoading);
  }
}
