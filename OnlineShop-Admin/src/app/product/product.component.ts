import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/Product';
import { ProductService } from '../_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductService, private toastrService: ToastrService,
              private router: Router, private alertifyService: AlertifyService ) { }

  ngOnInit(): void {
    this.loadProducts();
  }


  navigateToHome(){
    this.router.navigate(['admin/home']);
  }

  loadProducts(){
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    }, err => {
      this.toastrService.error(err);
    });
  }

  deleteProduct(id: number){
    this.alertifyService.confirm('Bạn có muốn xóa Sản phẩm vừa chọn', () => {
      this.productService.deleteProduct(id).subscribe(
        () => {
        this.products.splice(this.products.findIndex(m => m.idProduct === id), 1);
        this.toastrService.info('Xóa thành công');
        },
        err => {
          this.toastrService.error('Xóa thất bại');
        }
      );
    });
  }
}
