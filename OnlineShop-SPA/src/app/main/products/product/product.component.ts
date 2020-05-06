import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  handleAddToCart(){
    this.cartService.sendMsg(this.product);
  }
}
