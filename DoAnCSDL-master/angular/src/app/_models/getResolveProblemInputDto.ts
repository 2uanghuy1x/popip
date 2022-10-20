import { Moment } from "moment";

export class GetResolveProblemInputDto
{
  registerNo: string;
  fromDate: Moment;
  toDate: Moment;
  vhcType: number;
  empName: string;
}
