import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnInit, Injectable } from '@angular/core';
import { Constants } from '../constants/constants';
import { Student } from '../models/Student';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type' : 'application/json'
  })
}

@Injectable()
export class StudentService implements OnInit{

  api: any = Constants.apiStudent;  
 
  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  CreateStudent(student : Student) {
    let endpoint = this.api + "/CreateStudent";    
    let promise = new Promise((resolve, reject) => {    
      this.http.post(endpoint, student)
          .toPromise()
          .then(
              res => { 
                resolve(res);
              },
              msg => { 
                reject(msg);
              }
          );
    });
    return promise;
  }


  Get() {
    let endpoint = this.api;
    let promise = new Promise((resolve, reject) => {    
      this.http.get(endpoint)
          .toPromise()
          .then(
              res => { 
                resolve(res);
              },
              msg => { 
                reject(msg);
              }
          );
    });
    return promise;
  }

  Delete(student : Student) {
    let endpoint = this.api + "/DeleteStudent";
    let promise = new Promise((resolve, reject) => {    
      this.http.post(endpoint, student)
          .toPromise()
          .then(
              res => { 
                resolve(res);
              },
              msg => { 
                reject(msg);
              }
          );
    });
    return promise;
  }

  Edit(student : Student) {
    let endpoint = this.api + "/EditStudent";    
    let promise = new Promise((resolve, reject) => {    
      this.http.put(endpoint, student)
          .toPromise()
          .then(
              res => { 
                resolve(res);
              },
              msg => { 
                reject(msg);
              }
          );
    });
    return promise;
  }

  GetStudent(filterStudent : Student) {    
    let endpoint = this.api + "/GetStudent";
    let promise = new Promise((resolve, reject) => {    
      this.http.post(endpoint, filterStudent)
          .toPromise()
          .then(
              res => { 
                resolve(res);
              },
              msg => { 
                reject(msg);
              }
          );
    });
    return promise;
  }
}
