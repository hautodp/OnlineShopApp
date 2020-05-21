import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from '../_services/orderDetail.service';
import { OrderDetail } from '../_models/OrderDetail';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-UserOderDetail',
  templateUrl: './UserOderDetail.component.html',
  styleUrls: ['./UserOderDetail.component.css']
})
export class UserOderDetailComponent implements OnInit {
  listOrderDetail: OrderDetail[];
  id: any;
  totalPayment: number;
  totalUnit: number;
  constructor(public detailService: OrderDetailService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.id = params.get('idOrder'));
    this.detailService.GetListOrderDetail(this.id).subscribe((data: OrderDetail[]) => {
      this.listOrderDetail = data;
      this.totalUnit = this.listOrderDetail.map(ps => ps.quantity)
      .reduce((prev, curr) => prev + curr, 0);
      this.totalPayment = this.listOrderDetail.map(ps => ps.unitPrice * ps.quantity)
      .reduce((prev, curr) => prev + curr, 0);
    });

  }

}
