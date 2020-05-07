import { Injectable } from '@angular/core';
import { ProductSelection } from './ProductSelection';
import { Product } from './Product';
import { Repository } from './Repository';

@Injectable()
export class Cart {
  selections: ProductSelection[] = [];
  itemCount = 0;
  totalPrice = 0;

  constructor(private repo: Repository) {
    repo.getSessionData<ProductSelection[]>('cart').subscribe(cartData => {
      if (cartData != null) {
          cartData.forEach(item => this.selections.push(item));
          this.update(false);
          console.log("cartData");
      }else{
        console.log("111");
      }
    });
  }

  addProduct(product: Product){
    // tslint:disable-next-line: triple-equals
    const selection = this.selections.find(p => p.idProduct == product.idProduct);
    if (selection){
      selection.quantity++;
    }else{
      this.selections.push(new ProductSelection(this,
        product.idProduct, product.name, product.price,
        product.photoURL, 1
      ));
    }
    this.update();
  }

  updateQuantity(idProduct: number, quantity: number){
    if (quantity > 0){
      const selection = this.selections.find(p => p.idProduct == idProduct);
      if (selection){
        selection.quantity = quantity;
      }
    }else{
      const index = this.selections.findIndex(p => p.idProduct == idProduct);
      // tslint:disable-next-line: triple-equals
      if (index != -1){
        this.selections.splice(index, 1);
      }
      this.update();
    }
  }

  clear(){
    this.selections = [];
    this.update();
  }

  update(storeData: boolean = true) {
    this.itemCount = this.selections.map(ps => ps.quantity)
      .reduce((prev, curr) => prev + curr, 0);
    this.totalPrice = this.selections.map(ps => ps.price * ps.quantity)
      .reduce((prev, curr) => prev + curr, 0);
    if (storeData) {
      this.repo.storeSessionData("cart", this.selections.map(s => {
        return {
          idProduct: s.idProduct, name: s.name,
          price: s.price, photoURL: s.photoURL, quantity: s.quantity
        }
    }));
    }
  }
}
