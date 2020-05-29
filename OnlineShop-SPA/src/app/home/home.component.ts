import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private productService: ProductService) { }
  listNewProducts: Product[];
  ngOnInit() {
      this.productService.getNewProducts().subscribe((data: Product[]) => this.listNewProducts = data);
      console.log(this.listNewProducts);
  }

}
