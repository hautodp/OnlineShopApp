import { Component, OnInit } from '@angular/core';
import { Order } from '../_models/Order';
import { Router } from '@angular/router';
import { OrdersService } from '../_services/orders.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  listOrders: Order[];
  totalOrders: number;
  constructor(public route: Router, public orderService: OrdersService, public alert: AlertifyService) { }

  ngOnInit(): void {
    this.loadOrders();
  }
  navigateToHome(){
    this.route.navigate(['admin/home']);
  }
  //get all orders
  loadOrders(){
    this.orderService.GetAllOrders().subscribe( (data: Order[]) => { this.listOrders = data;},
     error => this.alert.error(error));
  }

  //update state of orders
  updateOrder(id: number, state: number){
      this.orderService.updateOrder(id, state).subscribe(next => {
        this.alert.success('Cập nhập thông tin thành công');
        this.loadOrders();
      }, error => {
        this.alert.error('Cập nhập thông tin thất bại');
      });
  }

}
