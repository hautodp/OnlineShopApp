import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

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

  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router) { }

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
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in Successfully');
      this.display = 'none';
    }, error => {
      this.alertify.error(error);
    }, ()=> {
      this.router.navigate(['/home']);
    });
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logOut(){
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

  register(){
    return this.authService.register(this.modelRegister).subscribe(() => {
        this.alertify.success('Registeration successful');
    }, error => {
      this.alertify.error(error);
    });
  }
}
