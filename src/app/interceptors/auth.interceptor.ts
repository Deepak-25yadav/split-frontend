
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpBackend
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

 private baseUrl= environment.baseUrl

  private excludedUrls: string[] = [
    // 'https://split-backend-zy86.onrender.com/api/user/friends' 
    // `${this.baseUrl}/user/friends`
  ];

  constructor(private httpBackend: HttpBackend) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const isExcluded = this.excludedUrls.some(url => req.url.includes(url));

    if (isExcluded) {
      // Directly send the request using HttpBackend to bypass interceptors
      return this.httpBackend.handle(req);
    }

    
    const token = localStorage.getItem('token');

    if (token) {
      // Clone and modify the request to add Authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }

    // If no token, proceed with the original request
    return next.handle(req);
  }
}

