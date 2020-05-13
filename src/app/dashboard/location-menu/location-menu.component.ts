import { Component, OnInit } from '@angular/core';
import { LocationWeather } from 'src/app/interfaces/location-weather';
import { FormControl, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { error } from 'protractor';
import { AdditionalService } from 'src/app/services/additional/additional.service';

@Component({
  selector: 'app-location-menu',
  templateUrl: './location-menu.component.html',
  styleUrls: ['./location-menu.component.scss']
})
export class LocationMenuComponent implements OnInit {
  city = new FormControl('', Validators.compose([Validators.minLength(3), Validators.required]));
  locationList: LocationWeather[] = []

  constructor(private weatherService: WeatherService, private additionalService: AdditionalService) { }

  ngOnInit(): void {
  }

  // it will valid city ang get weather report
  validLocation() {
    if (!this.locationList.some((item) => item.city.toLowerCase() == this.city.value.toLowerCase())) {
      this.weatherService.getWeatherDetail(this.city.value).subscribe(data => {
        this.addLocation(data);
      })
    } else {
      this.additionalService.openErrorDialog('City already exists in Recent Location');
      this.detailedWeather({ city: this.city.value, condition: '', temperature: '' })
    }
    this.city.reset();
  }

  // add location to list
  addLocation(data) {
    let location: LocationWeather = {
      city: data.name,
      condition: data.weather[0].main,
      temperature: data.main.temp + "C"
    }
    if (this.locationList.length >= 8) {
      this.locationList.pop();
    }
    this.locationList.unshift(location);
    this.detailedWeather(this.locationList[0])
  }

  // it will give detailed weather report of location
  detailedWeather(location) {
    this.additionalService.changeCity(location.city);
  }

  // refresh the location's weather report
  refreshLocation(i) {
    this.weatherService.getWeatherDetail(this.locationList[i].city).subscribe(data => {
      this.locationList[i] = {
        city: data.name,
        condition: data.weather[0].main,
        temperature: data.main.temp + "C"
      }
    })
  }

  // remove location from the list
  removeLocation(i) {
    let name = this.locationList[i].city
    this.locationList.splice(i, 1)
    if (name.toLowerCase() == this.additionalService.selectedcity.toLowerCase()) {
      if (this.locationList.length > 0) {
        this.additionalService.changeCity(this.locationList[0].city);
      } else {
        this.additionalService.changeCity('');
      }
    }
  }

  // clears the location list
  clearLocationList() {
    this.locationList = []
    this.additionalService.changeCity('');
  }

}
