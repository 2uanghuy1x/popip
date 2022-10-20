import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddInGate } from '../_models/add-in-gate';
import { GetInOutDateInputDto } from '../_models/getInOutGateInputDto';
import { OutGateInputDto } from '../_models/outGateInputDto';

@Injectable({
  providedIn: 'root',
})
export class InOutGateService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) {}

  httpOptxions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getInOutGates(val: GetInOutDateInputDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/in-out-gate', val);
  }

  getVhcCard(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/get-vhc-card');
  }

  updateInGate(val: AddInGate): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/update-in-gate', val);
  }

  updateOutGate(val: OutGateInputDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/update-out-gate', val);
  }

  getCardIdFromRegisterNo(val): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/getCardIdFromRegisterNo', val);
  }

  updateInOutGate(val): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/updateInOutGate', val);
  }
  checkHaveMonthlyTicket(val: GetInOutDateInputDto): Observable<boolean> {
    return this.http.post<any>(this.APIUrl + '/check-have-monthly-ticket', val);
  }
}


