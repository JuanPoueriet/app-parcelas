import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlotsServiceService {
  constructor(private _http: HttpClient) {}

  data:any;

  addPlot(data: any): Observable<any> {
    // console.log(data);
    return this._http.post('http://localhost/structure_api/api.php', data);
  }

  updatePlot(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }

  getPlotList(): Observable<any> {
    return this._http.get('http://localhost/structure_api/api.php');
  }
  getDataSummary(): Observable<any> {
    return this._http.get('http://localhost/structure_api/api.php?action=data_summary');
  }

  deletePlot(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }
}