import { Injectable } from '@angular/core';
import { apiEndpoints } from '../classes/weather-config';
import { WeatherConfigService } from './weather-config.service';
import { WeatherCoreService } from './weather-core.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private weatherConfigService: WeatherConfigService,
    private weatherCoreService: WeatherCoreService
  ) { }

  getWeatherDetails(obj){
    let URL = apiEndpoints.openWeatheronecall;
    URL += `?lat=${obj.lat}&lon=${obj.lng}&units=metric`
    URL = this.weatherConfigService.addApiKey(URL);
    return this.weatherCoreService.getWeatherDetails(URL)
  }
}
