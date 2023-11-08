import { DateStatus } from "./user";
export interface Attendance{
  id? : string
  idNo : number,
  attendance : DateStatus[]
}