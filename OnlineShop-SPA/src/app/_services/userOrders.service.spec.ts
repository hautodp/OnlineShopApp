/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserOrdersService } from './userOrders.service';

describe('Service: UserOrders', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserOrdersService]
    });
  });

  it('should ...', inject([UserOrdersService], (service: UserOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
