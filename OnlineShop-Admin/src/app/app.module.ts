import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'routes';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './_services/error.inteceptor';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { CustomerComponent } from './customer/customer.component';
import { TemplateComponent } from './template/template.component';
import { ManufacturerListResolver } from './_resolvers/manufacturer-list.resolver';
import { ManufacturerService } from './_services/manufacturer.service';
import { AddManufacturerComponent } from './manufacturer/add-manufacturer/add-manufacturer.component';
import { AlertifyService } from './_services/alertify.service';
import { UpdateManufacturerComponent } from './manufacturer/update-manufacturer/update-manufacturer.component';
import { ManufacturerEditResolver } from './_resolvers/manufacturer-edit.resolver';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    OrderComponent,
    ProductComponent,
    ManufacturerComponent,
    CustomerComponent,
    TemplateComponent,
    AddManufacturerComponent,
    UpdateManufacturerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    ManufacturerListResolver,
    ManufacturerService,
    AlertifyService,
    ManufacturerEditResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
