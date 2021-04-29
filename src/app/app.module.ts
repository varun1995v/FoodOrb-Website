import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { FoodListingComponent } from './food-listing/food-listing.component';
import { FeedComponent } from './feed/feed.component';
import { TrackingComponent } from './tracking/tracking.component';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { FriendComponent } from './friend/friend.component';
import { CookieService } from 'ngx-cookie-service';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    SettingsComponent,
    FoodListingComponent,
    FeedComponent,
    TrackingComponent,
    UsersComponent,
    FriendComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
