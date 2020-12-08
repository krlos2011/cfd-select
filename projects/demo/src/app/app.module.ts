import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CfdSelectModule } from 'projects/cfd-select/src/public-api';

import { AppComponent } from './app.component';
import { LoadingModule } from '../shared/loading/loading.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CfdSelectModule,
    LoadingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
