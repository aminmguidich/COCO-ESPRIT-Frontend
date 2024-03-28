import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactCarpooling } from 'src/app/BackOffice/Back-Core/Models/Carpooling/react-carpooling';
import { ReactCarpoolingService } from 'src/app/BackOffice/Back-Core/Services/Carpooling/react-carpooling.service';

@Component({
  selector: 'app-list-react',
  templateUrl: './list-react.component.html',
  styleUrls: ['./list-react.component.css']
})
export class ListReactComponent implements OnInit{

  data: ReactCarpooling[] = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private reactCarpoolingService: ReactCarpoolingService,) { }
 
  ngOnInit() {
    this.reactCarpoolingService.getall().subscribe(
      (data: ReactCarpooling[]) => {
        console.log(data);
        this.data = data;
      }),
      (error: any) => {
        console.error('Error fetching user by ID:', error);
      }
    this.reactCarpoolingService.getall().subscribe((data) => {
      this.totalReacts = data.length;
    });
  }
  totalReacts!: number;

}

