import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollContainerService {
  private containerSource = new BehaviorSubject<HTMLElement | null>(null);
  container$ = this.containerSource.asObservable();

  setContainer(container: HTMLElement) {
    this.containerSource.next(container);
  }

  clearContainer() {
    this.containerSource.next(null);
  }
}
