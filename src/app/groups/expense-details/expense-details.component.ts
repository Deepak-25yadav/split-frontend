
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { GroupsService } from '../groups.service';

import Swal from 'sweetalert2';

import {jwtDecode} from 'jwt-decode'; 

import { GroupMember } from 'src/app/models/group-member.model';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css'],
})
export class ExpenseDetailsComponent implements OnInit {

  expenseDetails: any;

  groupMembers: GroupMember[] = [];

  errorMessage: string = '';

  
  totalPaid: number = 0;

  totalRemaining: number = 0;

  paidCount: number = 0;

  totalMembers: number = 0;

  currentUserId: string = ''; 

  constructor(private route: ActivatedRoute, private groupsService: GroupsService) {}





  ngOnInit(): void {

    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.currentUserId = decodedToken.userId;
    }

    const expenseId = this.route.snapshot.paramMap.get('expenseId');
    if (expenseId) {
      this.fetchExpenseDetails(expenseId);
    }

  }






  fetchExpenseDetails(expenseId: string): void {

    this.groupsService.getExpenseDetails(expenseId).subscribe(
      (response) => {

        this.expenseDetails = response.expense;

        this.groupMembers = response.expense.groupMembers;

        this.calculatePaymentStats();

        console.log('Expense Details:', this.expenseDetails);
      },
      (error) => {
        this.errorMessage = 'Failed to fetch expense details. Please try again.';
        console.error(error);
      }
    );
  }







  calculatePaymentStats(): void {

    let paidAmount = 0;

    let paidCount = 0;

    this.totalMembers = this.groupMembers.length;

    this.groupMembers.forEach((member) => {

      if (member.paymentStatus) {
        paidAmount += member.paymentAmount;
        paidCount++;
      }

    });

    this.totalPaid = paidAmount;

    this.totalRemaining = this.expenseDetails.totalAmount - this.totalPaid;

    this.paidCount = paidCount;

  }





  calculatePaidPercentage(): number {
    return (this.totalPaid / this.expenseDetails.totalAmount) * 100;
  }




  sendReminder(): void {
    alert('Reminder has been sent to unpaid members');
  }




  isCurrentUser(memberId: string): boolean {
    return this.currentUserId === memberId;
  }





  confirmPayment(groupMemberId: string): void {

    Swal.fire({
      title: 'Are you sure?',

      text: 'Do you want to mark your payment as paid?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, pay!',

      cancelButtonText: 'Cancel',

    }).then((result) => {
      if (result.isConfirmed) {
        this.makePayment(groupMemberId);
      }
    });
  }







  makePayment(groupMemberId: string): void {

    const payload = {

      expenseId: this.expenseDetails._id,

      groupMemberId,

    };

    this.groupsService.updatePaymentStatus(payload).subscribe(

      (response) => {

        Swal.fire('Success', response.message, 'success');

        this.fetchExpenseDetails(this.expenseDetails._id); // Refresh expense details
      },
      (error) => {
        console.error(error);
        Swal.fire('Error', error.message || 'Something went wrong', 'error');
      }
    );
  }



}



