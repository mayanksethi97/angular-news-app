import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { MapboxStyleDefinition, MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
import { WeatherService } from '../../services/weather.service';
import { RootApiService } from '../../../../services/root-api.service';
interface IDisplayWidget{
  date: Date,
  geoLocation: any,
  weather: any,
  icon: any
}
@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.scss']
})


export class WeatherHomeComponent implements OnInit {

  subs: Subscription[] = [];
  currentUserLocation;
  map: mapboxgl;
  currentLocationMarker;
  onDragEnd;
  displayWidgetObj: IDisplayWidget;
  showWeatherWidget = false;

  constructor(
    private weatherService: WeatherService,
    private rootApiService: RootApiService
  ) { }

  ngOnInit(): void {
    this.currentUserLocation = JSON.parse(localStorage.getItem('userLocation'));
    this.getWeatherDetails({lat: this.currentUserLocation.lat, lng: this.currentUserLocation.lng});
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2V0aGltYXlhbms5NyIsImEiOiJja2kwZGtvMXowb3drMnJwZTloenY2NmwyIn0.6MJthD64xjhdNk8u3Ah3lg';
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });

    this.onDragEnd = () => {
      var latLng = this.currentLocationMarker.getLngLat();
      this.getWeatherDetails(latLng);

    }
    
    this.map.on('load', () => {
      this.flyAndAddMarker([this.currentUserLocation.lng, this.currentUserLocation.lat])
      this.addSwithcerControl();
      this.currentLocationMarker.on('dragend', this.onDragEnd);
    })
  }

  flyAndAddMarker(center){
    this.map.flyTo({
      center: center,
      essential: true,
      zoom: 17
    })
    this.currentLocationMarker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat(center)
      .addTo(this.map);
  }

  addSwithcerControl(){
    const styles: MapboxStyleDefinition[] = [
      {
          title: "Dark",
          uri:"mapbox://styles/mapbox/dark-v9"
      },
      {
          title: "Light",
          uri:"mapbox://styles/mapbox/light-v9"
      }
  ];
  
  this.map.addControl(new MapboxStyleSwitcherControl(styles));
  }

  getWeatherDetails(latLng){
    this.weatherService.getWeatherDetails(latLng).subscribe((weather: any) => {
      this.rootApiService.reverseGeoCode(latLng).subscribe((res: any) => {
        const geoCoded = {
          lat: res.features[0].properties.lat,
          lng: res.features[0].properties.lon,
          state: res.features[0].properties.state,
          country: res.features[0].properties.country
        }
        this.displayWidgetObj = {
          date: new Date(),
          geoLocation: geoCoded,
          weather: weather,
          icon: `http://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`
        }
        this.showWeatherWidget = true;
        console.log(this.displayWidgetObj);
      })
      
    });
  }


  reverseGeoCode(loc){
     
  }

}


