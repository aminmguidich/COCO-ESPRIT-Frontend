import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Car } from '../../Models/Health/Car';

@Injectable({
    providedIn: 'root'
  })
  export class CarService {
    private _refresh$ = new Subject<void>();
    private piURL = "http://localhost:9092/COCO" ;
     constructor(private http: HttpClient) { }

     addCar(car: Car) : Observable<any>{
        return this.http.post("http://localhost:9092/COCO/addCar", car);
      }
     
      retrieveAllCar(): Observable<Car[]> {
        return this.http.get<Car[]>("http://localhost:9092/COCO/retrieveAllCar");
      }
      
  }