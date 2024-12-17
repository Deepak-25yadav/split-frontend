
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
    
    // Subscribe to friendsList$ to get updates
    this.friendsService.friendsList$.subscribe((data) => {
      this.friends = data;
    });

    // Initially fetch the friends list
    this.friendsService.getFriends();
  }
}



