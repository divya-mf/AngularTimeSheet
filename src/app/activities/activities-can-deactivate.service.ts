import {CanDeactivate} from '@angular/router';
import {ActivitiesComponent} from './activities.component';
import { Injectable } from '@angular/core';
@Injectable()
export class ActivitiesCanDeactivateGuardService implements CanDeactivate<ActivitiesComponent> 
{ canDeactivate(component: ActivitiesComponent):  boolean{
    if(component.activityForm.dirty || component.noteForm.dirty || component.editForm.dirty ){
        return confirm('Are you sure to discard changes?');
    }
    return true;
}
}