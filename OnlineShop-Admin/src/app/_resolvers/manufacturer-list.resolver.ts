import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ManufacturerService } from '../_services/manufacturer.service';
import { Manufacturer } from '../_models/Manufacturer';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ManufacturerListResolver implements Resolve<Manufacturer[]>{
  constructor(private manufacturerService: ManufacturerService,
              private router: Router, private toastrService: ToastrService){}

  resolve(route: ActivatedRouteSnapshot): Observable<Manufacturer[]>{
    return this.manufacturerService.getManufacturers().pipe(
      catchError(error => {
        this.toastrService.error('Problem retrieving data');
        this.router.navigate(['admin/home']);
        return of(null);
      })
    );
  }
}
