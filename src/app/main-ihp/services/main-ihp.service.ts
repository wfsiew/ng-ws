import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainIhpService {

  private mykadUrl = environment.mykadUrl;
  private url = `${this.mykadUrl}/MyKAD/GetMyKAD?LoadPhoto=NO&VerifyFP=NO&Format=JSON`;

  constructor(private http: HttpClient) { }

  getCardInfo() {
    return this.http.get(this.url);
  }
}
