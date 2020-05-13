import { TestBed } from '@angular/core/testing';

import { AdditionalService } from './additional.service';
import {  MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';

export class TestComponent  {}


describe('AdditionalService', () => {
  let service: AdditionalService;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
    });
    service = TestBed.inject(AdditionalService);
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('open modal ', () => {
    service.openErrorDialog( 'city not found');
    expect(dialogSpy).toHaveBeenCalled();

    // You can also do things with this like:
    expect(dialogSpy).toHaveBeenCalledWith(ErrorDialogComponent, { width: '300px',
    data: 'city not found' });

    // and ...
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
});


it('get average of two values', function () {
  let temp = {
    min:12,
    max: 20
  }
  let avg = (12+20)/2
  expect(service.getAvgTemparature(temp)).toBe(avg);
});



});
