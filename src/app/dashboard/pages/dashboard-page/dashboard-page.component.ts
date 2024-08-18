import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../../scroll.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatNumber } from '@angular/common';
import { PrintService } from '../../../print.service';
import { KtdGridCompactType, KtdGridLayout, ktdTrackById } from '@katoid/angular-grid-layout';
import { DataService } from '../../../data.service';
// import { DisplayGrid, GridType, GridsterConfig } from 'angular-gridster2';

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private scrollSub!: Subscription;

  constructor(private scrollService: ScrollService, private el: ElementRef, private printService: PrintService,
    public dataService: DataService
  ) {



  }

  ngOnInit(): void {
    this.scrollSub = this.scrollService.scrollRequest$.subscribe(request => {
      if (request) {
        this.scrollToPosition(request.position).then(() => {
          request.promiseResolver();
        });
      }
    });












  }







  ngOnDestroy(): void {
    this.scrollSub.unsubscribe();
  }

  async scrollToPosition(position: number): Promise<void> {
    this.el.nativeElement.scrollTop = position;
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate smooth scrolling
  }










  @ViewChild('dfgdfg') gfdgsf: any;

  printContent(htmlContent: HTMLElement): void {

    const options = {
      styleUrls: ['../../../../assets/style.css'],
      //  inlineStyles: 'h1 { color: red; }',
      onComplete: () => console.log('Impresión completada con éxito'),
      onError: (error) => console.error('Ocurrió un error durante la impresión', error)
    };

    this.printService.printContent(htmlContent, options).subscribe();

  }


  data: any;
  receiveData(data: any) {
    console.log('hola')
    this.data = data;
  }


  calculateMunicipalityMetrics(type: string): number {
    let total: number = 0;

    switch (type) {
      case 'municipalityCount':
        this.dataService.data.forEach(group => {
          if (!group.filtered) {
            group.provinces.forEach(province => {
              if (!province.filtered) {
                province.municipalities.forEach(municipality => {
                  if (!municipality.filtered) {
                    total++;
                  }
                });
              }
            });
          }
        });
        break;

      case 'totalParcelsPerMunicipality':
        this.dataService.data.forEach(group => {
          if (!group.filtered) {
            group.provinces.forEach(province => {
              if (!province.filtered) {
                province.municipalities.forEach(municipality => {
                  if (!municipality.filtered) {
                    total += municipality.quantity_of_parcels_per_municipality;
                  }
                });
              }
            });
          }
        });
        break;

      case 'totalSquareMetersPerMunicipality':
        this.dataService.data.forEach(group => {
          if (!group.filtered) {
            group.provinces.forEach(province => {
              if (!province.filtered) {
                province.municipalities.forEach(municipality => {
                  if (!municipality.filtered) {
                    total += municipality.square_meters_per_municipality;
                  }
                });
              }
            });
          }
        });
        break;

      default:
        console.log("Invalid type provided.");
        break;
    }

    return total;
  }
  

gap = 30;
cols: number = 12;
rowHeight: number = 125;
layout: KtdGridLayout = [
    {id: '0', x: 0, y: 3, w: 4, h: 1},
    {id: '1', x: 4, y: 3, w: 4, h: 1},
    {id: '2', x: 8, y: 3, w: 4, h: 1},
    //
    {id: '3', x: 0, y: 0, w: 6, h: 3},
    {id: '4', x: 6, y: 0, w: 6, h: 3},
  ];
  trackById = ktdTrackById
  
  // {id: '4', x: 0, y: 0, w: 6, h: 3},
  // {id: '5', x: 0, y: 0, w: 6, h: 3},
onLayoutUpdated(){

}



}
