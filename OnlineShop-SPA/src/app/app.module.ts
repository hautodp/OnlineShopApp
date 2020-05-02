import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { AlertifyService } from './_services/alertify.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { CarouselModule } from 'ngx-bootstrap/carousel';

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

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      ProductComponent,
      ProductListComponent,
      SliderComponent,
      ProductDetailComponent,
      InfoUserComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      CarouselModule.forRoot()
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      ProductService,
      AuthGuard,
      ProductDetailResolver,
      AlertifyService,
      ProductListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
