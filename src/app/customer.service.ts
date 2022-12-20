import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './entities/customer';
import { Plan } from './entities/plan';
import { SearchObj } from './entities/search-obj';
import { Status } from './entities/status';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = 'http://localhost:9090/v1/api';

  constructor(private _http: HttpClient) { }

  getAllPlans():Observable<Plan[]> {
    return this._http.get<Plan[]>(`${this.baseUrl}/plans`, {responseType: 'json'});
  }

  getAllStatuses():Observable<Status[]>{
    return this._http.get<Status[]>(`${this.baseUrl}/statuses`,{responseType: 'json'});
  }

  getAllCustomers(searchObj:SearchObj):Observable<Customer[]>{
    return this._http.post<Customer[]>(`${this.baseUrl}/report/search`, searchObj, {responseType: 'json'});
  }
}
