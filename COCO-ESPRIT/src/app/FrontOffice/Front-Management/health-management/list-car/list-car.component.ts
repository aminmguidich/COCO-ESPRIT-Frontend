import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Car } from 'src/app/BackOffice/Back-Core/Models/Health/Car';
import { CarService } from 'src/app/BackOffice/Back-Core/Services/HealthService/car.service';
import { AddCarComponent } from '../add-car/add-car.component';
import { CarDetailsComponent } from '../car-details/car-details.component';

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.css']
})
export class ListCarComponent implements OnInit {

  cars: Observable<Car[]>;

  constructor(
    private route: ActivatedRoute, 
    private _dialog: MatDialog,
    private router: Router,
    private carService: CarService
    ) { }
    ngOnInit(): void {
      this.refreshCars(); // Chargez initialement les voitures
    }
  
    openAddCarForm() {
      const dialogRef = this._dialog.open(AddCarComponent);
  
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          // Si le résultat est true (indiquant que l'ajout a réussi), rafraîchissez la liste des voitures
          this.refreshCars();
        }
      });
    }
  
    refreshCars() {
      this.cars = this.carService.retrieveAllCar();
    }

    openDetailCar(carId: number) {
      const dialogRef = this._dialog.open(CarDetailsComponent, {
        data: { carId: carId }
      });
    }

}
