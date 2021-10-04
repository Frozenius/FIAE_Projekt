import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const qstatsModule = () => import('./_application/_qstats/Qstats.module').then(dist => dist.QstatsModule);

const routes: Routes = [
  {path: 'qstats', loadChildren: qstatsModule},
  {path: '**', redirectTo: 'qstats'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
