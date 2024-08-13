import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard/pages/dashboard-page/dashboard-page.component';
import { RegisterPageComponent } from './register/pages/register-page/register-page.component';
import { PlotsPageComponent } from './plots/pages/plots-page/plots-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    title: 'Home',
    component: DashboardPageComponent
  },
  
  {
    path: 'register',
    title: 'Register',
    component: RegisterPageComponent

  },
  {
    path: 'plots',
    title: 'Plots',
    component: PlotsPageComponent

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
