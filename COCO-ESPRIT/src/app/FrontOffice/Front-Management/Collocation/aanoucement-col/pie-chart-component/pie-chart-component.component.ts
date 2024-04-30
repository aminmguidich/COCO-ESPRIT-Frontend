import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-pie-chart-component',
  templateUrl: './pie-chart-component.component.html',
  styleUrls: ['./pie-chart-component.component.css']
})
export class PieChartComponentComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:9092/api/api/budget-pie-chart').subscribe(data => {
      const labels = Object.keys(data);
      const values = Object.values(data);

      const ctx = document.getElementById('budgetPieChart') as HTMLCanvasElement;
      const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)', // Rouge
              'rgba(54, 162, 235, 0.7)', // Bleu
            ]
          }]
        }
      });
    }, error => {
      console.error('Une erreur s\'est produite lors du chargement des données:', error);
    });
  }
}