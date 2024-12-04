
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { GroupsComponent } from './groups.component';

import { CreateGroupComponent } from './create-group/create-group.component';

import { GroupDetailsComponent } from './group-details/group-details.component';

import { CreateGroupExpensesComponent } from './create-group-expenses/create-group-expenses.component';

import { ExpenseDetailsComponent } from './expense-details/expense-details.component';

const routes: Routes = [

  { path: '', component: GroupsComponent },

  { path: 'create', component: CreateGroupComponent },

  { path: 'details/:groupId', component: GroupDetailsComponent },

  {path:"create-expenses/:groupId", component:CreateGroupExpensesComponent},

  { path: 'expense-details/:expenseId', component: ExpenseDetailsComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}





