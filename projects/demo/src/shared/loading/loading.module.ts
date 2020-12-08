import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingDirective } from './loading.directive';

@NgModule({
  declarations: [LoadingDirective],
  imports: [CommonModule],
  exports: [LoadingDirective],
})
export class LoadingModule {}
