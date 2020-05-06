import { Component, OnInit } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { Product } from '../_models/Product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  productsInCart: Product[];
  constructor(private cartService: CartService) { }

  ngOnInit(): void {

  }
}
