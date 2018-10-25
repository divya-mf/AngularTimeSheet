import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DataService } from './shared/data.service';
import {TokenInterceptorService} from './shared/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatToolbarModule,MatCardModule,MatTooltipModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { UserComponent } from './user/user.component';
import { ActivitiesComponent } from './activities/activities.component';
import { HeaderComponent } from './header/header.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { ActivitiesCanDeactivateGuardService } from './activities/activities-can-deactivate.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    ActivitiesComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  providers: [DataService,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }, ActivitiesCanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
