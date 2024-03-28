import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingCarpooling } from 'src/app/BackOffice/Back-Core/Models/Carpooling/rating-carpooling';
import { RatingCarpoolingService } from 'src/app/BackOffice/Back-Core/Services/Carpooling/rating-carpooling.service';

@Component({
  selector: 'app-list-rating',
  templateUrl: './list-rating.component.html',
  styleUrls: ['./list-rating.component.css']
})
export class ListRatingComponent  implements OnInit{

  data: RatingCarpooling[] = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private ratingCarpoolingService: RatingCarpoolingService,) { }
 
  ngOnInit() {
    this.ratingCarpoolingService.getall().subscribe(
      (data: RatingCarpooling[]) => {
        console.log(data);
        this.data = data;
      }),
      (error: any) => {
        console.error('Error fetching user by ID:', error);
      }
    this.ratingCarpoolingService.getall().subscribe((data) => {
      this.totalRatings = data.length;
    });
  }
  totalRatings!: number;

}
