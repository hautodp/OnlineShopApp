import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { ProductService } from 'src/app/_services/product.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(private productSevice: ProductService, private alertity: AlertifyService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productSevice.getProducts().subscribe((products: Product[]) =>{
        this.products = products;
      }, err => {
        this.alertity.error(err);
      });
  }
}
