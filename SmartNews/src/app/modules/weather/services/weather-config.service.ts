import { Injectable } from '@angular/core';
import { API_KEYS } from '../classes/weather-config';

@Injectable({
  providedIn: 'root'
})
export class WeatherConfigService {

  constructor() { }

  addApiKey(URL){
    return URL += `&appid=${API_KEYS.openWeather}`;
  }
}
