import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { ProductService } from 'src/app/_services/product.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(private productSevice: ProductService, private alertity: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.loadProducts();
    this.route.data.subscribe(data => {
      const pro = 'products';
      console.log(data);
      this.products = data[pro].result;
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
