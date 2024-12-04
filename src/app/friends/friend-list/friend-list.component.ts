
import { Component, OnInit } from '@angular/core';

import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  friends: any[] = [];

  constructor(private friendsService: FriendsService) {}


  
  ngOnInit(): void {

    const token = localStorage.getItem('token');

    this.friendsService.getFriends(token).subscribe({
      next: (data) => {
        this.friends = data.friends;
        console.log("data.friends",data.friends)
      },
      error: (err) => {
        console.error('Failed to fetch friends:', err);
      }
    });
  }

}

