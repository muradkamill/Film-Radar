import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent implements OnInit{
  name?: any;
  MovieApi: any;
  search?: string;
  response?: string;
  data?: any;
  InternetMovieDatabase: any;
  rottenTomatoesRating: any;
  Metacritic: any;
  Id?: SafeResourceUrl|null=null;
  api: any[] = [];
  key='AIzaSyBGlvykkr32Ewb6OogNtckDeejIR21cbrU'


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private service:ServiceService
  ) {
    activatedRoute.paramMap.subscribe({
      next: (data) => (this.name = data.get('name')),
    });






    httpClient
      .get<any>(`https://www.omdbapi.com/?t=${this.name}&apikey=6206dff2`)
      .subscribe({
        next: (data) => {
          this.data = data;
          this.response = data.Response;
          this.search = this.name;
          this.InternetMovieDatabase =
            data.Ratings.find(
              (r: { Source: string; Value: string }) =>
                r.Source === 'Internet Movie Database'
            )?.Value || 'NOT EXIST!';
          this.rottenTomatoesRating =
            data.Ratings.find(
              (r: { Source: string; Value: string }) =>
                r.Source === 'Rotten Tomatoes'
            )?.Value || 'NOT EXIST!';
          this.Metacritic =
            data.Ratings.find(
              (r: { Source: string; Value: string }) =>
                r.Source === 'Metacritic'
            )?.Value || 'NOT EXIST!';
        },
      });
  }
  ngOnInit(): void {

      this.httpClient
        .get<any>(
`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.name}&type=video&maxResults=20&order=viewCount&regionCode=US&key=${this.key}`).subscribe({
          next: (data) =>{
            for (let i = 0; i < 4; i++) {
              let x = Math.floor(Math.random() * 15);
            if(data.items[x-1]!==data.items[x]){
             this.api.push(data.items[x])
            }
          }
          }
        });
    
  }


  onClicked(videoId: string) {
    this.Id = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
    return videoId;
  }
  onClose() {
    this.Id = null;
  }
  onWatchClicked(){
    this.service.onWatch(this.data)
  }

}
