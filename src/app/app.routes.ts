import { Routes } from '@angular/router';
import { CardPageComponent } from './card-page/card-page.component';
import { ErrorComponent } from './error/error.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { SearchComponent } from './search/search.component';
import { BodyComponent } from './body/body.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'body',
    pathMatch: 'full',
  },
  {
    path: 'body',
    component: BodyComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  // {
  //   path: 'search/:name',
  //   component: SearchComponent,
  // },

  {
    path: 'film',
    component: CardPageComponent,
  },

  {
    path: 'watchlist',
    component: WatchlistComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];
