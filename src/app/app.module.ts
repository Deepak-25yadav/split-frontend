
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';

import { SignupComponent } from './auth/signup/signup.component';

import { NavbarComponent } from './navbar/navbar.component';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { HomeComponent } from './home/home.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';


import { faUsers, faUserFriends, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthInterceptor } from './interceptors/auth.interceptor';



@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,

    SignupComponent,

    NavbarComponent,

    PagenotfoundComponent,

    HomeComponent,
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,

    BrowserAnimationsModule,

    HttpClientModule,

    ReactiveFormsModule,

    SweetAlert2Module.forRoot(),
    
    FontAwesomeModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIcons(faUsers, faUserFriends, faUserCircle, faSignOutAlt);
  }

}


