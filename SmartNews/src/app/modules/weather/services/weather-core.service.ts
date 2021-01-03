import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherCoreService {

  constructor(
    private http: HttpClient
  ) { }

  getWeatherDetails(URL){
    return this.http.get(URL);
  }
}
