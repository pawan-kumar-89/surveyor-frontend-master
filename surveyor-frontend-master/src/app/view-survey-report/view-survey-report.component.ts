import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-view-survey-report',
  templateUrl: './view-survey-report.component.html',
  styleUrls: ['./view-survey-report.component.css']
})
export class ViewSurveyReportComponent implements OnInit {
  inputClaimId = ''
  showData = false
  showForm = false;
  isUpdated = false
  claimData = {}
  claimEditForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private _dataService: DataService) {
    this.createClaimEditForm();

  }

  ngOnInit(): void {
  }
  createClaimEditForm() {
    this.claimEditForm = this.formBuilder.group({
      claimId: ['', Validators.required],
      accidentDetails: ['', Validators.required],
      policyNo: ['', Validators.required],
      labourCharges: ['', Validators.required],
      partsCost: ['', Validators.required],
      policyClass: ['', Validators.required],
      depreciationCost: ['', Validators.required],
      totalAmount: ['', Validators.required],
      vehicleAge: ['', Validators.required],
      estimateLoss: ['', Validators.required],
      withdrawn: [false, Validators.required],
      closed: [false, Validators.required],
      claimApprovedAmount: [null]
    });
  }
  editClaim() {
    this.claimEditForm.patchValue(this.claimData)
    this.isUpdated = false
    this.showForm = true
  }
  getSurvey() {
    console.log(this.inputClaimId);
    this._dataService.getSurvey(this.inputClaimId).subscribe(
      response => {
        console.log("awdwa", response);
        this.claimData = response;

        this.showData = true;
      },
      error => {
        this.showData = false;
        console.error('Error:', error);
      }
    );
    this.isUpdated = false
  }
  submitForm() {
    console.log(this.claimEditForm.value);
    this._dataService.updateSurvey(this.claimEditForm.value).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error:', error);
      }
    );
    this.showForm = false;
    this.isUpdated = true;
  }

}
