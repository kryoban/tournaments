import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

const imports = [MatButtonModule, MatIconModule, MatTableModule];
const exports = [MatButtonModule, MatIconModule, MatTableModule];

@NgModule({
  imports,
  exports,
})
export class MaterialModule {}
