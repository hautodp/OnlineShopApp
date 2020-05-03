import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Product } from '../_models/Product';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class UserEditResolver implements Resolve<User>{
  constructor(private userService: UserService, private authService: AuthService,
              private router: Router, private alertify: AlertifyService){}
  resolve(route: ActivatedRouteSnapshot): Observable<User>{
    console.log(this.authService.decodedToken.nameid);
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error('Đã xảy ra lỗi');
        this.router.navigate(['/home']);

        return of(null);
      })
    );
  }
}
