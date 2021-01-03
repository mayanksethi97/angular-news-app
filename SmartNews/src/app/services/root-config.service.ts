import { Injectable } from '@angular/core';
import { apiEndpoints } from '../classes/root-config';
import { API_KEYS } from '../classes/api-keys';

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
