import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandupListComponent } from './standup-list/standup-list.component';
import { WeeklySummaryComponent } from './weekly-summary/weekly-summary.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: StandupListComponent, canActivate: [AuthGuard] },
  { path: 'summary', component: WeeklySummaryComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandupRoutingModule { }
