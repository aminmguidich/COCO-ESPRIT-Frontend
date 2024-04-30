import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { House } from '../../Models/Collocation/house';
import { AnnouncementCollocation } from '../../Models/Collocation/annoucement-collocation';
@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private apiURL = 'http://localhost:9092/api/House/';

  constructor(private http: HttpClient) { }

  addHouse(data: any): Observable<any> {
    return this.http.post(`${this.apiURL}addHouse`, data);
  }

  getAllHouses(){
    return this.http.get(`${this.apiURL}house/all`);
  }

  deleteHouse(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}house/delete/${id}`);
  }

  updateHouse(id: number, updatedHouse: House): Observable<any> {
    return this.http.put(`${this.apiURL}house/update/${id}`, updatedHouse);
  }

  findHouseById(id: number): Observable<House> {
    return this.http.get<House>(`${this.apiURL}house/${id}`);
  }

  generatePdf() {
    return this.http.get(`${this.apiURL}pdf`);
  }

  getHouseImageUrl(id: number): Observable<string> {
    return this.http.get<string>(`${this.apiURL}house/image/${id}`);
  }

  filterAnnouncements(description: string, budgetPart: number | null, score: number | null): Observable<AnnouncementCollocation[]> {
    let params = new HttpParams();
    if (description) {
      params = params.append('description', description);
    }
    if (budgetPart !== null) {
      params = params.append('budgetPart', budgetPart.toString());
    }
    if (score !== null) {
      params = params.append('score', score.toString());
    }

    return this.http.get<AnnouncementCollocation[]>(`${this.apiURL}filter`, { params: params });
  }
}
