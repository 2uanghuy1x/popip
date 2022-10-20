import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProblemList } from '../_models/problem-list';

@Injectable({
  providedIn: 'root',
})
export class ProblemListService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) {}

  httpOptxions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getProblemList(val: ProblemList): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/problem-list', val);
  }

  addProblemList(val: ProblemList): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/problem-list/add', val);
  }

  updateProblemList(val: ProblemList): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/problem-list/update', val);
  }

  deleteProblemList(val: ProblemList): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/problem-list/delete', val);
  }
}
