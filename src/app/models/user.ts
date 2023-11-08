export interface User{
  id : string
  idNo : number,
  name : string
  email : string,
  age : number,
  mobile : number,
  // jobtitle : string,
  // salary : number,
  password : string,
  attendance : DateStatus[] 
}
export interface DateStatus{
  date : Date,
  status : string
}
export interface UserAttendance{
  ids : number,
  date : Date,
  status : string
}

export interface Userdashboard {
  id : string,
  name : string
  email : string,
  age : number,
  mobile : number,
  jobtitle : string,
  salary : number,
  password : string
}
