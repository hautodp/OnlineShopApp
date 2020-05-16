import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { Cart } from '../_models/Cart.model';
import { Route } from '@angular/compiler/src/core';
import { Order } from '../_models/Order';
import { PaymentService } from '../_services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private route: Router, private alertify: AlertifyService,
    private paymentService: PaymentService, private authService: AuthService, private cart: Cart) { }
  order: any = {};
  totalItems: number;
  totalPrice: number;
  ngOnInit(): void {
      this.totalItems = this.cart.itemCount;
      this.totalPrice = this.cart.totalPrice;
      this.order.idUser = this.authService.decodedToken?.nameid;
  }

  CreateOrder(){
    console.log(this.order);
    this.paymentService.CreateOrder(this.order).subscribe(() => {
      this.alertify.success("Đã tạo thành công đơn hàng!");
      this.cart.clear();
      this.route.navigate(['/home']);
    }, error => {
      this.alertify.error("Tạo đơn hàng thất bại!");
      this.route.navigate(['/home']);
    });

  }

}
