import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { AddContractComponent } from './add-contract/add-contract.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddContractComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ContractModule { }
