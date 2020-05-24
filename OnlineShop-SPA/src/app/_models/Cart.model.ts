import { Injectable } from '@angular/core';
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
            }
        });
    }

    addProduct(product: Product) {
        const selection = this.selections
            .find(ps => ps.idProduct == product.idProduct);
        if (selection) {
            selection.quantity++;
        } else {
            this.selections.push(new ProductSelection(this,
                product.idProduct, product.name,
                product.price, product.photoURL, 1));
        }
        this.update();
    }

    updateQuantity(idProduct: number, quantity: number) {
        if (quantity > 0) {
            const selection = this.selections.find(ps => ps.idProduct == idProduct);
            if (selection) {
                selection.quantity = quantity;
            }
        } else {
            const index = this.selections.findIndex(ps => ps.idProduct == idProduct);
            if (index != -1) {
                this.selections.splice(index, 1);
            }
            this.update();
        }
    }

    clear() {
        this.selections = [];
        this.update();
    }

    update(storeData: boolean = true) {
        this.itemCount = this.selections.map(ps => ps.quantity)
            .reduce((prev, curr) => prev + curr, 0);
        this.totalPrice = this.selections.map(ps => ps.price * ps.quantity)
            .reduce((prev, curr) => prev + curr, 0);
        if (storeData) {
            this.repo.storeSessionData('cart', this.selections.map(s => {
                return {
                  idProduct: s.idProduct, name: s.name,
                    price: s.price, photoURL: s.photoURL, quantity: s.quantity
                };
            }));
        }
    }
}

export class ProductSelection {

  constructor(public cart: Cart,
              public idProduct?: number,
              public name?: string,
              public price?: number,
              public  photoURL?: string,
              private quantityValue?: number){}

  get quantity(){
    return this.quantityValue;
  }

  set quantity(newQuantity: number){
    this.quantityValue = newQuantity;
    this.cart.update();
  }
}
