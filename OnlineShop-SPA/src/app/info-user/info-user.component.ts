import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService) { }
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotify($event: any){
    if  (this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }

  updateUser(){
    console.log(this.user);
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Cập nhập thông tin thành công');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }
}
