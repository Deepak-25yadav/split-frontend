
import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  friends: any[] = [];
  selectedFriends: any[] = [];
  loading: boolean = false;
  groupName: string = '';

  constructor(private groupsService: GroupsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchFriendsList();
  }

  createGroup(): void {
    if (!this.groupName.trim() || this.selectedFriends.length === 0) {
      Swal.fire('Error', 'Please enter a group name and select at least one friend.', 'error');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire('Error', 'User not authenticated. Please log in.', 'error');
      return;
    }

    const groupPayload = {
      groupName: this.groupName,
      groupMembers: this.selectedFriends
    };

    this.loading = true;
    this.groupsService.createGroup(groupPayload, token).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire('Success', 'Group created successfully!', 'success');

        this.groupsService.getGroups(); // Fetch updated group list
        this.router.navigate(['/groups']); // Redirect to groups page
      },
      error: (err) => {
        this.loading = false;
        Swal.fire('Error', 'Failed to create group. Please try again.', 'error');
        console.error('Failed to create group:', err);
      }
    });
  }

  fetchFriendsList(): void {
    // const token = localStorage.getItem('token');
    this.groupsService.getFriends().subscribe({
      next: (data: any) => {
        this.friends = data.friends;
      },
      error: (err: any) => {
        console.error('Failed to fetch friends:', err);
      }
    });
  }

  onCheckboxChange(friend: any, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.checked) {
      this.selectedFriends.push(friend);
    } else {
      this.selectedFriends = this.selectedFriends.filter(
        (f) => f._id !== friend._id
      );
    }
  }

  getSelectedFriendNames(): string {
    return this.selectedFriends.map((f) => f.name).join(', ') || 'None';
  }
}




