
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'; 

import { GroupsRoutingModule } from './groups-routing.module';

import { GroupsComponent } from './groups.component';

import { GroupListComponent } from './group-list/group-list.component';

import { CreateGroupComponent } from './create-group/create-group.component';

import { GroupDetailsComponent } from './group-details/group-details.component';

import { CreateGroupExpensesComponent } from './create-group-expenses/create-group-expenses.component';

import { ExpenseDetailsComponent } from './expense-details/expense-details.component';

@NgModule({
  declarations: [
    GroupsComponent,

    GroupListComponent,

    CreateGroupComponent,

    GroupDetailsComponent,

    CreateGroupExpensesComponent,

    ExpenseDetailsComponent,
  ],
  imports: [
    CommonModule,

    FormsModule, 
    
    GroupsRoutingModule,
  ],
})
export class GroupsModule {}


