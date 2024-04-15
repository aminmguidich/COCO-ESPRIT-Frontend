import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Car } from 'src/app/BackOffice/Back-Core/Models/Health/Car';
import { CarService } from 'src/app/BackOffice/Back-Core/Services/HealthService/car.service';
@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent  implements OnInit {
  car: Car;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.getCarDetails();
  }

  getCarDetails() {
    const carId = this.data.carId;
    this.carService.retrieveCar(carId).subscribe((car: Car) => {
      this.car = car;
    });
  }

}
