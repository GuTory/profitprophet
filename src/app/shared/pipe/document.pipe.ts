import { Pipe, PipeTransform } from '@angular/core';
import {StockMeta} from "../../stock/model/stock-meta.class";

@Pipe({
  name: 'document',
  standalone: true
})
export class DocumentPipe implements PipeTransform {

  transform(values: any[] | null): StockMeta[] | null {
    if(values === null) {
      return null;
    }
    let stocks: StockMeta[] = [];
    values.forEach((stock) => {
      stocks.push(new StockMeta(stock));
    });
    return stocks;
  }

}
