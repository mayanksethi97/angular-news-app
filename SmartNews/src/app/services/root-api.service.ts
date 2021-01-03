import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RootConfigService } from './root-config.service';
import { RootCoreService } from './root-core.service';

@Injectable({
  providedIn: 'root'
})
export class RootApiService {

  constructor(
    private rootConfigService: RootConfigService,
    private http: HttpClient,
    private rootCoreService: RootCoreService
  ) { }

  getLocationsData(searchInput){
    let URL = this.rootConfigService.getApiEndpoints().geoApify.autoComplete;
    URL += `?text=${searchInput}`;
    URL = this.rootConfigService.addGeoApifyKey(URL);
    return this.rootCoreService.getLocations(URL);
  }

  reverseGeoCode(latLng){
    let URL = this.rootConfigService.getApiEndpoints().geoApify.reverseGeoCoding;
    URL += `?lat=${latLng.lat}&lon=${latLng.lng}`;
    URL = this.rootConfigService.addGeoApifyKey(URL);
    return this.rootCoreService.reverseGeoCode(URL)
  }
}
