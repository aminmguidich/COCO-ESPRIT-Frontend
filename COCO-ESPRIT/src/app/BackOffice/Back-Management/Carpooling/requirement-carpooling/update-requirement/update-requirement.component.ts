import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequirementCarpooling } from 'src/app/BackOffice/Back-Core/Models/Carpooling/requirement-carpooling';
import { RequirementCarpoolingService } from 'src/app/BackOffice/Back-Core/Services/Carpooling/requirement-carpooling.service';

@Component({
  selector: 'app-update-requirement',
  templateUrl: './update-requirement.component.html',
  styleUrls: ['./update-requirement.component.css']
})
export class UpdateRequirementComponent implements OnInit {

  id!: number;
  reqCarpooling!: RequirementCarpooling;
  updateForm!: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private reqCarpoolingService: RequirementCarpoolingService,

  ) { }

  ngOnInit() {
    if (this.route.paramMap.subscribe((paramMap) => this.id = Number(paramMap.get('id')))) {
      this.reqCarpoolingService.getReqCarpoolingById(this.id).subscribe(
        (data: RequirementCarpooling) => {
          console.log(data);
          this.reqCarpooling = data;
          this.updateForm = this.formB.group({
            dateReqCarpooling: [data.dateCarpoolingRequirement],
            descriptionReqCarpooling: [data.description],
            budgetpartReqCarpooling: [data.budgetPart]


          });
          this.updateForm.patchValue(data);
        }

      )
        ,
        (error: any) => {
          console.error('Error fetching user by ID:', error);
        }
    }
  }

  updateRequirementCarpooling() {
    this.reqCarpooling.idCarRequirement = this.id;
    this.reqCarpooling.dateCarpoolingRequirement = this.updateForm.value.dateReqCarpooling;
    this.reqCarpooling.description = this.updateForm.value.descriptionReqCarpooling;
    this.reqCarpooling.budgetPart = this.updateForm.value.budgetpartReqCarpooling;

    this.reqCarpoolingService.updateReqCarpooling(this.reqCarpooling).subscribe(
      (response) => {
        alert('Requirement Updated Successfully!');
        //console.log(this.user)
        this.router.navigate(['admin/carpooling/requirement/']);

      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
  }

}
