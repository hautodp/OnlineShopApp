import {Routes} from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { AuthGuard } from './app/_guards/auth.guard';
import { ProductDetailComponent } from './app/main/products/product-detail/product-detail.component';
import { SliderComponent } from './app/main/slider/slider.component';
import { ProductDetailResolver } from './app/_resolvers/product-detail.resolver';
import { ProductListComponent } from './app/main/products/product-list/product-list.component';
import { ProductListResolver } from './app/_resolvers/product-list.resolver';


export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    // {path: 'products', component: ProductListComponent,
    //     resolve: {products: ProductListResolver}},
    {path: 'products/:idProduct', component: ProductDetailComponent,
        resolve: {product: ProductDetailResolver}},
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [

      ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
