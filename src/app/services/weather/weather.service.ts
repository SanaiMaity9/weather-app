import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/class/global-constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  // get the weather report by city
  getWeatherDetail(city):Observable<any>{
    return this.http.get(GlobalConstants.apiURL+'weather?q='+city+'&appid='+GlobalConstants.appId+'&units='+GlobalConstants.units)
  }

  // get the 5 days of weather report by city
  getFiveDaysWeatherDetails(city):Observable<any>{
    return this.http.get(GlobalConstants.apiURL+'forecast/daily?q='+city+'&units='+GlobalConstants.units+'&cnt='+GlobalConstants.countDays+'&appid='+GlobalConstants.appId)
  }
}
