import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { AlertifyService } from './_services/alertify.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './_services/error.inteceptor';
import { appRoutes } from 'src/routes';
import { SliderComponent } from './main/slider/slider.component';
import { ProductComponent } from './main/products/product/product.component';
import { ProductListComponent } from './main/products/product-list/product-list.component';
import { ProductDetailComponent } from './main/products/product-detail/product-detail.component';
import { ProductDetailResolver } from './_resolvers/product-detail.resolver';
import { ProductService } from './_services/product.service';
import { AuthGuard } from './_guards/auth.guard';
import { ProductListResolver } from './_resolvers/product-list.resolver';
import { InfoUserComponent } from './info-user/info-user.component';
import { UserService } from './_services/user.service';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ManufacturerListResolver } from './_resolvers/manufacturer-list.resolver';
import { ManufacturerService } from './_services/manufacturer.service';
import { PaymentComponent } from './payment/payment.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { Cart } from './_models/Cart.model';
import { Repository } from './_models/Repository';
import { ManufacturerListComponent } from './main/manufacturers/manufacturer-list/manufacturer-list.component';
import { CommonModule } from '@angular/common';
import { UserOderDetailComponent } from './UserOderDetail/UserOderDetail.component';
import { UserOrdersComponent } from './UserOrders/UserOrders.component';
import { UserOrdersService } from './_services/userOrders.service';
import { OrderDetailService } from './_services/orderDetail.service';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      ProductComponent,
      ProductListComponent,
      SliderComponent,
      ProductDetailComponent,
      InfoUserComponent,
      PaymentComponent,
      ShoppingCartComponent,
	    UserOderDetailComponent,
      UserOrdersComponent,
      ManufacturerListComponent
    ],
   imports: [
      CommonModule,
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      ButtonsModule.forRoot(),
      PaginationModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      CarouselModule.forRoot(),
      JwtModule.forRoot({
        config: {
          tokenGetter,
          whitelistedDomains: ['localhost:5000'],
          blacklistedRoutes: ['localhost:5000/api/auth']
        }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      ProductService,
      UserService,
      AuthGuard,
      ProductDetailResolver,
      AlertifyService,
      ProductListResolver,
      UserEditResolver,
      PreventUnsavedChanges,
      ManufacturerListResolver,
      ManufacturerService,
      Cart,
      Repository,
      UserOrdersService,
      OrderDetailService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
