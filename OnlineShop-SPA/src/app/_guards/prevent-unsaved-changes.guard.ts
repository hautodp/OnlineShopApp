import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { InfoUserComponent } from '../info-user/info-user.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<InfoUserComponent>{
  canDeactivate(component: InfoUserComponent){
    if (component.editForm.dirty){
      return confirm('Bạn có muốn tiếp tục hành động?');
    }
    return true;
  }
}
