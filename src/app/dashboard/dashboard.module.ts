import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
// import { SummaryFilterComponent } from './summary-filter/summary-filter.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatFormFieldModule} from '@angular/material/form-
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TableSummaryComponent } from './components/table-summary/table-summary.component';
import { FilterSummaryComponent } from './components/filter-summary/filter-summary.component';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { PortalModule } from '@angular/cdk/portal';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';




import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { GeoChartComponent } from './components/geo-chart/geo-chart.component';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {FormsModule} from '@angular/forms';
// import { GoogleChartsModule } from 'angular-google-charts';
import { OwnersTableComponent } from './components/owners-table/owners-table.component';
import { ColumnChartComponent } from './components/column-chart/column-chart.component';
// import { GridsterModule } from 'angular-gridster2';
import { KtdGridModule } from '@katoid/angular-grid-layout';
import { PruebaComponent } from './components/prueba/prueba.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { PieComponent } from './components/pie/pie.component';
import { MapaComponent } from './components/mapa/mapa.component';


@NgModule({
  declarations: [

    LineChartComponent,
    DashboardPageComponent,
    TableSummaryComponent,
    FilterSummaryComponent,
    PieChartComponent,
    GeoChartComponent,
    OwnersTableComponent,
    ColumnChartComponent,
    PruebaComponent,
    PieComponent,
    MapaComponent,

  ],
  imports: [


    HighchartsChartModule,

    
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    PortalModule,
    MatTooltipModule,
    MatPaginatorModule,
    // GoogleChartsModule,
    // GridsterModule,
    KtdGridModule,


    MatSelectModule,
    MatInputModule
  ],
  exports: [
    // DashboardPageComponent
  ],
  providers: [provideNativeDateAdapter(),
    FilterSummaryComponent,
    PieComponent
    // { provide: MAT_DATE_LOCALE, useValue: 'en-US' }
  ]
})
export class DashboardModule { }
