import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { ViewSurveyReportComponent } from './view-survey-report/view-survey-report.component';

const routes: Routes = [
  { path: 'add-survey', component: AddSurveyComponent },
  { path: 'survey-report', component: ViewSurveyReportComponent },
  // Other routes...
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
