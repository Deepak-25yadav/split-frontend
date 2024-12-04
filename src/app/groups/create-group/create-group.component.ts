import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
})
export class CreateGroupComponent implements OnInit {
  friends: any[] = [];
  selectedFriends: any[] = [];
  loading: boolean = false;
  groupName: string = '';

  constructor(private groupsService: GroupsService) {}

  ngOnInit(): void {
    this.fetchFriendsList();
  }

  createGroup(): void {
    if (!this.groupName.trim() || this.selectedFriends.length === 0) {
      alert('Please enter a group name and select at least one friend.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated. Please log in.');
      return;
    }

    const groupPayload = {
      groupName: this.groupName,
      groupMembers: this.selectedFriends,
    };

    this.loading = true;

    this.groupsService.createGroup(groupPayload, token).subscribe({
      next: (response) => {
        this.loading = false;
        alert('Group created successfully!');
        this.groupName = '';
        this.selectedFriends = [];
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to create group:', err);
        alert('Failed to create group. Please try again.');
      },
    });
  }

  fetchFriendsList(): void {
    const token = localStorage.getItem('token');
    this.groupsService.getFriends(token).subscribe({
      next: (data: any) => {
        this.friends = data.friends;
      },
      error: (err: any) => {
        console.error('Failed to fetch friends:', err);
      },
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


