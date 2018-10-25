import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivitiesComponent} from './activities/activities.component';
import {UserComponent} from './user/user.component';
import { HomeRoutingModule } from './home-routing.module';
import { ActivitiesCanDeactivateGuardService } from './activities/activities-can-deactivate.service';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DataService } from './../shared/data.service';
import {TokenInterceptorService} from './../shared/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatToolbarModule,MatCardModule,MatTooltipModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { NgxDnDModule } from '@swimlane/ngx-dnd';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    NgxDnDModule,
    NgxInfiniteScrollerModule,
    MatTooltipModule
  ],
  declarations: [
    ActivitiesComponent,
    UserComponent
  ],
  providers: [DataService,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }, ActivitiesCanDeactivateGuardService],
})
export class HomeModule { }
