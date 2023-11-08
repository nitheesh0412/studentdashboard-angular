import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DateStatus, User, UserAttendance } from 'src/app/models/user';
import { BehaviorSubject, Observable, Subject, catchError, findIndex, tap, throwError } from 'rxjs';
import { Subscription } from 'rxjs';
import { Attendance } from '../models/attendance';
@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  allUsers!: User[];

  usersAttendance!: Attendance[]

  subjectArray = new BehaviorSubject<User[]>([]);
  
  emitSubject(user : User[]){
    this.subjectArray.next(user);
  }

  url: string = "https://6539fbd9e3b530c8d9e8e890.mockapi.io/api/nitheesh/users"
  constructor(private http: HttpClient) {

  }


  


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      tap(users => this.allUsers = users),
      catchError(err => this.handleError(err))
    );
  }


  handleError(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }

  postUser(user: User) {

    // console.log(this.userData.value);

    this.http.post<User>('https://6539fbd9e3b530c8d9e8e890.mockapi.io/api/nitheesh/users', user).subscribe((data) => {
      console.log(data);

    })
  }


  deleteUser(user: User)  {
    this.http.delete<User>(`https://6539fbd9e3b530c8d9e8e890.mockapi.io/api/nitheesh/users/${user.id}`).subscribe(data => {
      console.log(data);
    });
  }


  updateUser(user: User) {
    this.http.put<User>(`https://6539fbd9e3b530c8d9e8e890.mockapi.io/api/nitheesh/users/${user.id}`, user).subscribe(data => {
      console.log(data);
    });
  }


  getUsersAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>('https://6539fbd9e3b530c8d9e8e890.mockapi.io/api/nitheesh/attendance').pipe(
      tap(users => this.usersAttendance = users),
      catchError(err => this.handleError(err))
    );
  }

  postattendance(user: UserAttendance) {


    console.log(user)

    const data: Attendance = {
      idNo: 0,
      attendance: [{
        date: new Date(),
        status: "present",
      }]
    }

    data.idNo = user.ids;
    data.attendance[0].date = user.date;
    data.attendance[0].status = user.status;

    console.log(data)


    this.http.post<Attendance>('https://6539fbd9e3b530c8d9e8e890.mockapi.io/api/nitheesh/attendance', data).subscribe((data) => {
      console.log(data);

    })

  }

  updateUserattendance(user : UserAttendance){
    this.getUsersAttendance().subscribe((userattedancedata : Attendance[]) =>{
      const markattendance = userattedancedata.find((users) => users.idNo === user.ids)

      markattendance?.attendance.push({date : user.date, status : user.status});
      this.http.put<Attendance>(`https://6539fbd9e3b530c8d9e8e890.mockapi.io/api/nitheesh/attendance/${markattendance!.id}`, markattendance).subscribe((data) => {
      console.log(data);

    })
    })
  }


  insertusersData(user: User[]) {
    this.allUsers = user;
  }

}
