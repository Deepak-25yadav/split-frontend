import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { GroupsService } from '../groups.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-group-expenses',
  templateUrl: './create-group-expenses.component.html',
  styleUrls: ['./create-group-expenses.component.css'],
})
export class CreateGroupExpensesComponent implements OnInit {

  groupId!: string;

  groupMembers: any[] = [];

  totalAmount: number = 0;

  expenseDescription: string = '';

  splitMethod: string = 'evenly'; // by default will be this split method

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private router: Router
  ) {}



  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('groupId')!;
    this.fetchGroupDetails(this.groupId);
  }



  fetchGroupDetails(groupId: string): void {


    this.groupsService.getGroupDetails(groupId).subscribe(
      (response) => {
        const groupDetails = response.group;
        console.log("groupDetails coming from backend", response.group)

        this.groupMembers = groupDetails.groupMembers.map((member: any) => ({

          _id: member._id,

          name: member.name,

          email: member.email,

          paymentAmount: 0,

          paymentStatus: false,

          selected: true,
           
          share: 0,

          percentage: 0,

        }));
        this.calculatePaymentAmounts();
      },
      (error) => {
        Swal.fire('Error', 'Failed to fetch group details. Please try again.', 'error');
        console.error(error);
      }
    );
  }








  setSplitMethod(method: string): void {

    this.splitMethod = method;

    if (method === 'evenly') {

      this.calculatePaymentAmounts();

    } else if (method === 'unevenly') {

      this.resetUnevenSplit();

    }
  }








  calculatePaymentAmounts(): void {

    const selectedMembers = this.groupMembers.filter((member) => member.selected);

    if (selectedMembers.length > 0) {

      const equalShare = this.totalAmount / selectedMembers.length;

      this.groupMembers.forEach((member) => {

        if (member.selected) {

          member.paymentAmount = equalShare;

        } else {

          member.paymentAmount = 0;

        }
      });
    } else {

      this.groupMembers.forEach((member) => {

        member.paymentAmount = 0;

      });
    }
  }






  resetUnevenSplit(): void {

    this.groupMembers.forEach((member) => {

      if (member.selected) {
        member.paymentAmount = 0;
      }

    });
  }






  calculateUnevenSplit(): void {

    const selectedMembers = this.groupMembers.filter((member) => member.selected);

    selectedMembers.forEach((member) => {

      if (!member.paymentAmount) {
        member.paymentAmount = 0;
      }

    });

  }







  calculateShareSplit(): void {

    const selectedMembers = this.groupMembers.filter((member) => member.selected);

    const totalShares = selectedMembers.reduce((sum, member) => sum + (member.share || 0), 0);


    if (totalShares > 0) {

      selectedMembers.forEach((member) => {
        member.paymentAmount = (this.totalAmount * (member.share || 0)) / totalShares;
      });

    } else {
      selectedMembers.forEach((member) => (member.paymentAmount = 0));
    }

  }






  calculatePercentageSplit(): void {

    const selectedMembers = this.groupMembers.filter((member) => member.selected);

    selectedMembers.forEach((member) => {

      member.paymentAmount = (this.totalAmount * (member.percentage || 0)) / 100;

    });
  }





  validatePercentageOnSubmit(): boolean {

    if (this.splitMethod === 'by-percentage') {

      const selectedMembers = this.groupMembers.filter((member) => member.selected);

      const totalPercentage = selectedMembers.reduce(
        (sum, member) => sum + (member.percentage || 0),
        0
      );


      if (totalPercentage > 100) {
        Swal.fire('Error', 'Total percentage exceeds 100%. Please adjust.', 'error');
        return false;
      }


      if (totalPercentage < 100) {
        Swal.fire('Error', 'Total percentage is less than 100%. Please adjust.', 'error');
        return false;
      }

    }

    return true;
  }









  createExpense(event: Event): void {

    event.preventDefault();

    if (!this.totalAmount || !this.expenseDescription) {
      Swal.fire('Error', 'Please fill all required fields.', 'error');
      return;
    }

    const selectedMembers = this.groupMembers.filter((member) => member.selected);


    if (selectedMembers.length === 0) {
      Swal.fire('Error', 'Minimum one person should participate in the split expense.', 'error');
      return;
    }


    if (this.splitMethod === 'unevenly') {

      const totalSplitAmount = selectedMembers.reduce(
        (sum, member) => sum + member.paymentAmount,
        0
      );

      if (totalSplitAmount !== this.totalAmount) {
        Swal.fire(
          'Error',
          'The total split amount must be equal to the total expense amount.',
          'error'
        );
        return;
      }

    }


    if (!this.validatePercentageOnSubmit()) {
      return;
    }


    const expensePayload = {

      groupId: this.groupId,

      totalAmount: this.totalAmount,

      expenseDescription: this.expenseDescription,


      groupMembers: selectedMembers.map((member) => ({
        _id: member._id,

        name: member.name,

        email: member.email,

        paymentAmount: member.paymentAmount,

        paymentStatus: member.paymentStatus,
      })),

    };


    this.groupsService.createGroupExpense(expensePayload).subscribe(
      (response) => {
        Swal.fire(
          'Success',
          `Expense "${response.expense.expenseDescription}" of ₹${response.expense.totalAmount} created successfully!`,
          'success'
        ).then(() => {
          this.router.navigate(['/groups/details', this.groupId]);
        });
      },
      (error) => {
        Swal.fire('Error', 'Failed to create expense. Please try again.', 'error');
        console.error(error);
      }
    );


  }

}


