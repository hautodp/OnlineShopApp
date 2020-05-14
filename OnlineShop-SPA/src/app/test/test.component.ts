import { Component, OnInit } from '@angular/core';
import { Cart, ProductSelection } from '../_models/Cart.model';
import { Repository } from '../_models/Repository';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  pro: ProductSelection[]=[];
  constructor(private repo: Repository, private cart: Cart) { }

  ngOnInit(): void {
  }

  addToCart(){
    this.repo.getSessionData("cart").subscribe((p: ProductSelection[])=>{
      this.pro=p;
    });
  }

}
