import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRouteGuardService } from './app-service/route-guard/login-route-guard.service';
import { RouteGuardService } from './app-service/route-guard/route-guard.service';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddDepositComponent } from './mess-deposit/add-deposit/add-deposit.component';
import { MessDepositComponent } from './mess-deposit/mess-deposit.component';
import { ViewDepositComponent } from './mess-deposit/view-deposit/view-deposit.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [LoginRouteGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [LoginRouteGuardService]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginRouteGuardService]},

  {path: 'homepage/:fullName', component: HomepageComponent, canActivate: [RouteGuardService]},
  {path: 'messExpense', component: ManageUsersComponent, canActivate: [RouteGuardService]},
  {path: 'monthlyMeal', component: ManageUsersComponent, canActivate: [RouteGuardService]},
  {path: 'editMeal', component: ManageUsersComponent, canActivate: [RouteGuardService]},
  {path: 'messDeposit', component: MessDepositComponent, canActivate: [RouteGuardService], children: [
    {path: 'addDeposit', component: AddDepositComponent, canActivate:[RouteGuardService]},
    {path: 'viewDeposit', component: ViewDepositComponent, canActivate:[RouteGuardService]}
  ]},
  {path: 'messReport', component: ManageUsersComponent, canActivate: [RouteGuardService]},
  {path: 'manageUsers', component: ManageUsersComponent, canActivate: [RouteGuardService]},

  {path: 'profile', component: ManageUsersComponent, canActivate: [RouteGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
