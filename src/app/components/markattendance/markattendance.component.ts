import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attendance } from 'src/app/models/attendance';
import { User, UserAttendance } from 'src/app/models/user';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-markattendance',
  templateUrl: './markattendance.component.html',
  styleUrls: ['./markattendance.component.scss']
})
export class MarkattendanceComponent implements OnInit {
  attendancedata: FormGroup;

  users : User[] = [];
  selected = 'none';
  constructor(private fb : FormBuilder,
    private _userdataservice : UserdataService){
    this.attendancedata = this.fb.group({

    })
  }

  ngOnInit(): void {
    console.log("bsjzbxnk")
    this.attendancedata = this.fb.group({
      ids : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)
      ]],
      date : ['',[Validators.required]],
      status : ['',[Validators.required]]
    })

    console.log(this.attendancedata.value)
    this.subscribeUsers();
  }

  subscribeUsers(){
    this._userdataservice.getUsers().subscribe((userData: User[]) => {

      this._userdataservice.allUsers = userData;
      console.log(this._userdataservice.allUsers)
      this.users=userData;
    }
    )
  }
  postattendance(Userattendance : UserAttendance) {
    this._userdataservice.getUsersAttendance().subscribe((userattedancedata : Attendance[]) =>{
      const markattendance = userattedancedata.find((user) => user.idNo === this.attendancedata.value.ids)
      if(markattendance){
        this._userdataservice.updateUserattendance(Userattendance);
      }
      else{
        this._userdataservice.postattendance(Userattendance);
      }
    })
  }
}
