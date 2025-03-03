import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { LogoSearchComponent } from '../shared/logo-search/logo-search.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [HeaderComponent, LogoSearchComponent, FooterComponent,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  MovieApi: any;
  search?: string;
  response?: boolean;
  receiveData(event: { MovieApi: any; search: any }) {
    this.search = event.search?.nativeElement.value.trim();
    this.response = event.MovieApi?.Response;
    console.log(this.response);
    console.log(this.search);
    //response duz isleyir ama ola bilerki    response?: boolean; da problem olsun
    
  }


}
