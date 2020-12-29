import { Injectable } from '@angular/core';
import { apiEndpoints, API_KEYS } from '../classes/root-config';

@Injectable({
  providedIn: 'root'
})
export class RootConfigService {

  constructor() { }

  getApiEndpoints(){
    return apiEndpoints;
  }

  addGeoApifyKey(URL){
    return URL + `&apiKey=${API_KEYS.geoApify}`;
  }
}
