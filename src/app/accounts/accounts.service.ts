import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private apiUrl="https://split-backend-zy86.onrender.com/api/user/user-details"

  constructor(private http:HttpClient) { }

getUserDetails(){
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  })
  return this.http.get(`${this.apiUrl}`, { headers });
}

}
