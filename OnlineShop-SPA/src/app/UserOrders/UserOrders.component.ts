import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserOrdersService } from '../_services/userOrders.service';
import { Order } from '../_models/Order';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-UserOrders',
  templateUrl: './UserOrders.component.html',
  styleUrls: ['./UserOrders.component.css']
})
export class UserOrdersComponent implements OnInit {

  listOrders: Order[];
  constructor(public route: Router, public userOrderService: UserOrdersService,
              public authService: AuthService,
              public alertify: AlertifyService) { }
  ngOnInit() {
    this.userOrderService.GetListUserOrders(this.authService.decodedToken?.nameid).subscribe((data: Order[]) => {
      this.listOrders = data;
    });
  }

}
