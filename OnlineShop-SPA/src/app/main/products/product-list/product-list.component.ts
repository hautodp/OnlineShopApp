import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { ProductService } from 'src/app/_services/product.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  pagination: PaginatedResult<Product>;
  constructor(private productSevice: ProductService, private alertity: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.products = data['products'].result;

        });
  }

  // loadProducts(){
  //   this.productSevice.getProducts().subscribe((products: Product[]) =>{
  //       this.products = products;
  //     }, err => {
  //       this.alertity.error(err);
  //     });
  // }
}
