import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActivitiesComponent} from './activities/activities.component';
import {UserComponent} from './user/user.component';
import { ActivitiesCanDeactivateGuardService } from './activities/activities-can-deactivate.service';
const routes: Routes = [
  {
    path: 'userProfile/:id',
    component:UserComponent
  },
  {
    path: 'activities',
    component:ActivitiesComponent,
    canDeactivate: [ActivitiesCanDeactivateGuardService] 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
