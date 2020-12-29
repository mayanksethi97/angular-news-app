import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RootApiService } from '../../services/root-api.service';
import { RootContextService } from '../../services/root-context.service';
@Component({
  selector: 'app-app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.scss']
})
export class AppLandingComponent implements OnInit {

  currentUserLocation: any
  hasUserLocation = false;
  locationsData: any[] = [];
  subs: Subscription[] = [];

  constructor(
    private router: Router,
    private rootApiService: RootApiService,
    private activatedRoute: ActivatedRoute,
    private rootContextService: RootContextService
  ) { 
    this.rootContextService.initContext('dashboard');
  }

  ngOnInit(): void {
    
    this.getUserLocation();
    if(this.hasUserLocation){
      this.rootContextService.updateCurrentContext({currentUserLocation: this.currentUserLocation})
    }

    this.subs.push(this.rootContextService.Context$.subscribe((res: any) => {
      console.log(res);
    }))
  }

  getLocations(searchInput){
    console.log(searchInput)
    this.rootApiService.getLocationsData(searchInput).subscribe((locations: any) => {
      this.locationsData = locations.locationsArray;
      console.log(this.locationsData);
    })
  }

  getUserLocation(){
    let gotUserLocation = false;
    if(localStorage.getItem('userLocation')){
      const location = localStorage.getItem('userLocation');
      this.currentUserLocation = JSON.parse(location);
      gotUserLocation = true;
    }
    else{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timeStamp: position.timestamp
          }
          this.currentUserLocation = loc
          localStorage.setItem('userLocation', JSON.stringify(loc))
          gotUserLocation = true;
        });
    } else {
       console.log("No support for geolocation")
    }
    }

    console.log(this.currentUserLocation)
    if(gotUserLocation){
      this.rootApiService.reverseGeoCode({lat: this.currentUserLocation.lat, lng: this.currentUserLocation.lng}).subscribe((res: any) => {
        console.log(res);
        const userLocation = {
          lat: res.features[0].properties.lat,
          lng: res.features[0].properties.lon,
          state: res.features[0].properties.state,
          country: res.features[0].properties.country
        }
  
        this.rootContextService.updateCurrentContext({currentUserLocation: userLocation});
        this.hasUserLocation = true;
      })

    }
  }

  selectUserLocation(location){
    this.currentUserLocation = {
      lat: location.lat,
      lng: location.lon,
      state: location.state,
      country: location.country
    }
    this.rootContextService.updateCurrentContext({currentUserLocation: this.currentUserLocation})
  }

  ngOnDestroy(){
    this.subs.forEach(s => {
      if(s){
        s.unsubscribe();
      }
    });
  }

}
