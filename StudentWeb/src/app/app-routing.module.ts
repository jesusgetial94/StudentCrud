import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateStudentComponent } from './components/createStudent/createStudent.component';
import { ViewStudentComponent } from './components/viewStudent/viewStudent.component';

const routes: Routes = [
  { path: '', component: AppComponent }, 
  { path: 'createstudent', component: CreateStudentComponent },
  { path: 'viewstudent', component: ViewStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
