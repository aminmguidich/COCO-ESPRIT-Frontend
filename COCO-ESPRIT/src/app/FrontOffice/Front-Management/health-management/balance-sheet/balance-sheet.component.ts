import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent {
  prediction: number;
  engineSize: number;
  cylinderNumber: number;
  fuelConsumptionCity: number;
  fuelConsumptionHighway: number;

  constructor(private http: HttpClient) { }

  predictCO2Emission() {
    const data = {
      "Engine Size": this.engineSize,
      "Cylinder Number": this.cylinderNumber,
      "Fuel Consumption in City": this.fuelConsumptionCity,
      "Fuel Consumption in Highway": this.fuelConsumptionHighway
    };

    this.http.post<any>('http://localhost:5000/CO2', data).subscribe(
      response => {
        this.prediction = response.prediction;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  
}
