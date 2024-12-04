import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private addFriendUrl = 'https://split-backend-zy86.onrender.com/api/user/add-friend';

  private friendsListUrl = 'https://split-backend-zy86.onrender.com/api/user/friends';

  constructor(private http: HttpClient) {}



  addFriend(friendEmail: string, token: string | null): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.addFriendUrl, { friendEmail }, { headers });

  }



  
  getFriends(token: string | null): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(this.friendsListUrl, { headers });
  }


}


