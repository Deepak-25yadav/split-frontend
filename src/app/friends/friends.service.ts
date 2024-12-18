
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private baseUrl= environment.baseUrl

  private addFriendUrl = `${this.baseUrl}/user/add-friend`
  private friendsListUrl = `${this.baseUrl}/user/friends`

  // private addFriendUrl = 'https://split-backend-zy86.onrender.com/api/user/add-friend';
  // private friendsListUrl = 'https://split-backend-zy86.onrender.com/api/user/friends';

  // BehaviorSubject to manage updates to the friends list
  private friendsListSubject = new BehaviorSubject<any[]>([]);
  friendsList$ = this.friendsListSubject.asObservable();

  constructor(private http: HttpClient) {}

  addFriend(friendEmail: string): Observable<any> {
    return this.http.post(this.addFriendUrl, { friendEmail });
  }

  getFriends(): void {
    this.http.get<any>(this.friendsListUrl).subscribe({
      next: (response) => {
        this.friendsListSubject.next(response.friends); // Update the friends list
      },
      error: (err) => {
        console.error('Failed to fetch friends:', err);
      }
    });
  }

  refreshFriendsList(): void {
    this.getFriends(); // Refresh the friends list
  }
}




