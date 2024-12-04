import { Component, OnInit } from '@angular/core';

import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  userData: any = null;

  errorMessage: string = '';

  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }


  fetchUserDetails(): void {
    this.accountsService.getUserDetails().subscribe({
      next: (response: any) => {

        this.userData = response.userData;
        
      },
      error: (err: any) => {
        console.error('Failed to fetch user details:', err);
        this.errorMessage = 'Failed to load user details. Please try again later.';
      }
    });
  }
}
