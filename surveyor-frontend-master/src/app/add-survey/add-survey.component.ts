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
  isClaimCorrect = true
  responeMessage = ''
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
      labourCharges: ['', [Validators.required, Validators.min(0)]],
      partsCost: ['', [Validators.required, Validators.min(0)]],
      policyClass: ['', [Validators.required, Validators.min(0)]],
      depreciationCost: ['', Validators.required],
      totalAmount: ['', [Validators.required, Validators.min(0)]],
      vehicleAge: ['', Validators.required],
      estimateLoss: ['', Validators.required],
      withdrawn: [false, Validators.required],
      closed: [false, Validators.required],
      claimApprovedAmount: [null]
    });
  }

  verifyclaimApprovedAmount() {
    // if (this.claimForm.get('claimApprovedAmount')!.value >= this.claimForm.get('estimateLoss')!.value) {
    //   this.isClaimCorrect = false
    // }
  }
  submitForm() {
    if (this.claimForm.get('claimApprovedAmount')!.value >= this.claimForm.get('estimateLoss')!.value) {
      this.responeMessage = "Claim Approved Amount should be less than Estimate Loss"
      this.successFlag = true;
      return
    } else {
      this._dataService.addSurvey(this.claimForm.value).subscribe(
        (res) => {
          console.log("res", res);
          this.responeMessage = res
          this.successFlag = true;
        }, (err) => {
          console.log("res", err);
          if(err.status==201) {
            this.responeMessage = 'Claim Added Successfully!'
            this.successFlag = true;  
          } else {
            this.responeMessage = 'Invalid Form Data!'
            this.successFlag = true;    
          }
        }        
      );
    }
    

  }
}
