import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      console.log('Đăng nhập thành công');
    }, error => {
      console.log('Đăng nhập thất bại');
    }, () => {
      this.router.navigate(['admin/home']);
    });
  }
}
