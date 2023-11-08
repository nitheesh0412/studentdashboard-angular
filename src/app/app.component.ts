import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserdataService } from './services/userdata.service';
import { Subscription } from 'rxjs';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  events: string[] = [];
  opened! : boolean;
  title = 'studentdashboard';
  isExpanded : boolean = true;
  someusers = this._userdataservice.allUsers;
  constructor(private _userdataservice: UserdataService){

  }
  
userSubscription$ !: Subscription
  userAttendanceSubscription$ !: Subscription
  subscriptions: Subscription[] = []

  ngOnInit(): void {
    

    this.userSubscription$ = this._userdataservice.getUsers().subscribe((userData: User[]) => {
      this._userdataservice.allUsers = userData;
      console.log(this._userdataservice.allUsers)
    }
    )
    this.subscriptions.push(this.userSubscription$)
    this.userAttendanceSubscription$ = this._userdataservice.getUsersAttendance().subscribe({
      next: users => {
        console.log(this._userdataservice.usersAttendance);
      },
      error: err => console.log(err)
    })
    this.subscriptions.push(this.userAttendanceSubscription$)
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
