import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequirementCarpooling } from 'src/app/BackOffice/Back-Core/Models/Carpooling/requirement-carpooling';
import { RequirementCarpoolingService } from 'src/app/BackOffice/Back-Core/Services/Carpooling/requirement-carpooling.service';

@Component({
  selector: 'app-list-requirement',
  templateUrl: './list-requirement.component.html',
  styleUrls: ['./list-requirement.component.css']
})
export class ListRequirementComponent implements OnInit{
  data: RequirementCarpooling[] = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private reqCarpoolingService: RequirementCarpoolingService,) { }
 
  ngOnInit() {
    this.reqCarpoolingService.getall().subscribe(
      (data: RequirementCarpooling[]) => {
        console.log(data);
        this.data = data;
      }),
      (error: any) => {
        console.error('Error fetching user by ID:', error);
      }
    this.reqCarpoolingService.getall().subscribe((data) => {
      this.totalRequirements = data.length;
    });
  }

  deleteReqCarpooling(id: number) {
    this.reqCarpoolingService.deleteReqCarpooling(id).subscribe(
      (response) => {
        alert(' Requirement deleted Successfully!');

       // this.router.navigate(['admin/carpooling/announcement/addAnn']);
       this.ngOnInit();

      },
    )
  }
  totalRequirements!: number;

}
