import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyTicket } from '../_models/MonthlyTicket';

@Injectable({
  providedIn: 'root',
})
export class MonthlyTicketService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) {}

  httpOptxions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getMonthlyTicket(val: MonthlyTicket): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/monthly-ticket', val);
  }

  addMonthlyTicket(val: MonthlyTicket): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/monthly-ticket/add', val);
  }

  updateMonthlyTicket(val: MonthlyTicket): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/monthly-ticket/update', val);
  }

  deleteMonthlyTicket(val: MonthlyTicket): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/monthly-ticket/delete', val);
  }
}
