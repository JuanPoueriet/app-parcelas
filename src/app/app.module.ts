import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardModule } from './dashboard/dashboard.module';
import { FilterSummaryComponent } from './dashboard/components/filter-summary/filter-summary.component';
import { RegisterModule } from './register/register.module';
import { PlotsModule } from './plots/plots.module';
import { TruncatePipe } from './truncate.pipe';
// import { LineChartComponent } from './line-chart/line-chart.component';

// import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    TruncatePipe,
    // LineChartComponent,
    // LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // HighchartsChartModule,

    //***************************************
    // MatIconModule,



    //****************************************

    SharedModule,
    DashboardModule,
    RegisterModule,
    PlotsModule
    

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    FilterSummaryComponent
  ],
  exports:[
    TruncatePipe,
    // LineChartComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
