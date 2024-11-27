
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
        this.router.navigate(['/groups']); // Redirect logged-in users to groups page
        return false;
      }
      return true; // Allow access to protected routes
    } else {
      if (state.url !== '/home') {
        this.router.navigate(['/home']); // Redirect non-logged-in users to home page
        return false;
      }
      return true; // Allow access to public routes
    }
  }
}



