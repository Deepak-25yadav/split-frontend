import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private baseUrl= environment.baseUrl
  private apiUrl = `${this.baseUrl}/user/user-details`
  // private apiUrl="https://split-backend-zy86.onrender.com/api/user/user-details"


  constructor(private http:HttpClient) { }

getUserDetails(){
  // const token = localStorage.getItem('token');
  // const headers = new HttpHeaders({
  //   Authorization: `Bearer ${token}`
  // })
  
  return this.http.get(`${this.apiUrl}`);
}

}
