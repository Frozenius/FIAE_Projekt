import { DashboardComponent } from './_components/Dashboard/Dashboard.component';
import { SkeletonComponent } from './_components/Skeleton/Skeleton.component';
import { DetailedTableComponent } from './_components/DetailedTable/DetailedTable.component';
import { TableComponent } from './_components/Table/Table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: '', component: SkeletonComponent},
    {path: 'detailed/:country/:portal/:type', component: DetailedTableComponent},
    {path: ':id', component: TableComponent},
  ]},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class QstatRoutingModule { }
