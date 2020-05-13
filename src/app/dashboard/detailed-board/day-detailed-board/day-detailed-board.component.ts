import { Component, OnInit, Input } from '@angular/core';
import { AdditionalService } from 'src/app/services/additional/additional.service';

@Component({
  selector: 'app-day-detailed-board',
  templateUrl: './day-detailed-board.component.html',
  styleUrls: ['./day-detailed-board.component.scss']
})
export class DayDetailedBoardComponent implements OnInit {

  @Input() weatherReport: any={};
  constructor(private additionalService: AdditionalService) {

   }

  ngOnInit(): void {
    
  }

  // get the temperature
  getTemparature(temp){
    return this.additionalService.getAvgTemparature(temp);
  }

  // image error handler
  errorHandler(event,icon) {
    this.additionalService.imageErrorHandler(event, icon)
  }

}
