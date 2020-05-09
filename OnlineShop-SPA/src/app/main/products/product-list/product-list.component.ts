import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { ProductService } from 'src/app/_services/product.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SearchService } from 'src/app/_services/search.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  pagination: Pagination;
  userParams: any = {};

  constructor(private productSevice: ProductService, private alertity: AlertifyService,
              private route: ActivatedRoute, private dataSearch: SearchService) { }

  ngOnInit(): void{
        this.route.data.subscribe(data => {
            this.products = data.products.result;
            this.pagination = data.products.pagination;
        });

        this.route.paramMap.subscribe((params: ParamMap) => {
          this.userParams.name = params.get('nameSearch');
          console.log(params.get('nameSearch'));
        })

        this.userParams.minPrice = 5000000;
        this.userParams.maxPrice = 200000000;
        this.userParams.orderBy = '';
        this.userParams.name = this.dataSearch.nameSearch;
        // console.log(this.route.snapshot.paramMap.get('nameSearch'));
        // this.userParams.idmanufacturer = this.dataSearch.int;
        // console.log(this.dataSearch.nameSearch);
        this.loadProducts();
  }
  pageChanged(event: any): void{
      this.pagination.currentPage = event.page;
      this.loadProducts();
  }

  resetFilter(){
    this.userParams.minPrice = 5000000;
    this.userParams.maxPrice = 100000000;
    this.userParams.orderBy = '';
    this.userParams.name = '';
    this.userParams.idmanufacturer = 5;
    this.loadProducts();
  }

  loadProducts(){
    this.productSevice.getProducts(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<Product[]>) => {
      // console.log(this.userParams);
      this.products = res.result;
      this.pagination = res.pagination;
      }, err => {
        this.alertity.error(err);
      });
  }
}
