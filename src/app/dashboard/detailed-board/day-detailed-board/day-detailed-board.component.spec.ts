import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayDetailedBoardComponent } from './day-detailed-board.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('DayDetailedBoardComponent', () => {
  let component: DayDetailedBoardComponent;
  let fixture: ComponentFixture<DayDetailedBoardComponent>;
  let params;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayDetailedBoardComponent ],
      imports: [ HttpClientTestingModule,
        MatDialogModule
      ]
    })
    .compileComponents();
    params = {
      event: {},
      icon:'01d'
    }
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayDetailedBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the errorHandler method', async(() => {
    spyOn(component, 'errorHandler');
    component.errorHandler(params.event, params.icon);
    fixture.whenStable().then(() => {
      expect(component.errorHandler).toHaveBeenCalled();
    });
  }));

  it('get the temperture', function () {
    let temp = {
      min:12,
      max: 20
    }
    let avg = (12+20)/2
    expect(component.getTemparature(temp)).toBe(avg);
  });
});
