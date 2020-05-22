import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private toastrService: ToastrService,
              private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, err => {
      this.toastrService.error(err);
    });
  }

  deleteUser(id: number){
    this.alertifyService.confirm('Bạn có muốn xóa dòng vừa chọn', () => {
      this.userService.deleteUser(id).subscribe(
        () => {
        this.users.splice(this.users.findIndex(m => m.id === id), 1);
        this.toastrService.info('Xóa thành công');
        },
        err => {
          this.toastrService.error('Xóa thất bại');
        }
      );
    });
  }
}
