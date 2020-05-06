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
  pagination: Pagination;
  userParams: any = {};
  constructor(private productSevice: ProductService, private alertity: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.products = data['products'].result;
            this.pagination = data['products'].pagination;
        });
        this.userParams.name = null;
        this.userParams.minPrice = 5000000;
        this.userParams.maxPrice = 100000000;
        this.userParams.orderBy = '';
  }
  pageChanged(event: any): void{
      this.pagination.currentPage = event.page;
      this.loadProducts();
  }

  resetFilter(){
    this.userParams.name = '';
    this.userParams.minPrice = 5000000;
    this.userParams.maxPrice = 100000000;
    this.userParams.orderBy = '';
    this.loadProducts();
  }
  loadProducts(){
    this.productSevice.getProducts(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<Product[]>) =>{
        this.products = res.result;
        this.pagination = res.pagination;
      }, err => {
        this.alertity.error(err);
      });
  }
}
