import { Moment } from 'moment';
export class GetInOutDateInputDto {
  cardId: number;
  registerNo: string;
  vhcType: number;
  toDate: Moment;
  fromDate: Moment;
  status: number;
};
