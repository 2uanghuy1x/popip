import { GetResolveProblemInputDto } from './../_models/getResolveProblemInputDto';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/internal/Observable';
import { GetResolveProblemDetailInputDto } from '../_models/getResolveProblemDetailInputDto';
import { ProblemInputDto } from '../_models/problemInputDto';
import { CreateOrEditResolveProblemInputDto } from '../_models/CreateOrEditResolveProblemInputDto';

@Injectable({
  providedIn: 'root',
})
export class ResolveProblemService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) { }

  httpOptxions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAllResolveRecord(val: GetResolveProblemInputDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/resolve-problem', val);
  }

  getResolveRecordDetail(val: GetResolveProblemDetailInputDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/resolve-problem-detail', val);
  }

  getProblemListForResolve(val: ProblemInputDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/problem-for-resolve', val);
  }

  getUsedVehicleCard(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/used-vehicle-card');
  }

  getRegisterNoForProblem(val: GetResolveProblemDetailInputDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/registerno-for-problem', val);
  }

  createResolveProblem(val: CreateOrEditResolveProblemInputDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/create-resolve-problem', val);
  }

  removeResolveProblem(val: GetResolveProblemDetailInputDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/remove-resolve-problem', val);
  }

  removeResolveProblemDetail(val: GetResolveProblemDetailInputDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/remove-resolve-problem-detail', val);
  }

  updateResolveProblem(val: CreateOrEditResolveProblemInputDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/update-resolve-problem', val);
  }
}
