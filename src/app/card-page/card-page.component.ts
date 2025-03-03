import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from "../shared/header/header.component";
import { LogoSearchComponent } from "../shared/logo-search/logo-search.component";
import { InfoComponent } from "./info/info.component";
import { BestsComponent } from "../main-components/bests/bests.component";
import { YtVideosComponent } from "./yt-videos/yt-videos.component";

@Component({
  selector: 'app-card-page',
  imports: [FooterComponent, HeaderComponent, LogoSearchComponent, InfoComponent, YtVideosComponent],
  templateUrl: './card-page.component.html',
  styleUrl: './card-page.component.css'
})
export class CardPageComponent {

}
