import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor(public authSerice: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token');
    console.log('Đăng xuất thành công!');
  }
}
