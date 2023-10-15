import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./stock/component/card/stock-card.component').then(m => m.StockCardComponent),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.routes),
    //canActivate: [authGuard],
  },
  {
    path: 'stockhistory/:ticker',
    loadComponent: () => import('./stock/component/history/stock-history.component').then(m => m.StockHistoryComponent),
  },
  {
    path: 'searchticker/:ticker',
    loadComponent: () => import('./stock/component/searchresult/search-result.component').then(m => m.SearchResultComponent),
  }
];
