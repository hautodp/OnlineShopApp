import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from '../_services/orderDetail.service';
import { OrderDetail } from '../_models/OrderDetail';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../_models/Product';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-UserOderDetail',
  templateUrl: './UserOderDetail.component.html',
  styleUrls: ['./UserOderDetail.component.css']
})
export class UserOderDetailComponent implements OnInit {
  listOrderDetail: OrderDetail[];
  listProducts: Product[];
  id: any;
  totalPayment: number;
  totalUnit: number;
  productName: string;
  photoURL: string;
  constructor(public detailService: OrderDetailService, public route: ActivatedRoute, public productService: ProductService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.id = params.get('idOrder'));
    this.detailService.GetListOrderDetail(this.id).subscribe((data: OrderDetail[]) => {
      this.listOrderDetail = data;
      this.totalUnit = this.listOrderDetail.map(ps => ps.quantity)
      .reduce((prev, curr) => prev + curr, 0);
      this.totalPayment = this.listOrderDetail.map(ps => ps.unitPrice * ps.quantity)
      .reduce((prev, curr) => prev + curr, 0);
    });

    this.productService.getAllProducts().subscribe(data =>
        {
          this.listProducts = data;
          console.log(this.listProducts);
        });

  }
  isMatch(idProduct){
      let matchedProduct: Product;
      matchedProduct = this.listProducts.filter(p => p.idProduct == idProduct)[0];
      this.productName = matchedProduct.name;
      this.photoURL = matchedProduct.photoURL;
      return true;
  }
}
