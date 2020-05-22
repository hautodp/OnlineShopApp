import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Manufacturer } from '../_models/Manufacturer';
import { ManufacturerService } from '../_services/manufacturer.service';

@Injectable()
export class ManufacturerListResolver implements Resolve<Manufacturer[]>{
  constructor(private manufacturerService: ManufacturerService,
              private router: Router, private alertify: AlertifyService){}

  resolve(route: ActivatedRouteSnapshot): Observable<Manufacturer[]>{
    return this.manufacturerService.getManufacturers().pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
