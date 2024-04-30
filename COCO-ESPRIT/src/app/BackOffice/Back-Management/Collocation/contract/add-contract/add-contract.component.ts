import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contract } from 'src/app/BackOffice/Back-Core/Models/Collocation/contract';
import { ContractService } from 'src/app/BackOffice/Back-Core/Services/Collocation/contract.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent implements OnInit {
  validateForm!: FormGroup;
  showAlertSuccess: boolean = false;

  constructor(private fb: FormBuilder, private contractService: ContractService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      description: ['', [Validators.required]]
    });
  }

  get description() {
    return this.validateForm.get('description');
  }

  addContract() {
    if (this.validateForm.invalid) {
      console.error('Form is invalid. Please fill in all required fields.');
      this.validateForm.markAllAsTouched();
      return;
    }

    const newContract: Contract = {
      ...this.validateForm.value
    };

    this.contractService.addContract(newContract).subscribe(
      (response: any) => {
        console.log('Contract added successfully:', response);
        this.showAlertSuccess = true;
        setTimeout(() => {
          this.showAlertSuccess = false;
        }, 3000);
        this.validateForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.error('Error while adding contract:', error);
      }
    );
  }
}
