
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
    this.groupsService.groupsList$.subscribe((data) => {
      this.groups = data;
    });
    this.groupsService.getGroups();
  }

  viewGroupDetails(groupId: string): void {
    console.log('Navigating with Group ID:', groupId);
    if (!groupId) {
      console.error('Error: Group ID is undefined');
      return;
    }
    this.router.navigate(['/groups/details', groupId]);
  }
}
