import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotsPageComponent } from './pages/plots-page/plots-page.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { TruncatePipe } from '../truncate.pipe';



@NgModule({
  declarations: [
    PlotsPageComponent,
    DataTableComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    // TruncatePipe
  ]
})
export class PlotsModule { }
