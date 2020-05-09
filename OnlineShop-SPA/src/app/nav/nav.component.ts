import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/User';
import { SearchService } from '../_services/search.service';
import { Manufactuerer } from '../_models/Manufactuerer';
import { Cart } from '../_models/Cart';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  display = 'none' ;
  //data search
  nameSearch: '';
  // show - hide password
  showButton = false;
  showEye = false;

  // login
  model: any = {};

  // register
  user: User;
  registerForm: FormGroup;

  constructor(public authService: AuthService, private cart: Cart,
              private alertify: AlertifyService, private fb: FormBuilder,
              private router: Router, private dataRoute: SearchService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      Username: new FormControl('', Validators.required),
      Password: new FormControl('',
        [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      ConfirmPassword: new FormControl('', Validators.required),
      // Email: new FormControl('', Validators.required)
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('Password').value === g.get('ConfirmPassword').value ? null : {mismatch: true};
  }

  openModalDialog(){
    this.display = 'block';
  }

  closeModalDialog(){
    this.display = 'none';
  }

  showPassword(){
    this.showButton = !this.showButton;
    this.showEye = !this.showEye;
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in Successfully');
      this.display = 'none';
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/home']);
    });
  }
  testSearch(){
    this.dataRoute.setData(this.nameSearch);
    console.log("data from nav: " + this.nameSearch);
    this.router.navigate(['/products']);
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logOut(){
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

  register(){
    if (this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Đăng ký thành công');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() =>{
          this.router.navigate(['/home']);
          this.closeModalDialog();
        });
      });
    }
  }

  get itemCount(): number{
    return this.cart.itemCount;
  }

  get totalPrice(): number{
    return this.cart.totalPrice;
  }
}
