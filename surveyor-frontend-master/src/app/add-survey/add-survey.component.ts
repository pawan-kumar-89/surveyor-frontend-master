import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {
  claimForm: FormGroup;
  successFlag = false;
  isAdded = false
  constructor(private formBuilder: FormBuilder,
    private _dataService: DataService) {

    this.createClaimForm();

  }

  ngOnInit(): void {
  }
  createClaimForm() {
    this.claimForm = this.formBuilder.group({
      claimId: ['', Validators.required],
      accidentDetails: ['', Validators.required],
      policyNo: ['', Validators.required],
      labourCharges: ['', [Validators.required,Validators.min(0)]],
      partsCost: ['', [Validators.required,Validators.min(0)]],
      policyClass: ['', [Validators.required,Validators.min(0)]],
      depreciationCost: ['', Validators.required],
      totalAmount: ['', [Validators.required,Validators.min(0)]],
      vehicleAge: ['', Validators.required],
      estimateLoss: ['', Validators.required],
      withdrawn: [false, Validators.required],
      closed: [false, Validators.required],
      claimApprovedAmount: [null]
    });
  }
  // validateCosts(formGroup: FormGroup) {
  //   const labourCharges = formGroup.get('labourCharges')!.value;
  //   const partsCost = formGroup.get('partsCost')!.value;

  //   if (labourCharges <= partsCost) {
  //     return { invalidCosts: true };
  //   }

  //   return null;
  // }
  submitForm() {
    if(this.claimForm.get('claimApprovedAmount')!.value<this.claimForm.get('estimateLoss')!.value) return
    // console.log(this.claimForm.value);
    this._dataService.addSurvey(this.claimForm.value).subscribe(
      response => {
        this.isAdded = true
      },
      error => {
        console.error('Error:', error);
      }
    );
    this.successFlag = true;
  }
}
