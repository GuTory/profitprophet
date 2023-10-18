import {Component, Inject} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {StockMeta} from "../../model/stock-meta.class";
import {StockMetaService} from "../../service/meta/stock-meta.service";
import {take} from "rxjs";
import {Router, RouterLink} from '@angular/router';
import {FavoriteService} from 'app/stock/service/favorite/favorite.service';
import {
  ClickStopPropagationDirective
} from "../../../shared/directive/click-stop-propagation/click-stop-propagation.directive";

@Component({
  selector: 'app-stock-meta',
  standalone: true,
  imports: [CommonModule, ClickStopPropagationDirective, RouterLink],
  providers: [FavoriteService],
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent {
  public stocks: StockMeta[] = [];
  public paging: number = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private stockMetaService: StockMetaService,
    private router: Router,
    public favoriteService: FavoriteService) {
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
    if (this.paging > 0) {
      this.stocks = [];
      this.stockMetaService.getPreviousPage()
        .pipe(take(1))
        .subscribe((stocks) => {
          stocks.forEach((stock) => {
            this.stocks.push(new StockMeta(stock));
          });
          this.paging--;
        });
    }
  }

  viewStockHistory(stock: StockMeta) {
    this.router.navigate(['/stockhistory/', stock.Symbol]);
  }

  addFavorite(stock: StockMeta) {
    this.favoriteService.addFavorite(stock.Symbol);
  }

  removeFavorite(stock: StockMeta) {
    this.favoriteService.removeFavorite(stock.Symbol);
  }

  isFavorite(ticker: string): boolean {
    return this.favoriteService.authenticatedUser!!.favoriteStocks.includes(ticker)
  }

  starSource(ticker: string): string {
    if (this.isFavorite(ticker)) {
      return "assets/icons/star_filled.png";
    } else return "assets/icons/star_empty.png";
  }

  togglefavorite(stock: StockMeta) {
    if (this.favoriteService.authenticatedUser?.favoriteStocks.includes(stock.Symbol)) {
      this.removeFavorite(stock);
    } else {
      this.addFavorite(stock);
    }
  }

  yahooFinanceLink(stock: StockMeta) {
    this.document.location.href = "https://finance.yahoo.com/quote/" + stock.Symbol;
  }
}
