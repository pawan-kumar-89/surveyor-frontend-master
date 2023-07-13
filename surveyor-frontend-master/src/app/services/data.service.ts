import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiURL: string = environment.baseURL;

  constructor(private http: HttpClient) { }
  addSurvey(surveyData: any) {
    return this.http.post<any>(`${this.apiURL}surveyors/new`, surveyData)
  }
  getSurvey(claimId: any) {
    return this.http.get<any>(`${this.apiURL}surveyors/${claimId}`)
  }
  updateSurvey(surveyData: any) {
    return this.http.put<any>(`${this.apiURL}surveyors/${surveyData.claimId}`, surveyData)
  }
}
