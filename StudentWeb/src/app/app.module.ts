import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CreateStudentComponent } from './components/createStudent/createStudent.component';
import { ViewStudentComponent } from './components/viewStudent/viewStudent.component';
import { ChartsModule } from 'ng2-charts';

import { TableFilterPipe } from './table-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,    
    CreateStudentComponent,
    ViewStudentComponent,
    TableFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxLoadingModule.forRoot({}),
    NgbModule,
    ToastrModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule, // required animations module
    HttpClientModule,
    BrowserModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
