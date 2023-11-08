import { Component, Inject, OnInit } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DateStatus, User } from 'src/app/models/user';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Attendance } from 'src/app/models/attendance';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit{

  displayedColumns: string[] = ['date', 'status'];

  user : Attendance | undefined;
  usersattendance! : DateStatus[] 

  dataSource! : MatTableDataSource<DateStatus>;
  constructor(
    private _userdataservice : UserdataService,
    public dialogRef: MatDialogRef<ViewuserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {

  }

  ngOnInit(): void {


    this._userdataservice.getUsersAttendance().subscribe((userattedancedata : Attendance[]) =>{
      console.log(userattedancedata)
      this._userdataservice.usersAttendance = userattedancedata;
    })
    console.log(this._userdataservice.usersAttendance)

    this.user = this._userdataservice.usersAttendance.find((val) => val.idNo === this.data.idNo)
    console.log(this.user)

    if(this.user){
      this.usersattendance = this.user.attendance;
      console.log(this.usersattendance)
    }
    this.dataSource = new MatTableDataSource<DateStatus>(this.usersattendance);
    console.log(this.dataSource)
    this.dataSource.paginator = this.paginator;
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {


    
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}
