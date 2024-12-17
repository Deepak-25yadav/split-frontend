import { Component } from '@angular/core';

import { FriendsService } from './friends.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  loading = false;
  friendEmail: string = '';

  constructor(private friendsService: FriendsService) {}

  addFriend() {
    if (!this.friendEmail) {
      Swal.fire('Error', 'Please enter a valid email address.', 'error');
      return;
    }

    this.loading = true;

    this.friendsService.addFriend(this.friendEmail).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire('Success', 'Friend added successfully!', 'success');
        this.friendEmail = '';

        // Refresh the friends list
        this.friendsService.refreshFriendsList();
      },
      error: (err) => {
        this.loading = false;
        Swal.fire('Error', err.error.message || 'Failed to add friend.', 'error');
      }
    });
  }
}






