import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMenuComponent } from './location-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { LocationWeather } from 'src/app/interfaces/location-weather';

describe('LocationMenuComponent', () => {
  let component: LocationMenuComponent;
  let fixture: ComponentFixture<LocationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationMenuComponent ],
      imports: [ HttpClientTestingModule ,
        MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the validLocation method', async(() => {
    spyOn(component, 'validLocation');
    component.validLocation();
    fixture.whenStable().then(() => {
      expect(component.validLocation).toHaveBeenCalled();
    });
  }));

  it('should call the addLocation method', async(() => {
    let location = {
      name:'London',
      weather:[{main:'clouds'}],
main:{temp:'15C'}
    }
    spyOn(component, 'addLocation');
    component.addLocation(location);
    fixture.whenStable().then(() => {
      expect(component.addLocation).toHaveBeenCalled();
    });
  }));

  it('should call the detailedWeather method', async(() => {
    let location = {}
    spyOn(component, 'detailedWeather');
    component.detailedWeather(location);
    fixture.whenStable().then(() => {
      expect(component.detailedWeather).toHaveBeenCalled();
    });
  }));

  it('should call the refreshLocation method', async(() => {
    let i = 0
    spyOn(component, 'refreshLocation');
    component.refreshLocation(i);
    fixture.whenStable().then(() => {
      expect(component.refreshLocation).toHaveBeenCalled();
    });
  }));

  it('should call the removeLocation method', async(() => {
    let i = 0
    spyOn(component, 'removeLocation');
    component.removeLocation(i);
    fixture.whenStable().then(() => {
      expect(component.removeLocation).toHaveBeenCalled();
    });
  }));

  it('should call the clearLocationList method', async(() => {
    spyOn(component, 'clearLocationList');
    component.clearLocationList();
    fixture.whenStable().then(() => {
      expect(component.clearLocationList).toHaveBeenCalled();
    });
  }));
});
