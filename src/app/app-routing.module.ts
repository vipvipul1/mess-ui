import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRouteGuardService } from './app-service/route-guard/login-route-guard.service';
import { RouteGuardService } from './app-service/route-guard/route-guard.service';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [LoginRouteGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [LoginRouteGuardService]},
  {path: 'homepage/:username', component: HomepageComponent, canActivate: [RouteGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginRouteGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
