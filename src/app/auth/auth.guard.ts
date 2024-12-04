
import { Injectable } from '@angular/core';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = localStorage.getItem('token');




    if (token) {

      if (state.url === '/home') {
        this.router.navigate(['/groups']); 
        return false;
      }

      return true; 

    } else {

      if (state.url !== '/home') {
        this.router.navigate(['/home']); 
        return false;
      }

      return true; 
    }
    

  }



}



