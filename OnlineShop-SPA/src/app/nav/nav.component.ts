import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  display = 'none' ;

  // show - hide password
  showButton = false;
  showEye = false;

  // login
  model: any = {};

  // register
  modelRegister: any = {};

  constructor(private service: AuthService) { }

  ngOnInit(): void {
  }

  openModalDialog(){
    this.display = 'block';
  }

  closeModalDialog(){
    this.display = 'none';
  }

  showPassword(){
    this.showButton = !this.showButton;
    this.showEye = !this.showEye;
  }

  login(){
    return this.service.login(this.model).subscribe(next => {
      console.log('Logged in Successfully');
      this.display = 'none';
    }, error => {
      console.log('Fail to login');
    });
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logOut(){
    localStorage.removeItem('token');
    console.log('logged out');
  }

  register(){
    return this.service.register(this.modelRegister).subscribe(() => {
        console.log('registeration successful');
    }, error => {
      console.log(error);
    });
  }
}
