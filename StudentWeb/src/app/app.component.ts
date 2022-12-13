import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showHomePage: boolean = true;
  title: any;

  constructor(private router: Router) {
  }
  
  routerNavigate(option: string){
    this.showHomePage = false;
    this.router.navigate([option])
  }   
}
