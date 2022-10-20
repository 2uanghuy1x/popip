import { Moment } from 'moment';
export class GetRegisterNoForProblemDto {
  RegisterNo: string;
  Location: string;
  InGateDate: Moment;
  InGateEmpId: number;
  InGateEmpName: string;
}
