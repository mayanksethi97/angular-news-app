import { Injectable } from '@angular/core';
import { API_KEYS } from '../../../classes/api-keys';

@Injectable({
  providedIn: 'root'
})
export class WeatherConfigService {

  constructor() { }

  addApiKey(URL){
    return URL += `&appid=${API_KEYS.openWeather}`;
  }
}
