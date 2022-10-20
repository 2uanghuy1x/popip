import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceList } from '../_models/price-list';

@Injectable({
  providedIn: 'root',
})
export class PriceListService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) {}

  httpOptxions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getPriceList(val: PriceList): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/price-list', val);
  }

  addPriceList(val: PriceList): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/price-list/add', val);
  }

  updatePriceList(val: PriceList): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/price-list/update', val);
  }

  deletePriceList(val: PriceList): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/price-list/delete', val);
  }
}
