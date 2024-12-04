
import { Component, OnInit } from '@angular/core';

import { GroupsService } from './groups.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: any[] = [];

  errorMessage: string = '';

  constructor(private groupsService: GroupsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchGroups();
  }

  fetchGroups(): void {

    this.groupsService.getGroups().subscribe(
      (response) => {
        this.groups = response.groups;
        console.log("response.groups", response.groups);
      },
      (error) => {
        this.errorMessage = 'Failed to fetch groups. Please try again.';
        console.error(error);
      }
    );

  }

  // viewGroupDetails(groupId: string): void {
  //   this.router.navigate(['/groups/details', groupId]);
  // }


  viewGroupDetails(groupId: string): void {

    console.log('Navigating with Group ID:', groupId);

    if (!groupId) {

      console.error('Error: Group ID is undefined');

      return;
    }
    
    this.router.navigate(['/groups/details', groupId]);
  }

}




