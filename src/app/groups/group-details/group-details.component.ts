import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  groupDetails: any;

  expenses: any[] = [];

  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private groupsService: GroupsService) {}

  ngOnInit(): void {

    const groupId = this.route.snapshot.paramMap.get('groupId');

    if (groupId) {

      this.fetchGroupDetails(groupId);

      this.fetchGroupExpenses(groupId);
    }

  }

  fetchGroupDetails(groupId: string): void {

    this.groupsService.getGroupDetails(groupId).subscribe(
      (response) => {
        this.groupDetails = response.group;
        console.log('Group Details:', this.groupDetails);
      },
      (error) => {
        this.errorMessage = 'Failed to fetch group details. Please try again.';
        console.error(error);
      }
    );

  }



  fetchGroupExpenses(groupId: string): void {

    this.groupsService.getGroupExpenses(groupId).subscribe(
      (response) => {
        this.expenses = response.expenses;
        console.log('Group Expenses:', this.expenses);
      },
      (error) => {
        this.errorMessage = 'Failed to fetch group expenses. Please try again.';
        console.error(error);
      }
    );

    
  }
}
