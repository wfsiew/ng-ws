import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPatientData(prn: string) {
    return this.http.get(`${this.baseUrl}/vesalius/patient-data/${prn}`);
  }

  createPatient(o) {
    return this.http.post(`${this.baseUrl}/vesalius/createNewPatient`, o);
  }
}
