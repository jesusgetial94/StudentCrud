import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/servicios/Student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './createStudent.component.html',
  styleUrls: ['./createStudent.component.css']
})
export class CreateStudentComponent implements OnInit {
  public showCreateStudent: boolean = true;
  public loading = false;  
  private studentService: StudentService; 
    
  public userName: string = "";
  public firstName: string = "";
  public lastName: string = "";
  public age: number = 0;
  public carrer: string = "";

  students: Array<Student> = [];
  response: ResponseApi = new ResponseApi();  
  student: Student = new Student();
  searchFilter: Student = new Student();

  constructor(http: HttpClient, private toastr: ToastrService, private router: Router) {     
    this.studentService = new StudentService(http);    
  }

  ngOnInit(): void {    
    this.cleanForm();
  }

  backHome(){
    this.router.navigate([""])
  } 

  async CreateStudent(){
    this.loading = true;    
    this.student.userName = this.userName;
    this.student.firstName = this.firstName;
    this.student.lastName = this.lastName;
    this.student.age = this.age;
    this.student.career = this.carrer;

    if(this.student.userName != null && this.student.userName != ""){
      let res = await this.studentService.CreateStudent(this.student);
      this.response = <ResponseApi>res;    
      if(this.response.success){
        this.toastr.success(this.response.message, 'Success!');
        this.cleanForm();
        this.backHome();
      }else{
        if(this.response.innerMessage == "Student Already Exists!") this.toastr.error(this.response.innerMessage);
        else this.toastr.error(this.response.message, 'Error!');
        
      }
      this.loading = false; 
    }
    else this.toastr.error('Username field is mandatory!');
    this.backHome();
  }

  cleanForm(){    
    this.userName = "";
    this.firstName = "";
    this.lastName = "";
    this.age = 0;
    this.carrer = "";
  }
}
