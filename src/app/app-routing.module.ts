import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { FoodListingComponent } from './food-listing/food-listing.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FriendComponent } from './friend/friend.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { SettingsComponent } from './settings/settings.component';
import { TrackingComponent } from './tracking/tracking.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [ 
  {path: '', component: FeedComponent},
  {path: 'api/v1/register', component: RegistrationComponent},
  {path: 'api/v1/login', component: LoginComponent},
  {path: 'api/v1/forgotpassword', component: ForgotPasswordComponent},
  {path: 'api/v1/users', component: UsersComponent},
  {path: 'api/v1/user/:uid', component: ProfileComponent},
  {path: 'api/v1/settings', component: SettingsComponent},
  {path: 'api/v1/feed', component: FeedComponent},
  {path: 'api/v1/feed/:state', component: FeedComponent},
  {path: 'api/v1/orders/:oid', component: OrderComponent},
  {path: 'api/v1/orders/:oid/status', component: TrackingComponent},
  {path: 'api/v1/friends', component: FriendComponent},
  {path: 'api/v1/foodlisting/:location', component: FoodListingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
