import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './pages/register-page/register-page.component';



// import {MatCheckboxModule} from '@angular/material/checkbox';

// import { PortalModule } from '@angular/cdk/portal';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import {MatPaginatorModule} from '@angular/material/paginator';




// import {MatInputModule} from '@angular/material/input';
// import {MatSelectModule} from '@angular/material/select';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';













import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
// import { SummaryFilterComponent } from './summary-filter/summary-filter.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatFormFieldModule} from '@angular/material/form-
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {MatCheckboxModule} from '@angular/material/checkbox';

import { PortalModule } from '@angular/cdk/portal';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';




import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { GoogleMapsModule } from '@angular/google-maps';


// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';





import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [


    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
    MatNativeDateModule,
    MatRadioModule,
    HttpClientModule,
    MatTableModule,
    BrowserModule,
    MatSortModule,




    CommonModule,


    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSnackBarModule,
    GoogleMapsModule
    
  ],
  providers: [
    DatePipe
  ]
})
export class RegisterModule { }
