import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

import { StandupRoutingModule } from './standup-routing.module';
import { StandupListComponent } from './standup-list/standup-list.component';
import { StandupFormComponent } from './standup-form/standup-form.component';
import { WeeklySummaryComponent } from './weekly-summary/weekly-summary.component';


@NgModule({
  declarations: [
    StandupListComponent,
    StandupFormComponent,
    WeeklySummaryComponent
  ],
  imports: [
    CommonModule,
    StandupRoutingModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule
  ]
})
export class StandupModule { }
