import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../../Models/Collocation/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiURL = 'http://localhost:9092/api/';

  constructor(private http: HttpClient) { }

  addContract(contract:any) {
    return this.http.post(`${this.apiURL}Contract/addContract`, contract);
  }
}
