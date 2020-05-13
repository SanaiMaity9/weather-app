import { Component, OnInit } from '@angular/core';
import { AdditionalService } from 'src/app/services/additional/additional.service';
import { WeatherService } from 'src/app/services/weather/weather.service';

@Component({
  selector: 'app-detailed-board',
  templateUrl: './detailed-board.component.html',
  styleUrls: ['./detailed-board.component.scss']
})
export class DetailedBoardComponent implements OnInit {
  city = '';
  weatherDetails: any = {};
  weatherReport: any;
  constructor(private additionalService: AdditionalService, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.additionalService.sharedCity.subscribe(data => {
      this.city = data;
      if (data) {
        this.refreshDetail()
      } else {
        this.weatherDetails = {};
      }
    });
  }

  // refresh the 5 days weather detail
  refreshDetail() {
    this.weatherService.getFiveDaysWeatherDetails(this.city).subscribe(res => {
      this.weatherDetails = res;
      this.weatherReport = this.weatherDetails.list[0];
    })
  }

  // get the avg temparature
  getTemparature(temp) {
    return this.additionalService.getAvgTemparature(temp);
  }

  // image error handler
  errorHandler(event, icon) {
    this.additionalService.imageErrorHandler(event, icon)
  }

  // get the perticulars days weather report
  getreportoftheday(report) {
    this.weatherReport = report;
  }

}
