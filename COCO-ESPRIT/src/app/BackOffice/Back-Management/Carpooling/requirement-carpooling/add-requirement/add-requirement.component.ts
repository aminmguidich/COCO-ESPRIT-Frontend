import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RequirementCarpooling } from 'src/app/BackOffice/Back-Core/Models/Carpooling/requirement-carpooling';
import { RequirementCarpoolingService } from 'src/app/BackOffice/Back-Core/Services/Carpooling/requirement-carpooling.service';

@Component({
  selector: 'app-add-requirement',
  templateUrl: './add-requirement.component.html',
  styleUrls: ['./add-requirement.component.css']
})
export class AddRequirementComponent implements OnInit {

  constructor(private reqCarpoolingService:RequirementCarpoolingService , private router: Router) { }

  ngOnInit(): void {
  }

  add(form: NgForm) {
    if (form.valid) {
      // Convert the string to a Date object
      const date = new Date(form.value.date);
  
      const annCarpooling: RequirementCarpooling = {
        idCarRequirement: 0,
        description: form.value.description,
        dateCarpoolingRequirement: date
      };
  
      this.reqCarpoolingService.AddReqCarpooling(annCarpooling).subscribe(
        () => {
          alert('Added Successfully!');
          this.router.navigate(['admin/carpooling/requirement/']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

}
