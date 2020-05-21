import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { ProductService } from 'src/app/_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Manufacturer } from 'src/app/_models/Manufacturer';
import { ManufacturerService } from 'src/app/_services/manufacturer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router,
              private toastrService: ToastrService, private manufacturerService: ManufacturerService) { }
  @ViewChild('form') form: NgForm;
  product: Product;

  proSelected: any;
  // tslint:disable-next-line: ban-types
  manufacturers: Manufacturer[];

  @HostListener('window:beforeunload', ['$event'])
  unloadNotify($event: any){
    if  (this.form.dirty){
      $event.returnValue = true;
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data.product;
    });

    this.manufacturerService.getManufacturers().subscribe(result => {
      this.manufacturers = result;
    }, err => {
      this.toastrService.error(err);
    });

    this.proSelected = 1;
    console.log(this.proSelected);
  }

  updateProduct(){
    this.product.idManufacturer = this.proSelected;
    this.productService.updateProduct(this.product.idProduct, this.product).subscribe( next => {
      this.toastrService.success('Cập nhật thông tin thành công');
      this.form.reset(this.product);
    }, err => {
      this.toastrService.error(err);
    });

  }

  navigateToPage(){
    this.router.navigate(['admin/products']);
  }
}
