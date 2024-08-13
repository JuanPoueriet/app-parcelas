import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from '../../../data.service';

@Component({
  selector: 'dashboard-owners-table',
  templateUrl: './owners-table.component.html',
  styleUrl: './owners-table.component.scss',
  animations:[
    trigger('animacionAltura', [
      state('void', style({ height: '0px' })),
      state('*', style({ height: '*' })),
      // transition('void <=> *', animate('{{ duration }}ms'))
      transition('void <=> *', animate('{{ duration }}ms cubic-bezier(0, 0, 1, 1)'))

    ]),
  ]
})
export class OwnersTableComponent {

  animationDuration = 250;
  state = 'initial';




  @ViewChild(MatPaginator) paginator: MatPaginator;


  itemsPerPage = 10;
  currentPage = 0;


  // ngAfterViewInit() {
  //   this.setupPaginator();
  // }


  ngAfterViewInit() {
    this.paginator.length = this.dataService.dataOwner.length;
    this.paginator.page.subscribe((event) => {
      this.currentPage = event.pageIndex;
      this.itemsPerPage = event.pageSize;
      this.updateDisplayedData(); // Ensure this method updates the view
    });
  }

  constructor(private cdr: ChangeDetectorRef, public dataService: DataService) { }

  displayedData:any;

updateDisplayedData() {
  this.displayedData = this.getDisplayedData();
  this.cdr.detectChanges(); // Manually trigger change detection
}
  

    

  setupPaginator() {
    this.paginator.length = this.dataService.dataOwner.length;
    this.paginator.page.subscribe((event) => {
      this.currentPage = event.pageIndex;
    });
  }

  getDisplayedData() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.dataService.dataOwner.slice(startIndex, endIndex);
  }
}
