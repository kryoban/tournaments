import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

const imports = [MatButtonModule, MatTableModule];
const exports = [MatButtonModule, MatTableModule];

@NgModule({
  imports,
  exports,
})
export class MaterialModule {}
