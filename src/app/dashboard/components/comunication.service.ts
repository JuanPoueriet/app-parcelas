import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {
  private dataSource = new BehaviorSubject<any>(null);
  data = this.dataSource.asObservable();

  constructor() { }

  updateData(data: any) {
    this.dataSource.next(data);
  }
}
