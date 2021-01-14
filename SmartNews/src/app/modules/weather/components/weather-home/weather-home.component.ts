import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';
import {
  MapboxStyleDefinition,
  MapboxStyleSwitcherControl,
} from 'mapbox-gl-style-switcher';
import 'mapbox-gl-style-switcher/styles.css';
import { WeatherService } from '../../services/weather.service';
import { RootApiService } from '../../../../services/root-api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RootContextService } from '../../../../services/root-context.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { LocationsArray } from '../../../../classes/root-models';

declare let annyang: any;
declare let SpeechKITT: any;
interface IDisplayWidget {
  date: Date;
  geoLocation: any;
  weather: any;
  icon: any;
}
@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.scss'],
})
export class WeatherHomeComponent implements OnInit {
  subs: Subscription[] = [];
  currentUserLocation;
  map: mapboxgl;
  currentLocationMarker;
  onDragEnd;
  displayWidgetObj: IDisplayWidget;
  showWeatherWidget = false;
  locationsData = [];

  constructor(
    private weatherService: WeatherService,
    private rootApiService: RootApiService,
    private rootContextService: RootContextService
  ) {}

  ngOnInit(): void {
    this.getMicrophoneAccess();
    this.setupAnnyang();
    this.currentUserLocation = JSON.parse(localStorage.getItem('userLocation'));
    this.getWeatherDetails({
      lat: this.currentUserLocation.lat,
      lng: this.currentUserLocation.lng,
    });
    mapboxgl.accessToken =
      'pk.eyJ1Ijoic2V0aGltYXlhbms5NyIsImEiOiJja2kwZGtvMXowb3drMnJwZTloenY2NmwyIn0.6MJthD64xjhdNk8u3Ah3lg';
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    this.onDragEnd = () => {
      var latLng = this.currentLocationMarker.getLngLat();
      this.getWeatherDetails(latLng);
    };

    this.map.on('load', () => {
      this.flyAndAddMarker([
        this.currentUserLocation.lng,
        this.currentUserLocation.lat,
      ]);
      this.addSwithcerControl();
      this.currentLocationMarker.on('dragend', this.onDragEnd);
    });
  }

  getMicrophoneAccess(){
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { audio: true },
        (stream) => {
          console.log(stream);
        },
        function (err) {
          console.log('The following error occurred: ' + err.name);
        }
      );
    } else {
      console.log('getUserMedia not supported');
    }
  }

  setupAnnyang(){
    if (annyang) {
      var commands = {
        'take me to *location': (location) => {
          console.log(location);
          this.rootApiService
      .getLocationsData(location)
      .subscribe(
        (locations: any) => {
          if(locations && locations.locationsArray && locations.locationsArray[0]){
            const loc = locations.locationsArray[0];
            this.selectUserLocation(loc);
          }
          else{
            alert('location not found')
          }
        
        }


      );
        }
      };
      annyang.addCommands(commands);
      SpeechKITT.annyang();
      SpeechKITT.setStylesheet(
        '//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css'
      );
      SpeechKITT.setSampleCommands(['take me to punjab', 'navigate to delhi', 'show my city weather details']);
      SpeechKITT.vroom();
    }
  }


  flyAndAddMarker(center) {
    console.log(center);
    this.map.flyTo({
      center: center,
      essential: true,
      zoom: 17,
    });
    if(this.currentLocationMarker){
      this.currentLocationMarker.remove();
    }
    this.currentLocationMarker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat(center)
      .addTo(this.map);
      this.currentLocationMarker.on('dragend', this.onDragEnd);
  }

  addSwithcerControl() {
    const styles: MapboxStyleDefinition[] = [
      {
        title: 'Dark',
        uri: 'mapbox://styles/mapbox/dark-v9',
      },
      {
        title: 'Light',
        uri: 'mapbox://styles/mapbox/light-v9',
      },
    ];

    this.map.addControl(new MapboxStyleSwitcherControl(styles));
  }

  getWeatherDetails(latLng) {
    this.weatherService.getWeatherDetails(latLng).subscribe((weather: any) => {
      this.rootApiService.reverseGeoCode(latLng).subscribe((res: any) => {
        const geoCoded = {
          lat: res.features[0].properties.lat,
          lng: res.features[0].properties.lon,
          state: res.features[0].properties.state,
          country: res.features[0].properties.country,
        };
        this.displayWidgetObj = {
          date: new Date(),
          geoLocation: geoCoded,
          weather: weather,
          icon: `http://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`,
        };
        this.showWeatherWidget = true;
        console.log(this.displayWidgetObj);
      });
    });
  }

  getLocations(searchInput) {
    this.rootApiService
      .getLocationsData(searchInput)
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(
        (locations: any) => (this.locationsData = locations.locationsArray)
      );
  }

  selectUserLocation(location) {
    console.log(location);
    var latLng = { lat: location.lat, lng: location.lon };
    this.getWeatherDetails(latLng);
    this.flyAndAddMarker([location.lon, location.lat]);
  }

  reverseGeoCode(loc) {}
}
