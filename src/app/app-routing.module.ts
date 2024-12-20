

import { NgModule } from '@angular/core';

import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';

import { SignupComponent } from './auth/signup/signup.component';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'groups',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./groups/groups.module').then((m) => m.GroupsModule),
  },

  {
    path: 'friends',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./friends/friends.module').then((m) => m.FriendsModule),
  },

  {
    path: 'accounts',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./accounts/accounts.module').then((m) => m.AccountsModule),
  },

  { path: 'login', component: LoginComponent },

  { path: 'signup', component: SignupComponent },

  { path: 'home', component: HomeComponent },

  { path: '**', component: PagenotfoundComponent },
];

const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload', // Ensures the component reloads even if navigating to the same route
  scrollPositionRestoration: 'enabled', // Restores scroll position on navigation
};


@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

