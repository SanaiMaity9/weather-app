import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { GlobalConstants } from 'src/app/class/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AdditionalService {

  private city = new BehaviorSubject('');
  sharedCity = this.city.asObservable();
  selectedcity;

  constructor(public dialog: MatDialog) { }

  // to open the dialog box
  openErrorDialog(data): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: data
    });
    setTimeout(() => {
      dialogRef.close();
    }, 3000)
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let animal;
      animal = result;
    });
  }

  // to change city to selected city
  changeCity(cityName: string) {
    this.city.next(cityName)
    this.selectedcity = cityName;
  }

  // to get the average temperature
  getAvgTemparature(temp) {
    let avgTemp = (temp.min + temp.max) / 2
    return avgTemp;
  }

  // to change the image source when not available
  imageErrorHandler(event, icon) {
    console.debug(event);
    event.target.src = GlobalConstants.imgURL + icon + ".png";
  }
}
