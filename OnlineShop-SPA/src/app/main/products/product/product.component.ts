import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { Repository } from 'src/app/_models/Repository';
import { Cart } from 'src/app/_models/Cart.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private repo: Repository, private cart: Cart) { }

  ngOnInit(): void {
  }

  handleAddToCart(){
    this.cart.addProduct(this.product);
  }
}
