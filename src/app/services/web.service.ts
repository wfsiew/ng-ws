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
    let prm: HttpParams = new HttpParams()
      .set('tx', `${new Date().getTime()}`);
    return this.http.get(`${this.baseUrl}/vesalius/patient-data/${prn}`, { params: prm });
  }

  createPatient(o) {
    return this.http.post(`${this.baseUrl}/vesalius/createNewPatient`, o);
  }

  updatePatient(o, prn) {
    return this.http.post(`${this.baseUrl}/vesalius/updateExstingPatient/${prn}`, o);
  }
}
