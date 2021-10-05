import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { QstatRoutingModule } from './Qstat-routing.module';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';

import { SliderModule } from 'primeng/slider';
import { KFormatterPipe } from './KFormatter.pipe';
import { DashboardComponent } from './_components/Dashboard/Dashboard.component';
import { DetailedTableComponent } from './_components/DetailedTable/DetailedTable.component';
import { SkeletonComponent } from './_components/Skeleton/Skeleton.component';
import { TableComponent } from './_components/Table/Table.component';

@NgModule({
  imports: [
    CommonModule,
    QstatRoutingModule,
    TableModule,
    ProgressBarModule,
    MultiSelectModule,
    DialogModule,
    ButtonModule,
    ChartModule,
    NgbModule,
    SkeletonModule,
    DividerModule,
    DropdownModule,
    FormsModule,
    CardModule,
    ReactiveFormsModule,
    CalendarModule,
    AutoCompleteModule,
    InputTextModule,
    SliderModule,
    ConfirmPopupModule,
    InputNumberModule
  ],
  declarations: [
    DashboardComponent,
    SkeletonComponent,
    TableComponent,
    DetailedTableComponent,
    KFormatterPipe
  ]
})
export class QstatsModule { }
