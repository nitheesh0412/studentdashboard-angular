import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User, Userdashboard } from 'src/app/models/user';
import { UserdataService } from 'src/app/services/userdata.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Sort, MatSortModule } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ViewuserComponent } from '../viewuser/viewuser.component';
import { EdituserComponent } from '../edituser/edituser.component';
import { Attendance } from 'src/app/models/attendance';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit, OnChanges {

  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'mobile', 'Action'];
  allUsers: User[] = [];

  searchTerm: string = '';
  users = new MatTableDataSource<User>([]);

  // this.allUsers = this._userdataservice.allUsers;

  flag : number = 0;
  constructor(private http: HttpClient,
    private _userdataservice: UserdataService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog) {

  }

  openDialoguser(idNo: number): void {



    this._userdataservice.getUsers().subscribe((userData: User[]) => {

      this._userdataservice.allUsers = userData;
      this._userdataservice.insertusersData(userData)
      const user = userData.find((user) => user.idNo === idNo)
      const dialogRef = this.dialog.open(ViewuserComponent, {
        data: user,
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

      });
    }
    )



  }

  openDialogedit(idNo: number): void {

    this._userdataservice.getUsers().subscribe((userData: User[]) => {

      this._userdataservice.allUsers = userData;
      this._userdataservice.insertusersData(userData)
      const user = userData.find((user) => user.idNo === idNo)
      const dialogRef = this.dialog.open(EdituserComponent, {
        data: user,
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.subscribeUsers();
      });
    }
    )
  }


  deleteuser(idNo: number) {

    if(this.flag===0){
      this.flag = 1
      console.log(this.flag)
      window.alert("click delete again to confirm")
    }
      

    else{
      this.flag = 0;
      window.alert("deleted sucessfully")
    }
    
    this._userdataservice.getUsers().subscribe((userData: User[]) => {
      const user: User | undefined = userData.find((users) => users.idNo === idNo)
      if (user) {
        console.log(user)
        this._userdataservice.deleteUser(user);
        
      }
    })
    
    this.subscribeUsers();

    
    // window.location.reload()
  }

  ngOnInit(): void {

    this.subscribeUsers();

    console.log(this._userdataservice.allUsers)
    this._userdataservice.subjectArray.subscribe((res)=> console.log(res)); 

  }

  subscribeUsers() {
    
    

    this._userdataservice.getUsers().subscribe((userData: User[]) => {

      this._userdataservice.allUsers = userData;
      this.allUsers = userData
      console.log(this._userdataservice.allUsers)
      this._userdataservice.emitSubject(userData);
      this.users = new MatTableDataSource<User>(this.allUsers)

      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
    }
    )

    this._userdataservice.getUsersAttendance().subscribe((userattedancedata: Attendance[]) => {
      console.log(userattedancedata)
      this._userdataservice.usersAttendance = userattedancedata;
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {

    // this.users.paginator = this.paginator;
    // this.users.sort = this.sort;
    console.log(this.users)
    this.subscribeUsers()
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.subscribeUsers();
  }


  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter() {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.users.filter = filterValue;
  }


}
