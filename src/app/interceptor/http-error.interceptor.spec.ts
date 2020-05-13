import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalConstants } from '../class/global-constants';
import { WeatherService } from '../services/weather/weather.service';
import { HttpClient, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

const testUrl = GlobalConstants.apiURL+'weather?q=aaa&appid='+GlobalConstants.appId+'&units='+GlobalConstants.units
describe('HttpErrorInterceptor', () => {
  let errorInterceptor: HttpErrorInterceptor;
        let weatherService: WeatherService;
        let httpClient: HttpClient;
        let httpMock: HttpTestingController;
  beforeEach(() => {TestBed.configureTestingModule({
    providers: [
      HttpErrorInterceptor,
      { provide: WeatherService },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
      }
      ],
      imports:[
        MatDialogModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ]
  });
  httpClient = TestBed.get(HttpClient);
            httpMock = TestBed.get(HttpTestingController);
            weatherService = TestBed.get(WeatherService);
            errorInterceptor = TestBed.get(HttpErrorInterceptor);});

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });

//   it('should throw a error and display in a dialog box', () => {
//    // Make an HTTP GET request
//    httpClient.get<any>(testUrl).subscribe(
//     res => fail('should have failed with the 404 error'),
//     (error: HttpErrorResponse) => {
//         expect(error).toEqual( {});
//     }
// );
// // The following `expectOne()` will match the request's URL.
// const req = httpMock.expectOne(testUrl)

// // Respond with mock error
// req.flush( { cod: 404, message: "city not found" });

// expect(weatherService.getWeatherDetail('aaa')).toHaveBeenCalledTimes(1);
// })
});
