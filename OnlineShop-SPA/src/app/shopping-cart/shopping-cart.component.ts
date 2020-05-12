import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/Product';
import { Cart } from '../_models/Cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  productsInCart: Product[];
  constructor(public cart: Cart) { }

  ngOnInit(): void {
  }

  get itemCount(): number{
    return this.cart.itemCount;
  }

  get totalPrice(): number{
    return this.cart.totalPrice;
  }
}
