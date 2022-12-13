import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/models/Student';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { StudentService } from 'src/app/servicios/Student.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-student',
  templateUrl: './viewStudent.component.html',
  styleUrls: ['./viewStudent.component.css']
})
export class ViewStudentComponent implements OnInit {  
  public student: Student = new Student();
  public studentToRemove: Student = new Student();  
  public loading = false;
  private studentService: StudentService;  
  public showTable: boolean = false;  

  response: ResponseApi = new ResponseApi();  
  userName: string = "";
  students: Array<Student> = [];  
  editedStudent: Student = new Student();
  editStudentForm!: FormGroup;
  
  page = 1;
  pageSize = 5;
  collectionSize: number = 0;
  
  constructor(private fb: FormBuilder, http: HttpClient, private toastr: ToastrService, private router: Router, private modalService: NgbModal) { 
    this.studentService = new StudentService(http);
  }

  ngOnInit(): void {
    this.Get();
    this.editStudentForm = this.fb.group({
      userName: [''],
      firstName:[''],
      lastName: [''],
      age: [''],
      career: ['']
     });
  }

  backHome(){
    this.router.navigate([""])
  }

  async Get(){    
    this.loading = true;
    let res = await this.studentService.Get();    
    this.students = <Student[]>res;    
    if(this.students.length <= 0){
      this.showTable = false;
      this.toastr.info("You do not have registers");
    }else{
      this.showTable = true;
      this.collectionSize = this.students.length;
    }
    this.loading = false;
  }

  OpenDeleteConfirmationModal(deleteConfirmation: any, student: Student){
    this.modalService.open(deleteConfirmation, {ariaLabelledBy: 'modal-basic-title'});
    this.studentToRemove.userName = student.userName;
  }

  OpenEditFormModal(editForm: any, student: Student) {
    this.editStudentForm.controls['userName'].disable();
    this.modalService.open(editForm, {
     centered: true,
     backdrop: 'static'
    });
    this.editStudentForm.patchValue({
      userName: student.userName,
      firstName: student.firstName,
      lastName: student.lastName,
      age: student.age,
      career: student.career
     });
    }
  
  async submitEdit() {    
    this.loading = true;

    this.editedStudent.userName = this.editStudentForm.controls['userName'].value;
    this.editedStudent.firstName = this.editStudentForm.controls['firstName'].value;
    this.editedStudent.lastName = this.editStudentForm.controls['lastName'].value;
    this.editedStudent.age = this.editStudentForm.controls['age'].value;
    this.editedStudent.career = this.editStudentForm.controls['career'].value;
    let res = await this.studentService.Edit(this.editedStudent);    
    this.response = <ResponseApi>res;    
    if(this.response.success){
      this.toastr.success(this.response.message, 'Edited Successfully!');      
      this.Get();
    }else       
      this.toastr.error(this.response.message, 'Error!');
    this.modalService.dismissAll();
    this.loading = false;
    console.log("res:", this.editStudentForm.getRawValue());    
  }
  
  async confirmDelete(){
    this.loading = true;       
    let res = await this.studentService.Delete(this.studentToRemove);
    this.response = <ResponseApi>res;    
      if(this.response.success){
        this.toastr.success(this.response.message, 'Deleted Successfully!');
        this.modalService.dismissAll();
        this.Get();
      }else       
        this.toastr.error(this.response.message, 'Error!');
        this.modalService.dismissAll();
      this.loading = false;  
  }
}
