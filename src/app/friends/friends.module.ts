import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './friends.component';
import { FriendListComponent } from './friend-list/friend-list.component';


@NgModule({
  declarations: [
    FriendsComponent,
    FriendListComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule
  ]
})
export class FriendsModule { }
