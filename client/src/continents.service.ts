import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SERVER_URL } from './app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ContinentsService implements OnInit{

  constructor(private http: HttpClient  ) { }

  ngOnInit(): void {}

  continentsList() {
    return this.http.get(SERVER_URL + '/continent');
  }

  countries(continent) {
    return this.http.get(SERVER_URL + '/continent/country/' + continent);
  }
}




