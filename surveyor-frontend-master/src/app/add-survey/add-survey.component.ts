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
    this.claimForm.get('vehicleAge')?.valueChanges.subscribe(() => {
      let vehicleAge = this.claimForm.get('vehicleAge')?.value
      if (vehicleAge < 5) {
        this.claimForm.get("policyClass")!.setValue(500);
      } else if (vehicleAge < 10) {
        this.claimForm.get("policyClass")!.setValue(1500);
      } else {
        this.claimForm.get("policyClass")!.setValue(5000);
      }
    })
    this.claimForm.get('labourCharges')?.valueChanges.subscribe(() => {
      let labourCharges = this.claimForm.get('labourCharges')?.value
      let partsCost = this.claimForm.get('partsCost')?.value
      let policyClass = this.claimForm.get('policyClass')?.value
      this.claimForm.get("totalAmount")!.setValue(labourCharges + partsCost - policyClass);

    })
    this.claimForm.get('partsCost')?.valueChanges.subscribe(() => {
      let labourCharges = this.claimForm.get('labourCharges')?.value
      let partsCost = this.claimForm.get('partsCost')?.value
      let policyClass = this.claimForm.get('policyClass')?.value
      this.claimForm.get("totalAmount")!.setValue(labourCharges + partsCost - policyClass);
    })
    this.claimForm.get('policyClass')?.valueChanges.subscribe(() => {
      let labourCharges = this.claimForm.get('labourCharges')?.value
      let partsCost = this.claimForm.get('partsCost')?.value
      let policyClass = this.claimForm.get('policyClass')?.value
      this.claimForm.get("totalAmount")!.setValue(labourCharges + partsCost - policyClass);
    })
  }
  createClaimForm() {
    this.claimForm = this.formBuilder.group({
      claimId: ['', Validators.required],
      accidentDetails: ['', Validators.required],
      policyNo: ['', Validators.required],
      labourCharges: [0, [Validators.required, Validators.min(0)]],
      partsCost: [0, [Validators.required, Validators.min(0)]],
      policyClass: [0, [Validators.required, Validators.min(0)]],
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
        (err) => {
          console.log("res", err);
          this.responeMessage = err
          this.successFlag = true;
        }, (res) => {

          console.log("res", res);
          if (res.status == 201) {
            this.responeMessage = 'Claim Added Successfully!'
            this.successFlag = true;
          } else {
            this.responeMessage = 'Invalid Form Data!'
            this.successFlag = true;
          }

        }
        // (res) => {
        //     console.log("res", res); 
        //     if(res.status==201) {
        //           this.responeMessage = 'Claim Added Successfully!'
        //            this.successFlag = true;  
        //          } else {
        //            this.responeMessage = 'Invalid Form Data!'
        //            this.successFlag = true;    
        //          } 
        //         }, (err) => {

        //             console.log("res", err);
        //         }
      );
    }


  }
}
