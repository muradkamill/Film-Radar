import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-logo-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './logo-search.component.html',
  styleUrl: './logo-search.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LogoSearchComponent {
  @ViewChild('search') search?: ElementRef<HTMLInputElement>;

  constructor(private httpClient: HttpClient,private route:Router) {}

  @Output() MovieApi = new EventEmitter<any>();

  
  onSearch() {
    if (!this.search?.nativeElement.value) {
      console.log('sehv');
    
    } else {

      this.route.navigate(['/search']);
      // this.search.nativeElement.value=this.search.nativeElement.value.trim();
      let searchArr = this.search.nativeElement.value.replace(' ', '+');

       this.httpClient
        .get(`https://www.omdbapi.com/?t=${searchArr}&apikey=6206dff2`)
        .subscribe({
          next: (data) => 
            this.MovieApi.emit({MovieApi:data,search:this.search}),
          error: (error) => console.log(error),
        });

    }
  }
}

//home da axtaranda response verir ama basqa patha gedende vermir
