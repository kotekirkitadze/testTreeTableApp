import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TreeTableModule } from 'primeng/treetable';
import { TableComponent } from './component/table/table.component';
import { FiltersComponent } from './component/filters/filters.component';

@NgModule({
  declarations: [AppComponent, TableComponent, FiltersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TreeTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
