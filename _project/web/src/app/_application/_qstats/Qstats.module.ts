import { QstatRoutingModule } from './Qstat-routing.module';
import { DetailedTableComponent } from './_components/DetailedTable/DetailedTable.component';
import { TableComponent } from './_components/Table/Table.component';
import { SkeletonComponent } from './_components/Skeleton/Skeleton.component';
import { DashboardComponent } from './_components/Dashboard/Dashboard.component';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    QstatRoutingModule,
    DropdownModule,
    FormsModule,
    SkeletonModule,
    TableModule
  ],
  declarations: [
    DashboardComponent,
    SkeletonComponent,
    TableComponent,
    DetailedTableComponent
  ]
})
export class QstatsModule { }
