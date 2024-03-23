import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  uploadImage(file: File, title: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    return this.http.post('http://localhost:9092/COCO/savePhoto', formData, { responseType: 'text' });
  }
  
  
}
