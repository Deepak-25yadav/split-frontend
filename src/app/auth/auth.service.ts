
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isAuthenticated$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  
private BaseUrl= environment.baseUrl

private baseUrl = `${this.BaseUrl}/user`

  // private baseUrl = 'https://split-backend-zy86.onrender.com/api/user';

  constructor(private http: HttpClient, private router:Router) {}


  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }


  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }


  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticated$.next(true); // Notify observers
  }


  logoutUser(): void {
    localStorage.removeItem('token');
    this.router.navigate(["/home"])
    this.isAuthenticated$.next(false); // Notify observers
  }



  isAuthenticated(): boolean {
    return this.isAuthenticated$.getValue();
  }


  get isAuth(): Observable<boolean> {
    return this.isAuthenticated$.asObservable(); // Public observable
  }
  
}


