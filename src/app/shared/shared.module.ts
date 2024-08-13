import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

import {MatIconModule} from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    ToolBarComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    MatIconModule,
    AppRoutingModule
  ],
  exports: [
    ToolBarComponent,
    SideNavComponent
  ]
})
export class SharedModule { }
