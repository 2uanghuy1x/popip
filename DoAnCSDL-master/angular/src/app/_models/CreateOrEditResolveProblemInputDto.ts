import { Moment } from 'moment';
import { CreateOrEditResolveProblemDetailDto } from "./CreateOrEditResolveProblemDetailDto";

export class CreateOrEditResolveProblemInputDto {
  Id: number;
  CardId: number;
  RegisterNo: string;
  InGateEmpId: number;
  ResolveEmpId: number;
  InGateDate: Moment;
  ResolveTime: Moment;
  VehicleType: number;
  ResolveProblemDetail: CreateOrEditResolveProblemDetailDto[];
}
