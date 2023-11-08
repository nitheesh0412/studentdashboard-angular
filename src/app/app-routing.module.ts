import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { MarkattendanceComponent } from './components/markattendance/markattendance.component';
import { ChartsComponent } from './components/charts/charts.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path : "dashboard",
    component : DashboardComponent
  },
  {
    path : "adduser",
    component : AdduserComponent
  },
  {
    path : "markattendance",
    component : MarkattendanceComponent
  },
  {
    path : "charts",
    component : ChartsComponent
  },
  {
    path : "home",
    component : HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
