import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {StockMeta} from "../../model/stock-meta.class";
import {StockMetaService} from "../../service/meta/stock-meta.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-searchresult',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  private stockMetaService = inject(StockMetaService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public stockMetaData$: Observable<StockMeta>;
  public success: boolean = false;
  public ticker: string = ''

  constructor() {
    this.stockMetaData$ = this.activatedRoute.paramMap.pipe(
      takeUntilDestroyed(),
      switchMap(params => {
        this.ticker = params.get('ticker') || '';
        return this.stockMetaService.getStockByTicker(this.ticker);
      })
    );
  }

  viewStockHistory(stock: StockMeta) {
    this.router.navigate(['/stockhistory/', stock.Symbol]);
  }
}
