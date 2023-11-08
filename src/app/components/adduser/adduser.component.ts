import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Attendance } from 'src/app/models/attendance';
import { User } from 'src/app/models/user';
import { UserdataService } from 'src/app/services/userdata.service';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  hide: boolean = true
  userData: FormGroup;
  
  constructor(private fb: FormBuilder,
    private http : HttpClient,
    private _userdataservice : UserdataService) {
    this.userData = this.fb.group({

    })
  }
  ngOnInit(): void {
    this.userData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),]],
      mobile: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10),
      Validators.maxLength(10)]],
      password: ['', [Validators.required,
      Validators.minLength(8)]],


    })
  }
  getErrorMessage() {

  }
  postUser(user : User) {
    const random_id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    console.log(random_id)
    user.idNo = random_id
    this._userdataservice.postUser(user);
    this._userdataservice.getUsers().subscribe((userData: User[]) => {
      this._userdataservice.allUsers = userData;
    })

    this._userdataservice.getUsersAttendance().subscribe((userattedancedata: Attendance[]) => {
      console.log(userattedancedata)
      this._userdataservice.usersAttendance = userattedancedata;
    })
  }
}
