import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../../../Models/User/User';

;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:9092/api/'
  constructor(private http: HttpClient) {}

  private _listners = new Subject<any>();
   listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy:string){
    this._listners.next(filterBy);
  }

  getPublicContent(): Observable<any> {
    return this.http.get(this.API_URL + 'test/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'test/user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'test/mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'test/admin', { responseType: 'text' });
  }
  updateUser(user: any): Observable<any> {
    return this.http.put(this.API_URL + 'user/update', user)
  }

  getUserById(): Observable<any> {
    return this.http.get(this.API_URL + 'user/retrieve')
  }
  retrieveAllUsers(): Observable<User[]> {
    return this.http.get<User[]>( this.API_URL +'user/retrieveAll');
  }

  uploadFile(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post('http://localhost:9092/api/user/upload', formData, { responseType: 'text' });
  }
  uploadCarFile(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post('http://localhost:9092/api/user/uploadCarImage', formData, { responseType: 'text' });
  }

  update(user: any): Observable<any> {
    return this.http.put(this.API_URL + 'user/updateSimple', user)
  }

  }
