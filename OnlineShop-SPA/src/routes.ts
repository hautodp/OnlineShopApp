import {Routes} from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { AuthGuard } from './app/_guards/auth.guard';
import { ProductDetailComponent } from './app/main/products/product-detail/product-detail.component';
import { ProductDetailResolver } from './app/_resolvers/product-detail.resolver';
import { InfoUserComponent } from './app/info-user/info-user.component';
import { UserEditResolver } from './app/_resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './app/_guards/prevent-unsaved-changes.guard';
import { PaymentComponent } from './app/payment/payment.component';
import { ShoppingCartComponent } from './app/shopping-cart/shopping-cart.component';
import { ProductListComponent } from './app/main/products/product-list/product-list.component';
import { ProductListResolver } from './app/_resolvers/product-list.resolver';
import { UserOrdersComponent } from './app/UserOrders/UserOrders.component';
import { UserOderDetailComponent } from './app/UserOderDetail/UserOderDetail.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'products', component: ProductListComponent,
        resolve: {products: ProductListResolver}},
    {path: 'products/:idProduct', component: ProductDetailComponent,
        resolve: {product: ProductDetailResolver}},
    { path: '',   redirectTo: '/home', pathMatch: 'full'},
    {path: 'cart', component: ShoppingCartComponent},
    //
    // { path: '',   redirectTo: '/home', pathMatch: 'full' },
    {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        {path: 'user/edit', component: InfoUserComponent, resolve: {user: UserEditResolver},
          canDeactivate: [PreventUnsavedChanges]},
          {path: 'payment', component: PaymentComponent},
          {path: 'payment/order', component: UserOrdersComponent},
          {path: 'payment/order/detail/:idOrder', component: UserOderDetailComponent}
      ]
    },
    // {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
