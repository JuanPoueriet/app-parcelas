import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PlotsServiceService } from '../../../plots-service-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  providers: [DatePipe]

})
export class DataTableComponent implements OnInit {



  data: any[] = []; // Inicializa el array de datos vacío


  ngOnInit(): void {
    this._plotsService.getPlotList().subscribe(plots => {
      // console.log(plots);
      this.data = plots;
      
      this.originalData = [...this.data];

    })
  }



  originalData; // Almacena los datos originales para el reseteo

  sortDataByColumn(index: number, descending: boolean = false) {
    this.data.sort((a, b) => {
      const valueA = this.extractValueFromData(a, index);
      const valueB = this.extractValueFromData(b, index);
      return descending ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
    });
  }

  private extractValueFromData(data: any, index: number): string {
    const keys = ['id', 'group', 'province', 'municipality', 'cadastral_district']; // Define las claves en un arreglo
    return data[keys[index]] || ''; // Accede usando el índice y maneja valores no definidos
  }

  resetData() {
    this.data = [...this.originalData]; // Restablece los datos a su estado original
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;


  itemsPerPage = 20;
  currentPage = 0;


  // ngAfterViewInit() {
  //   this.setupPaginator();
  // }


  ngAfterViewInit() {
    this.paginator.length = this.data.length;
    this.paginator.page.subscribe((event) => {
      this.currentPage = event.pageIndex;
      this.itemsPerPage = event.pageSize;
      this.updateDisplayedData(); // Ensure this method updates the view
    });
  }

  constructor(private cdr: ChangeDetectorRef, private _plotsService: PlotsServiceService, public datePipe: DatePipe) { }


  displayedData: any;

  updateDisplayedData() {
    this.displayedData = this.getDisplayedData();
    this.cdr.detectChanges(); // Manually trigger change detection
  }




  setupPaginator() {
    this.paginator.length = this.data.length;
    this.paginator.page.subscribe((event) => {
      this.currentPage = event.pageIndex;
    });
  }

  getDisplayedData() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }
}
