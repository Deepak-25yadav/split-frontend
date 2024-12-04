
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private apiUrl = 'https://split-backend-zy86.onrender.com/api/groups/';

  private friendsListUrl = 'https://split-backend-zy86.onrender.com/api/user/friends';

  private expensesUrl = 'https://split-backend-zy86.onrender.com/api/expenses/';

  constructor(private http: HttpClient) {}





  getGroups(): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(this.apiUrl, { headers });
  }




  getGroupDetails(groupId: string): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}${groupId}`, { headers });
  }



  getFriends(token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(this.friendsListUrl, { headers });
  }



  createGroup(groupPayload: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}create`, groupPayload, { headers });
  }




  getGroupExpenses(groupId: string): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.expensesUrl}${groupId}`, { headers });
  }




  createGroupExpense(expensePayload: any): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });


    return this.http.post('https://split-backend-zy86.onrender.com/api/expenses/create-group-expense', expensePayload, { headers });

  }


  getExpenseDetails(expenseId: string): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`https://split-backend-zy86.onrender.com/api/expenses/single-expense-details/${expenseId}`, { headers });

  }
  


  updatePaymentStatus(payload: { expenseId: string; groupMemberId: string }): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  
    return this.http.patch('https://split-backend-zy86.onrender.com/api/expenses/update-payment-status', payload, { headers });
    
  }
  



}
