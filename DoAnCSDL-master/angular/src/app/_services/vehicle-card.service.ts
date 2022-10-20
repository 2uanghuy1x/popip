import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleCard } from '../_models/vehicle-card';

@Injectable({
  providedIn: 'root',
})
export class VehicleCardService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) {}

  httpOptxions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getVehicleCard(val: VehicleCard): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/vehicle-card', val);
  }

  addVehicleCard(val: VehicleCard): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/vehicle-card/add', val);
  }

  updateVehicleCard(val: VehicleCard): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/vehicle-card/update', val);
  }

  deleteVehicleCard(val: VehicleCard): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/vehicle-card/delete', val);
  }
}
