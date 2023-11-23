import {Component, inject} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {StockMeta} from "../../model/stock-meta.class";
import {StockMetaService} from "../../service/meta/stock-meta.service";
import {catchError, ignoreElements, Observable, of, Subject, take, tap} from "rxjs";
import {Router, RouterLink} from '@angular/router';
import {FavoriteService} from 'app/stock/service/favorite/favorite.service';
import {
  ClickStopPropagationDirective
} from "../../../shared/directive/click-stop-propagation/click-stop-propagation.directive";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {CardAttributeDirective} from "../../../shared/directive/card-attribute/card-attribute.directive";
import {CardViewDirective} from "../../../shared/directive/card-view/card-view.directive";
import {PaginationButtonDirective} from "../../../shared/directive/pagination-button/pagination-button.directive";
import {TitleDirective} from "../../../shared/directive/title/title.directive";
import {DocumentPipe} from "../../../shared/pipe/document.pipe";

@Component({
  selector: 'app-stock-meta',
  standalone: true,
  imports: [
    CommonModule,
    ClickStopPropagationDirective,
    RouterLink,
    MatSnackBarModule,
    CardAttributeDirective,
    CardViewDirective,
    PaginationButtonDirective,
    TitleDirective,
    DocumentPipe],
  providers: [FavoriteService],
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent {
  private document = inject(DOCUMENT);
  private stockMetaService = inject(StockMetaService);
  private router = inject(Router);
  public favoriteService = inject(FavoriteService);
  private snackBar = inject(MatSnackBar);

  public stocksList: StockMeta[] = [];
  public stocks$: Observable<any[] | null> = this.stockMetaService.getStocksByPage();
  public error$ = this.stocks$
    .pipe(
      ignoreElements(),
      catchError((error) => of(error)
      )
    );
  public paging: number = 0;

  nextPage() {
    this.stocksList = [];
    this.stockMetaService.getNextPage()
      .pipe(take(1))
      .subscribe((stocks) => {
        stocks.forEach((stock) => {
          this.stocksList.push(new StockMeta(stock));
        });
        this.stocks$ = of(stocks);
        this.paging++;
      });
  }

  prevPage() {
    if (this.paging > 0) {
      this.stocksList = [];
      this.stockMetaService.getPreviousPage()
        .pipe(take(1))
        .subscribe((stocks) => {
          stocks.forEach((stock) => {
            this.stocksList.push(new StockMeta(stock));
          });
          this.stocks$ = of(stocks);
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
      this.openSnackBar(stock.Symbol + " removed from favorites", "Dismiss");
    } else {
      this.addFavorite(stock);
      this.openSnackBar(stock.Symbol + " added to favorites", "Dismiss");
    }
  }

  yahooFinanceLink(stock: StockMeta) {
    this.document.location.href = "https://finance.yahoo.com/quote/" + stock.Symbol;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right',
    });
  }

  identify(index: number, item: StockMeta) {
    return item.Symbol;
  }

  tryToFetchData(){
    this.stocks$ = this.stockMetaService.getStocksByPage();
  }
}
