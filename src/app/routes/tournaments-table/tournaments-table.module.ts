import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentsTableComponent } from './tournaments-table.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [TournamentsTableComponent],
  imports: [CommonModule, MaterialModule],
})
export class TournamentsTableModule {}
