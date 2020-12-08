import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CfdOptionDirective, CfdSelectComponent } from './cfd-select.component';

@NgModule({
  declarations: [CfdOptionDirective, CfdSelectComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CfdOptionDirective, CfdSelectComponent],
})
export class CfdSelectModule {}
