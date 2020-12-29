import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import {LocationsArray } from '../classes/root-models'

@Injectable({
  providedIn: 'root'
})
export class RootCoreService {

  constructor(
    private http: HttpClient
  ) { }

  apiHttpGet(URL){
    console.log(URL);
    return this.http.get(URL);
    
  }

  getLocations(URL){
    return this.http.get(URL).pipe(map((res: any) => new LocationsArray(res)))
  }

  reverseGeoCode(URL){
    return this.http.get(URL);
  }
}
