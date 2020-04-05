import {Routes} from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { AuthGuard } from './app/_guards/auth.guard';


export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [

      ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
