import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GlobalConstants } from 'src/app/class/global-constants';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  let actualCity: string= 'London';
  let wrongcity: string = 'aaa';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get the weather report of the city London', () => {
    const weatherreport = {};

    service.getWeatherDetail(actualCity).subscribe(data => {
      expect(data).toEqual(weatherreport);
    });
    const req = httpMock.expectOne(`${GlobalConstants.apiURL}weather?q=${actualCity}&appid=${GlobalConstants.appId}&units=${GlobalConstants.units}`);
    expect(req.request.method).toBe("GET");
    req.flush(weatherreport);
  });

  it('get the weather report of the city aaa', () => {
    const weatherreport = {};
    service.getWeatherDetail(wrongcity).subscribe(()=>{},err => {
      console.log("err",err)
      expect(err.cod).toBe('404');
      expect(err.message).toBe('city not found');
    });    

    const req = httpMock.expectOne(`${GlobalConstants.apiURL}weather?q=${wrongcity}&appid=${GlobalConstants.appId}&units=${GlobalConstants.units}`);
    expect(req.request.method).toBe("GET");
    req.flush(weatherreport);
  });

  it('get the weather report of the city London for 5 days', () => {
    const weatherreport = {};

    service.getFiveDaysWeatherDetails(actualCity).subscribe(data => {
      expect(data).toEqual(weatherreport);
    });
    const req = httpMock.expectOne(`${GlobalConstants.apiURL}forecast/daily?q=${actualCity}&units=${GlobalConstants.units}&cnt=${GlobalConstants.countDays}&appid=${GlobalConstants.appId}`);
    expect(req.request.method).toBe("GET");
    req.flush(weatherreport);
  });
});
