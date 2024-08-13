import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollRequestSource = new BehaviorSubject<{position: number, elementRef: HTMLElement, promiseResolver: () => void} | null>(null);
  scrollRequest$ = this.scrollRequestSource.asObservable();

  constructor() { }

  requestScroll(position: number, elementRef: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      this.scrollRequestSource.next({ position, elementRef, promiseResolver: resolve });
    });
  }
}
