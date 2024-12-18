import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  
  private baseUrl = environment.baseUrl

  private apiUrl = `${this.baseUrl}/groups/`;
  private friendsListUrl = `${this.baseUrl}/user/friends`;
  private expensesUrl = `${this.baseUrl}/expenses/`

  
  // private apiUrl = 'https://split-backend-zy86.onrender.com/api/groups/';
  // private friendsListUrl = 'https://split-backend-zy86.onrender.com/api/user/friends';
  // private expensesUrl = 'https://split-backend-zy86.onrender.com/api/expenses/';


  // BehaviorSubject to manage the group list in real-time
  private groupsListSubject = new BehaviorSubject<any[]>([]);
  groupsList$ = this.groupsListSubject.asObservable();

  constructor(private http: HttpClient) {}

  
  getGroups(): void {
    
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        this.groupsListSubject.next(response.groups); // Emit updated group list
      },
      error: (err) => {
        console.error('Failed to fetch groups:', err);
      }
    });
  }

  

  getGroupDetails(groupId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${groupId}`);
  }

  
  getFriends(): Observable<any> {
    return this.http.get(this.friendsListUrl);
  }

  
  createGroup(groupPayload: any, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}create`, groupPayload);
  }

  
  getGroupExpenses(groupId: string): Observable<any> {
    return this.http.get(`${this.expensesUrl}${groupId}`);
  }

  
  createGroupExpense(expensePayload: any): Observable<any> {
    return this.http.post(
      // 'https://split-backend-zy86.onrender.com/api/expenses/create-group-expense',
      `${this.expensesUrl}/create-group-expense`,
      expensePayload,
    );
  }

  
  getExpenseDetails(expenseId: string): Observable<any> {
    return this.http.get(
      // `https://split-backend-zy86.onrender.com/api/expenses/single-expense-details/${expenseId}`
      `${this.expensesUrl}/single-expense-details/${expenseId}`
    );
  }

  
  updatePaymentStatus(payload: { expenseId: string; groupMemberId: string }): Observable<any> {
    return this.http.patch(
      // 'https://split-backend-zy86.onrender.com/api/expenses/update-payment-status',
      `${this.expensesUrl}/update-payment-status`,
      payload
    );
  }

  
  refreshGroups(): void {
    this.getGroups(); 
  }
}


