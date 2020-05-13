import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedBoardComponent } from './detailed-board.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('DetailedBoardComponent', () => {
  let component: DetailedBoardComponent;
  let fixture: ComponentFixture<DetailedBoardComponent>;
  let actualCity = {};
  let params;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedBoardComponent ],
      imports: [ HttpClientTestingModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    params = {
      event: {},
      icon:'01d'
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get the temperture', function () {
    let temp = {
      min:12,
      max: 20
    }
    let avg = (12+20)/2
    expect(component.getTemparature(temp)).toBe(avg);
  });

  it('should call the getreportoftheday method', async(() => {
    spyOn(component, 'getreportoftheday');
    component.getreportoftheday(actualCity);
    fixture.whenStable().then(() => {
      expect(component.getreportoftheday).toHaveBeenCalled();
    });
  }));

  it('should call the errorHandler method', async(() => {
    spyOn(component, 'errorHandler');
    component.errorHandler(params.event, params.icon);
    fixture.whenStable().then(() => {
      expect(component.errorHandler).toHaveBeenCalled();
    });
  }));

  it('should call the refreshDetail method', async(() => {
    spyOn(component, 'refreshDetail');
    component.refreshDetail();
    fixture.whenStable().then(() => {
      expect(component.refreshDetail).toHaveBeenCalled();
    });
  }));
});
