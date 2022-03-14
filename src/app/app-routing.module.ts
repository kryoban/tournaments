import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentsTableComponent } from './routes/tournaments-table/tournaments-table.component';

const routes: Routes = [
  {
    path: '**',
    component: TournamentsTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
