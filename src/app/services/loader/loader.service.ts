import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  isLoading = new Subject<boolean>();
  // to show the loader
    show() {
        this.isLoading.next(true);
    }

    // to hide the loader
    hide() {
        this.isLoading.next(false);
    }

}
