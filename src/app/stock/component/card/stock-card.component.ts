import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StockMeta} from "../../model/stock-card.class";
import {StockMetaService} from "../../service/card/stock-meta.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {take} from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent {
  public stocks: StockMeta[] = [];
  public paging: number = 0;

  constructor(private stockMetaService: StockMetaService, private router: Router) {
    this.stockMetaService.getStocksByPage()
      .pipe(take(1))
      .subscribe((stocks) => {
        stocks.forEach((stock) => {
          this.stocks.push(new StockMeta(stock));
        });
      });
  }

  nextPage() {
    this.stocks = [];
    this.stockMetaService.getNextPage()
      .pipe(take(1))
      .subscribe((stocks) => {
        stocks.forEach((stock) => {
          this.stocks.push(new StockMeta(stock));
        });
        this.paging++;
      });
  }

  prevPage() {
    if(this.paging > 0) {
      this.stocks = [];
      this.stockMetaService.getPreviousPage()
        .pipe(take(1))
        .subscribe((stocks) => {
          stocks.forEach((stock) => {
            this.stocks.push(new StockMeta(stock));
          });
          this.paging--;
        });
    } else {
      console.log("No previous page");
    }
  }

  viewStockHistory(ticker: StockMeta) {
    this.router.navigate(['/stockhistory/', ticker.Symbol]);
  }
}
