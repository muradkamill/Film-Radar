import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { LogoSearchComponent } from "../shared/logo-search/logo-search.component";

@Component({
  selector: 'app-watchlist',
  imports: [HeaderComponent, FooterComponent, LogoSearchComponent],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {

}
