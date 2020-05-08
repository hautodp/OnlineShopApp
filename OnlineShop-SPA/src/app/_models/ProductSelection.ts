import { Cart } from './Cart';

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
