import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-bests',
  imports: [],
  templateUrl: './bests.component.html',
  styleUrl: './bests.component.css',
})
export class BestsComponent implements OnInit {
  api: any[] = [];
  Id?: SafeResourceUrl|null=null;
  key='AIzaSyBt5hlbl-3jGPq4JWi-bS2PBgif5xXnxYE'

  constructor(private httpClient: HttpClient,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    for (let i = 0; i < 4; i++) {
      let x = Math.floor(Math.random() * 60);
      this.httpClient
        .get<any>(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=The+Best+Movies&type=video&maxResults=1000&order=viewCount&regionCode=US&key=${this.key}`
        )
        .subscribe({
          next: (data) =>  {
            if(data.items[x-1] !== data.items[x]){
              this.api.push(data.items[x])
            }
            else{
              return
            }
          }
        });
    }
  }

  onClicked(videoId: string) {
    this.Id = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
    return videoId;
  }
  onClose() {
    this.Id = null;
  }
}
